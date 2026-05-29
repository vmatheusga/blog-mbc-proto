import { useState, useEffect } from "react";
import { useAuth } from "../../features/auth/AuthContext";
import { categories } from "./blog-data";
import { UserMenu } from "./UserMenu";

const chevronPath = "M8.19526 0.195262C8.45561 -0.0650874 8.87762 -0.0650874 9.13797 0.195262C9.39832 0.455612 9.39832 0.877621 9.13797 1.13797L5.13797 5.13797C4.87762 5.39832 4.45561 5.39832 4.19526 5.13797L0.195262 1.13797C-0.0650874 0.877621 -0.0650874 0.455612 0.195262 0.195262C0.455612 -0.0650874 0.877621 -0.0650874 1.13797 0.195262L4.66662 3.72391L8.19526 0.195262Z";
const searchPath = "M10.6667 6C10.6667 3.42267 8.57733 1.33333 6 1.33333C3.42267 1.33333 1.33333 3.42267 1.33333 6C1.33333 8.57733 3.42267 10.6667 6 10.6667C8.57733 10.6667 10.6667 8.57733 10.6667 6ZM12 6C12 7.41664 11.5079 8.7177 10.6868 9.74414L13.138 12.1953C13.3984 12.4557 13.3984 12.8777 13.138 13.138C12.8777 13.3984 12.4557 13.3984 12.1953 13.138L9.74414 10.6868C8.7177 11.5079 7.41664 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6Z";

const menuLinkClassName =
  "inline-flex h-9 w-max items-center justify-center rounded-full bg-transparent px-3 text-[12px] font-medium leading-[1.4] text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus:bg-muted/70 focus:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-muted data-[active=true]:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground";

const topbarIconFrameClassName = "inline-flex size-6 items-center justify-center";

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
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={[
          "sticky top-0 z-50 shrink-0 w-full",
          "border-b border-[#ECEEF0] bg-white/92 text-[#11181C] backdrop-blur-[6.5px]",
          "transition-shadow duration-300",
          isScrolled ? "shadow-[0_8px_24px_rgba(17,24,28,0.06)]" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-[52px] w-full max-w-[1536px] items-center gap-4 px-10 xl:px-20">

              <div className="flex flex-[1_0_0] h-full items-center min-w-px relative">
                <div className="relative inline-flex h-9 items-center overflow-hidden shrink-0 min-w-[76px]">
                  <span
                    className={[
                      "font-['Inter',sans-serif] font-semibold text-xl text-[#11181c] tracking-[-0.04em] leading-[1.1] whitespace-nowrap",
                      "transition-all duration-300",
                      isScrolled ? "-translate-y-2 opacity-0" : "translate-y-0 opacity-100",
                    ].join(" ")}
                    aria-hidden={isScrolled}
                  >
                    Blog
                  </span>
                  <img
                    src="/logos/preta.svg"
                    alt="Blog MBC"
                    width={76}
                    height={34}
                    className={[
                      "absolute left-0 h-[28px] w-auto object-contain",
                      "transition-all duration-300",
                      isScrolled ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                    ].join(" ")}
                    aria-hidden={!isScrolled}
                  />
                </div>

                <div className="hidden md:flex flex-[1_0_0] gap-1 items-center justify-end min-w-px">

                  <div className="relative">
                    <button
                      className={`${menuLinkClassName} gap-1`}
                      onClick={() => setShowCategories(!showCategories)}
                      aria-expanded={showCategories}
                      aria-haspopup="listbox"
                    >
                      <span>Categorias</span>
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

                    <div
                      className={[
                        "absolute top-full left-0 mt-1 z-50",
                        "bg-white border border-[#ECEEF0] rounded-lg",
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
                            "w-full rounded-full px-3 py-2 text-left",
                            "font-['Inter',sans-serif] text-[13px] font-medium leading-none",
                            "transition-colors hover:bg-muted/70 hover:text-foreground",
                            selectedCategory === cat
                              ? "bg-muted text-foreground"
                              : "text-muted-foreground",
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

                  <button className={menuLinkClassName}>
                    <span>Vídeos</span>
                  </button>

                  <button className={menuLinkClassName}>
                    <span>Notícias</span>
                  </button>
                </div>
              </div>

              <div className="flex shrink-0 items-center">
                <div className="min-h-[36px] relative rounded-[9999px] shrink-0 w-[180px] md:w-[286px]">
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
                  <div aria-hidden="true" className="absolute border border-[#ECEEF0] inset-0 pointer-events-none rounded-[9999px] " />
                </div>

                <div
                  className={[
                    "grid max-w-0 translate-x-2 overflow-hidden opacity-0",
                    "transition-[max-width,margin,opacity,transform] duration-300 ease-out",
                    isScrolled && isAuthenticated ? "ml-2 max-w-6 translate-x-0 opacity-100" : "",
                  ].join(" ")}
                  aria-hidden={!isScrolled || !isAuthenticated}
                >
                  {isScrolled && isAuthenticated ? (
                    <div className={topbarIconFrameClassName}>
                      <UserMenu />
                    </div>
                  ) : null}
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
