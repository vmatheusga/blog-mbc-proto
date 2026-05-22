import { useState, useMemo } from "react";
import { PrincipalMenuFigma } from "./components/PrincipalMenuFigma";
import { BlogTopbar } from "./components/BlogTopbar";
import { HeroPost } from "./components/HeroPost";
import { TrendingPosts } from "./components/TrendingPosts";
import { PostCard } from "./components/PostCard";
import { ColumnistCard } from "./components/ColumnistCard";
import { posts, columnists } from "./components/blog-data";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = posts[0];
  const trendingPosts = posts.slice(1, 6);

  const isDefaultView = selectedCategory === "Todos" && searchQuery === "";

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        post.categories.includes(selectedCategory);
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    /*
     * pageblock: bg-white flex-col isolate items-center overflow-x-clip overflow-y-auto w-full
     * principalMenu z-[3], topbar z-[2], main z-[1]
     */
    <div className="bg-white flex flex-col items-start relative size-full">
      <div className="bg-white flex flex-col isolate items-center overflow-x-clip overflow-y-auto relative shrink-0 w-full min-h-screen">

        {/* principalMenu — z-[3] */}
        <PrincipalMenuFigma />

        {/* topbar — z-[2], sticky, backdrop-blur */}
        <BlogTopbar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* main — z-[1] bg-white */}
        <div className="bg-white flex flex-col items-center relative shrink-0 z-[1] w-full">
          <div className="flex flex-col items-start relative shrink-0 w-full max-w-[1536px]">

            {isDefaultView ? (
              <>
                {/* Hero + Trending section — px-[80px] py-[40px] gap-[40px] */}
                <div className="relative shrink-0 w-full">
                  <div className="flex gap-[40px] items-start px-5 md:px-[80px] py-[40px] relative w-full">
                    <HeroPost post={featuredPost} />
                    <TrendingPosts posts={trendingPosts} />
                  </div>
                </div>

                {/* More posts grid */}
                <div className="px-5 md:px-[80px] pb-[60px] w-full">
                  <p className="font-['Inter',sans-serif] font-semibold text-[24px] text-[#11181c] tracking-[-0.96px] leading-[1.2] mb-6">
                    Mais artigos
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                    {posts.slice(5).map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Filtered view */
              <div className="px-5 md:px-[80px] py-[40px] w-full">
                {filteredPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <p className="font-['Inter',sans-serif] font-semibold text-[20px] text-[#11181c] tracking-[-0.8px]">
                      Nenhum artigo encontrado
                    </p>
                    <p className="font-['Inter',sans-serif] font-normal text-[15px] text-[#7e868c]">
                      Tente outro termo ou categoria
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-3 mb-8">
                      <p className="font-['Inter',sans-serif] font-semibold text-[24px] text-[#11181c] tracking-[-0.96px] leading-[1.2]">
                        {selectedCategory !== "Todos" ? selectedCategory : "Resultados"}
                      </p>
                      <span className="font-['Inter',sans-serif] font-normal text-[14px] text-[#7e868c] tracking-[-0.28px]">
                        {filteredPosts.length}{" "}
                        {filteredPosts.length === 1 ? "artigo" : "artigos"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                      {filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Columnists */}
            <div className="w-full border-t border-[#eceef0] mt-4">
              <div className="px-5 md:px-[80px] py-[60px]">
                <p className="font-['Inter',sans-serif] font-semibold text-[24px] text-[#11181c] tracking-[-0.96px] leading-[1.2] mb-6">
                  Colunistas
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {columnists.map((columnist) => (
                    <ColumnistCard key={columnist.id} columnist={columnist} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#eceef0] bg-white w-full">
          <div className="max-w-[1536px] mx-auto px-5 md:px-[80px] py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="font-['Inter',sans-serif] font-semibold text-[14px] text-[#11181c]">
              Blog — Minha Biblioteca Católica
            </span>
            <p className="font-['Inter',sans-serif] font-normal text-[13px] text-[#7e868c]">
              © 2026 Minha Biblioteca Católica. Todos os direitos reservados.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
