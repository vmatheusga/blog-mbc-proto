import type { Post } from "./blog-data";

type HeroPostProps = {
  post: Post;
};

export function HeroPost({ post }: HeroPostProps) {
  return (
    /*
     * Frame4: flex-[1_0_0] h-[565px] flex-col items-start
     * Frame5 (title): h-[56px]  →  "Bem-vindo ao Blog"
     * Frame2 (image): aspect-[160/90] rounded-[24px] — fills remaining height
     */
    <div className="flex flex-[1_0_0] flex-col h-[565px] items-start min-w-px relative">

      {/* Frame5 — title area h-[56px] */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex flex-col h-[56px] items-start relative shrink-0 w-full">
          <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] relative shrink-0 w-full">
            <div className="flex gap-[8px] items-center relative self-start shrink-0">
              <div className="flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative">
                <div className="flex flex-col justify-center relative shrink-0 w-full">
                  <p className="font-['Inter',sans-serif] font-semibold text-[36px] text-[#11181c] tracking-[-1.44px] leading-[1.1]">
                    <span>Bem-vindo ao </span>
                    <span className="text-[#687076]">Blog</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame2 — hero image: aspect-[160/90], rounded-[24px], fills remaining flex space */}
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group aspect-[160/90] flex flex-col items-center justify-end overflow-clip relative rounded-[24px] shrink-0 w-full flex-1"
      >
        {/* Layer stack: dark bg + image + gradient */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[24px]">
          <div className="absolute bg-[#090504] inset-0 rounded-[24px]" />
          <img
            alt={post.title}
            className="absolute max-w-none object-cover rounded-[24px] size-full group-hover:scale-[1.02] transition-transform duration-500"
            src={post.imageUrl}
          />
          <div
            className="absolute inset-0 rounded-[24px]"
            style={{ backgroundImage: "linear-gradient(41.4503deg, rgb(0, 0, 0) 32.934%, rgba(0, 0, 0, 0) 59.61%)" }}
          />
        </div>

        {/* Content overlay — p-[56px] at bottom */}
        <div className="flex-[1_0_0] min-h-px relative w-full">
          <div className="flex flex-col justify-end size-full">
            <div className="flex flex-col items-start justify-end p-[56px] relative size-full">
              {/* Frame6 — text block max-w-[400px] gap-[16px] */}
              <div className="flex flex-col gap-[16px] items-start max-w-[400px] relative shrink-0 w-full text-white">
                <p className="font-['Inter',sans-serif] font-medium text-[12px] leading-[1.2] opacity-85 tracking-[1.92px] uppercase w-full shrink-0">
                  {post.category}
                </p>
                <p className="font-['Inter',sans-serif] font-semibold text-[48px] leading-[1.1] tracking-[-1.92px] w-full shrink-0">
                  {post.title}
                </p>
                <p className="font-['Inter',sans-serif] font-normal text-[16px] leading-[1.4] opacity-[0.56] tracking-[-0.32px] w-full shrink-0">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
