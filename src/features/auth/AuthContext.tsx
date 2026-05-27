import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

interface AuthContextValue {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  checkEmail: (email: string) => Promise<{ exists: boolean; error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carrega sessão existente ao inicializar
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    // Escuta mudanças de sessão (login, logout, refresh automático)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkEmail = async (email: string): Promise<{ exists: boolean; error: string | null }> => {
    const { data, error } = await supabase
      .from('user_emails')
      .select('email')
      .eq('email', normalizeEmail(email))
      .maybeSingle()

    if (error) return { exists: true, error: null }
    return { exists: !!data, error: null }
  }

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: normalizeEmail(email),
      password,
    })
    if (error) return { error: error.message }
    return { error: null }
  }

  const signUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<{ error: string | null }> => {
    const { error } = await supabase.auth.signUp({
      email: normalizeEmail(email),
      password,
      options: {
        data: { name },
      },
    })

    if (error) return { error: error.message }
    return { error: null }
  }

  const signOut = async () => {
    setSession(null)
    setUser(null)
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        checkEmail,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
