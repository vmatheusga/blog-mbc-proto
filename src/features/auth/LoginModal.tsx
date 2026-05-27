import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useAuth } from './AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { checkEmail, signIn, signUp, isAuthenticated } = useAuth()
  const [step, setStep] = useState<'email' | 'login' | 'register'>('email')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fecha automaticamente ao autenticar
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      setStep('email')
      setEmail('')
      setName('')
      setPassword('')
      setConfirmPassword('')
      setError(null)
      onClose()
    }
  }, [isAuthenticated, isOpen, onClose])

  // Trava scroll quando aberto
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [isOpen])

  // Fecha com Escape
  useEffect(() => {
    if (!isOpen) return
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false)
      setError(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  const resetToEmail = () => {
    setStep('email')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (step === 'email') {
      const { exists } = await checkEmail(email)
      setStep(exists ? 'login' : 'register')
      setIsLoading(false)
      return
    }

    if (step === 'register' && password !== confirmPassword) {
      setError('As senhas não coincidem.')
      setIsLoading(false)
      return
    }

    const result =
      step === 'login'
        ? await signIn(email, password)
        : await signUp(email, password, name)

    if (result.error) {
      setError(
        step === 'login'
          ? 'E-mail ou senha incorretos. Tente novamente.'
          : 'Não foi possível criar sua conta. Tente novamente.',
      )
      setIsLoading(false)
      return
    }

    setName('')
    setPassword('')
    setConfirmPassword('')
    setIsLoading(false)
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label="Entrar na sua conta"
    >
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar"
        type="button"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[380px] mx-4 rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full text-[var(--slate-9)] transition-colors hover:bg-[var(--slate-3)]"
          type="button"
          aria-label="Fechar"
        >
          <X className="size-4" strokeWidth={2} />
        </button>

        <h2 className="mb-6 text-center text-xl font-semibold text-[var(--slate-12)]">
          {step === 'email' && 'Entrar na sua conta'}
          {step === 'login' && 'Digite sua senha'}
          {step === 'register' && 'Criar sua conta'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-sm font-medium text-[var(--slate-11)]"
              htmlFor="modal-login-email"
            >
              E-mail
            </label>
            <input
              id="modal-login-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (step !== 'email') resetToEmail()
              }}
              className="rounded-lg border border-[var(--slate-6)] bg-white px-3 py-2 text-sm text-[var(--slate-12)] outline-none placeholder:text-[var(--slate-9)] focus:border-[var(--slate-8)] focus:ring-2 focus:ring-[var(--slate-4)]"
              placeholder="seu@email.com"
            />
          </div>

          {step === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-[var(--slate-11)]"
                htmlFor="modal-register-name"
              >
                Nome
              </label>
              <input
                id="modal-register-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-[var(--slate-6)] bg-white px-3 py-2 text-sm text-[var(--slate-12)] outline-none placeholder:text-[var(--slate-9)] focus:border-[var(--slate-8)] focus:ring-2 focus:ring-[var(--slate-4)]"
                placeholder="Seu nome"
              />
            </div>
          )}

          {step !== 'email' && (
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-[var(--slate-11)]"
                htmlFor="modal-login-password"
              >
                Senha
              </label>
              <input
                id="modal-login-password"
                type="password"
                required
                minLength={step === 'register' ? 6 : undefined}
                autoComplete={step === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border border-[var(--slate-6)] bg-white px-3 py-2 text-sm text-[var(--slate-12)] outline-none placeholder:text-[var(--slate-9)] focus:border-[var(--slate-8)] focus:ring-2 focus:ring-[var(--slate-4)]"
                placeholder="••••••••"
              />
            </div>
          )}

          {step === 'register' && (
            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium text-[var(--slate-11)]"
                htmlFor="modal-confirm-password"
              >
                Confirmar senha
              </label>
              <input
                id="modal-confirm-password"
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-lg border border-[var(--slate-6)] bg-white px-3 py-2 text-sm text-[var(--slate-12)] outline-none placeholder:text-[var(--slate-9)] focus:border-[var(--slate-8)] focus:ring-2 focus:ring-[var(--slate-4)]"
                placeholder="••••••••"
              />
            </div>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-full bg-[var(--slate-12)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step === 'email' && (isLoading ? 'Verificando...' : 'Continuar')}
            {step === 'login' && (isLoading ? 'Entrando...' : 'Entrar')}
            {step === 'register' && (isLoading ? 'Criando conta...' : 'Criar conta')}
          </button>

          {step !== 'email' && (
            <button
              type="button"
              onClick={resetToEmail}
              className="text-sm font-medium text-[var(--slate-10)] transition-colors hover:text-[var(--slate-12)]"
            >
              Usar outro e-mail
            </button>
          )}
        </form>
      </div>
    </div>
  )
}
