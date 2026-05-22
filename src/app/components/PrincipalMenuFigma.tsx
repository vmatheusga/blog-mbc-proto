import { useState } from "react";
import { X, Menu } from "lucide-react";
import { useEcosystemNavItems } from "../hooks/useEcosystemNavItems";

const svgPaths = {
  logo1: "M13.8231 4.52211C13.8202 4.10135 13.5576 3.74271 13.1905 3.59869C13.1905 3.59869 1.74518 0.161991 1.35265 0.0490339C0.960129 -0.0639227 0.00282667 -0.0780424 0.00282667 1.108C0.00282667 1.11083 0 13.6744 0 13.6744C0 16.3515 1.47691 17.8792 2.71661 18.6925C4.1907 19.6583 5.89634 20 6.91013 20C8.03687 20 9.75946 19.647 11.2166 18.6586C12.4055 17.851 13.8202 16.3317 13.8202 13.6744V4.54189C13.8202 4.53624 13.8202 4.53341 13.8202 4.52777C13.8231 4.52777 13.8231 4.52494 13.8231 4.52211ZM0.494185 1.0487C0.494185 1.04587 0.494185 1.04306 0.494185 1.04023C0.519601 0.715481 0.697507 0.373779 1.18604 0.523446C1.19734 0.52627 5.26096 1.74903 5.56877 1.83657C5.44169 2.20368 5.34567 2.66115 5.34567 3.07626C5.34567 4.27925 6.05448 5.42859 6.96095 6.06115C6.90447 6.08374 6.86777 6.09785 6.86494 6.09785C6.41876 6.27011 5.97823 6.49321 5.54899 6.75866C5.54899 6.75866 5.54617 6.75865 5.54617 6.76147C5.53205 6.76995 5.5151 6.78124 5.50098 6.78971C5.37673 6.77277 5.24118 6.75018 5.09151 6.72477C2.60082 6.17693 0.61279 3.90368 0.494185 1.22379C0.491361 1.16448 0.491361 1.108 0.494185 1.0487ZM4.91361 7.19071C4.31777 7.63407 3.65979 8.2525 3.10348 8.87941C3.06959 8.88223 3.03571 8.88507 2.99618 8.89072C2.22242 8.92743 1.41761 9.01779 0.499839 8.00118V3.70883C0.725752 4.18325 1.00531 4.63224 1.34136 5.03888C2.2083 6.08938 3.49318 6.86314 4.795 7.17377C4.84866 7.18506 4.86843 7.18789 4.91361 7.19071ZM0.497012 8.70151C1.4402 9.47526 2.69967 9.39054 2.69967 9.39054C2.39751 9.78589 1.92873 10.4241 1.60398 10.9861L1.57574 11.0369C0.94883 10.8533 0.497012 10.6048 0.497012 10.6048V8.70151ZM10.8777 18.1701C9.52507 19.0992 7.92673 19.4324 6.87906 19.4324C5.9387 19.4324 4.35448 19.1105 2.98488 18.204C2.61495 17.9583 2.22242 17.642 1.86096 17.2439C2.39185 17.5347 3.08653 17.7437 4.00431 17.7437C4.97856 17.7437 5.94717 17.5855 6.88189 17.2693C7.8166 17.5827 8.78521 17.7437 9.75946 17.7437C10.7139 17.7437 11.4312 17.5178 11.9678 17.2043C11.6148 17.6053 11.2335 17.9244 10.8777 18.1701ZM13.2781 14.1263C13.1933 14.9763 12.6794 17.1958 9.79052 17.1958C8.79086 17.1958 7.82507 17.0179 6.91294 16.6932C6.00082 17.0208 5.03504 17.1958 4.03537 17.1958C1.14651 17.1958 0.62973 14.9763 0.547837 14.1263C0.547837 14.1234 0.547837 14.1206 0.547837 14.1178C0.595843 14.1404 0.824583 14.242 0.861294 14.2562C1.86096 14.6572 2.9284 14.8746 4.0382 14.8746C5.03787 14.8746 6.00364 14.6967 6.91577 14.3719C7.82789 14.6995 8.79367 14.8746 9.79333 14.8746C10.9031 14.8746 11.9706 14.6572 12.9702 14.2562C13.0041 14.242 13.2357 14.1404 13.2837 14.1178C13.278 14.1206 13.2781 14.1234 13.2781 14.1263ZM13.295 13.4768C13.295 13.4768 12.9222 13.666 12.846 13.697C12.8206 13.7083 12.75 13.7365 12.75 13.7365C12.2191 13.9483 11.6741 14.1037 11.1206 14.1997C10.6829 14.2703 10.2367 14.307 9.78487 14.307C9.19185 14.307 8.61011 14.2449 8.04251 14.1234C7.71776 14.05 7.39301 13.9568 7.07674 13.8439L6.89601 13.7789L6.71527 13.8439C6.42158 13.9483 6.12225 14.0387 5.82009 14.1065C5.22989 14.2364 4.62276 14.3042 4.00149 14.3042C3.56379 14.3042 3.13172 14.2703 2.71096 14.2053C2.14618 14.1093 1.58704 13.954 1.04485 13.7365C1.04485 13.7365 0.974254 13.7083 0.948838 13.697C0.872593 13.6631 0.533717 13.4937 0.533717 13.4937V11.2487C1.6181 11.7288 2.7872 11.9914 4.00431 11.9914C5.00962 11.9914 5.98106 11.8135 6.89601 11.4802C7.81378 11.8106 8.78521 11.9914 9.7877 11.9914C11.0217 11.9914 12.2021 11.7231 13.2978 11.2317C13.295 11.997 13.295 12.7369 13.295 13.4768ZM13.3091 10.3592C13.3091 10.3592 13.2724 10.3337 13.2075 10.2886C12.9759 10.1361 12.3716 9.76894 11.547 9.54303C11.4707 9.52326 11.05 9.43008 10.9144 9.41032C10.6885 9.37643 10.4541 9.35948 10.2085 9.35948C9.98254 9.35948 9.74815 9.3736 9.51094 9.41032C9.42905 9.42443 7.93802 9.60234 6.99766 10.7743C6.99483 10.7771 6.85082 10.9663 6.84517 10.9719C6.84517 10.9719 5.69301 11.3701 4.88537 11.4407C4.58322 11.4661 4.28106 11.4802 3.97326 11.4802C3.68522 11.4802 3.39999 11.4633 3.12043 11.4351C2.76744 11.3983 2.41727 11.3419 2.07558 11.2628C2.56129 10.4156 3.41976 9.35948 3.41976 9.35948C4.28388 8.34569 5.52076 7.20483 7.06262 6.60898C7.07956 6.60334 7.4269 6.47061 7.58787 6.4226C8.61577 6.12327 9.47989 6.14304 10.1096 6.30965C11.3634 6.64005 11.643 7.4364 11.7051 7.72726C11.7249 7.80633 11.7334 8.09154 11.7334 8.09154L12.0412 8.2045C12.3405 8.32593 12.5749 8.46713 12.7556 8.61962C12.7754 8.63656 12.8375 8.69021 12.8404 8.69586C13.0606 8.89918 13.2159 9.11098 13.2724 9.3256C13.408 9.85085 13.3091 10.3592 13.3091 10.3592Z",
  logo2: "M10.1577 7.2161C10.1548 7.2161 10.152 7.21327 10.1492 7.21327C9.87526 7.14268 9.59569 7.34036 9.57028 7.6284C9.56745 7.66228 9.56464 7.69335 9.56464 7.72723C10.1068 7.71876 10.6321 7.79218 11.1291 7.9362C11.1997 7.95879 11.1404 7.88254 11.1375 7.87972C11.0189 7.72723 10.6773 7.35165 10.1577 7.2161Z",
};

export function PrincipalMenuFigma() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useEcosystemNavItems();

  const visibleItems = items.filter((item) => item.href);

  return (
    <div className="bg-white w-full relative z-[3]">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="flex flex-col items-center justify-center px-5 md:px-[80px] relative w-full">
          <div className="flex gap-[24px] items-center justify-center max-w-[1536px] py-[8px] relative w-full">

            {/* Logo MBC — fill fixo #11181C, sem condicionais de dark mode per spec */}
            <div className="flex flex-[1_0_0] items-center min-w-px relative">
              <div className="h-[20px] relative shrink-0 w-[13.823px]">
                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8231 20">
                  <path d={svgPaths.logo1} fill="#11181C" />
                  <path d={svgPaths.logo2} fill="#11181C" />
                </svg>
              </div>
            </div>

            {/* Desktop links — gap-4 = calc(var(--spacing)*4) per spec */}
            <nav className="hidden md:flex gap-4 items-center justify-center shrink-0" aria-label="Ecossistema MBC">
              {visibleItems.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={[
                    "flex items-center justify-center min-h-[24px] px-[8px] py-[3px] shrink-0",
                    "font-['Inter',sans-serif] font-normal text-[12px] leading-[1.4] whitespace-nowrap",
                    "transition-colors",
                    link.isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                  aria-current={link.isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Slot de identidade/sessão */}
            <div className="flex flex-[1_0_0] items-center justify-end min-w-px gap-3">
              {/* Mobile toggle */}
              <button
                className="md:hidden inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/10"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen
                  ? <X size={20} strokeWidth={1.8} aria-hidden="true" />
                  : <Menu size={20} strokeWidth={1.8} aria-hidden="true" />
                }
              </button>

              {/* Entrar */}
              <div className="relative flex gap-[6px] items-center justify-center min-h-[24px] px-[8px] py-[3px] rounded-[9999px] shrink-0 cursor-pointer hover:bg-foreground/10 transition-colors">
                <div aria-hidden="true" className="absolute border border-[#eceef0] inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]" />
                <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#11181c] leading-[1.4] whitespace-nowrap">
                  Entrar
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile overlay — bg-white dark:bg-black, text-foreground, sem muted per spec */}
      <div
        className={[
          "md:hidden absolute top-full left-0 w-full bg-white dark:bg-black z-50",
          "border-b border-[#eceef0]",
          "overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-1 py-3 px-5" aria-label="Ecossistema MBC">
          {visibleItems.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="font-['Inter',sans-serif] font-normal text-[14px] text-foreground leading-[1.4] py-2 px-2 rounded-md transition-colors hover:bg-foreground/10"
              onClick={() => setMobileOpen(false)}
              aria-current={link.isActive ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
