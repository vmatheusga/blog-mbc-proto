import { useState, useEffect } from "react";
import { categories } from "./blog-data";

const chevronPath = "M8.19526 0.195262C8.45561 -0.0650874 8.87762 -0.0650874 9.13797 0.195262C9.39832 0.455612 9.39832 0.877621 9.13797 1.13797L5.13797 5.13797C4.87762 5.39832 4.45561 5.39832 4.19526 5.13797L0.195262 1.13797C-0.0650874 0.877621 -0.0650874 0.455612 0.195262 0.195262C0.455612 -0.0650874 0.877621 -0.0650874 1.13797 0.195262L4.66662 3.72391L8.19526 0.195262Z";
const searchPath = "M10.6667 6C10.6667 3.42267 8.57733 1.33333 6 1.33333C3.42267 1.33333 1.33333 3.42267 1.33333 6C1.33333 8.57733 3.42267 10.6667 6 10.6667C8.57733 10.6667 10.6667 8.57733 10.6667 6ZM12 6C12 7.41664 11.5079 8.7177 10.6868 9.74414L13.138 12.1953C13.3984 12.4557 13.3984 12.8777 13.138 13.138C12.8777 13.3984 12.4557 13.3984 12.1953 13.138L9.74414 10.6868C8.7177 11.5079 7.41664 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z";

type BlogTopbarProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function BlogTopbar({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: BlogTopbarProps) {
  const [showCategories, setShowCategories] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Topbar sticky — glassmorphism: bg-white/80 + backdrop-blur + border-b + shadow ao rolar */}
      <div
        className={[
          "sticky top-0 z-[2] shrink-0 w-full",
          "backdrop-blur-[6.5px] bg-white/80",
          "border-b border-[#eceef0]",
          "transition-shadow duration-300",
          isScrolled ? "shadow-[0_8px_24px_rgba(17,24,28,0.06)]" : "",
        ].join(" ")}
      >
        <div className="flex flex-row items-center justify-center overflow-clip h-[52px] w-full">
          <div className="flex items-center justify-center px-5 md:px-[80px] py-[8px] relative size-full">
            <div className="flex flex-[1_0_0] flex-row items-center self-stretch gap-[16px] max-w-[1536px] w-full">

              {/* Left: Blog title/logo + nav links */}
              <div className="flex flex-[1_0_0] h-full items-center min-w-px relative">
                {/* Container com overflow-hidden para clipar as duas transições */}
                <div className="relative inline-flex h-9 items-center overflow-hidden shrink-0 min-w-[52px]">
                  <span
                    className={[
                      "font-['Inter',sans-serif] font-semibold text-[20px] text-[#11181c] tracking-[-0.8px] leading-[1.1] whitespace-nowrap",
                      "transition-all duration-300",
                      isScrolled ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100",
                    ].join(" ")}
                    aria-hidden={isScrolled}
                  >
                    Blog
                  </span>
                  <img
                    src="/mbc-logo.svg"
                    alt="Minha Biblioteca Católica"
                    className={[
                      "absolute left-0 h-[20px] w-auto object-contain",
                      "transition-all duration-300",
                      isScrolled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    ].join(" ")}
                    aria-hidden={!isScrolled}
                  />
                </div>

                {/* Nav links — desktop */}
                <div className="hidden md:flex flex-[1_0_0] gap-[8px] items-center justify-end min-w-px">

                  {/* Categorias com dropdown animado */}
                  <div className="relative">
                    <button
                      className="flex gap-[6px] items-center justify-center min-h-[32px] px-[12px] py-[6px] rounded-[8px] hover:bg-black/5 transition-colors shrink-0"
                      onClick={() => setShowCategories(!showCategories)}
                      aria-expanded={showCategories}
                      aria-haspopup="listbox"
                    >
                      <span className="font-['Inter',sans-serif] font-normal text-[14px] text-[#7e868c] tracking-[-0.28px] leading-[1.4] whitespace-nowrap">
                        Categorias
                      </span>
                      {/* Chevron animado — rota 180° quando aberto */}
                      <div
                        className={[
                          "overflow-clip relative shrink-0 size-[16px]",
                          "transition-transform duration-200",
                          showCategories ? "rotate-180" : "rotate-0",
                        ].join(" ")}
                      >
                        <div className="absolute inset-[33.33%_20.83%]">
                          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.33323 5.33323">
                            <path d={chevronPath} fill="#11181C" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Dropdown animado — opacity + translateY, sempre no DOM */}
                    <div
                      className={[
                        "absolute top-full left-0 mt-1 z-50",
                        "bg-white border border-[#eceef0] rounded-[12px]",
                        "shadow-[0px_8px_24px_rgba(0,0,0,0.08)]",
                        "py-1.5 min-w-[180px]",
                        "transition-all duration-200 ease-out origin-top",
                        showCategories
                          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                          : "opacity-0 -translate-y-1 scale-[0.98] pointer-events-none",
                      ].join(" ")}
                      role="listbox"
                    >
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          role="option"
                          aria-selected={selectedCategory === cat}
                          className={[
                            "w-full text-left px-4 py-2",
                            "font-['Inter',sans-serif] text-[14px] tracking-[-0.28px] leading-[1.4]",
                            "transition-colors hover:bg-[#f4f4f6]",
                            selectedCategory === cat
                              ? "text-[#11181c] font-medium"
                              : "text-[#7e868c] font-normal",
                          ].join(" ")}
                          onClick={() => {
                            onCategoryChange(cat);
                            setShowCategories(false);
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="flex gap-[6px] items-center justify-center min-h-[32px] px-[12px] py-[6px] rounded-[8px] hover:bg-black/5 transition-colors shrink-0">
                    <span className="font-['Inter',sans-serif] font-normal text-[14px] text-[#7e868c] tracking-[-0.28px] leading-[1.4] whitespace-nowrap">
                      Vídeos
                    </span>
                  </button>

                  <button className="flex gap-[6px] items-center justify-center min-h-[32px] px-[12px] py-[6px] rounded-[8px] hover:bg-black/5 transition-colors shrink-0">
                    <span className="font-['Inter',sans-serif] font-normal text-[14px] text-[#7e868c] tracking-[-0.28px] leading-[1.4] whitespace-nowrap">
                      Notícias
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Search */}
              <div className="bg-white min-h-[36px] relative rounded-[9999px] shrink-0 w-[180px] md:w-[286px]">
                <div className="flex gap-[8px] items-center min-h-[inherit] overflow-clip px-[12px] py-[7.5px] relative rounded-[inherit] size-full">
                  <div className="flex flex-col items-center justify-center p-[2px] relative shrink-0 w-[20px]">
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[8.33%]">
                        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 13.3333">
                          <path d={searchPath} fill="#11181C" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-[1_0_0] flex-col items-start min-w-px">
                    <input
                      type="text"
                      placeholder="Pesquisar"
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="w-full bg-transparent font-['Inter',sans-serif] font-normal text-[14px] text-[#11181c] placeholder:text-[#7e868c] tracking-[-0.28px] leading-[1.4] outline-none"
                    />
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border border-[#eceef0] inset-0 pointer-events-none rounded-[9999px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.04)]" />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Backdrop para fechar o dropdown ao clicar fora */}
      {showCategories && (
        <div className="fixed inset-0 z-40" onClick={() => setShowCategories(false)} />
      )}
    </>
  );
}
