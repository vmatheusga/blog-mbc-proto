import type { Post } from "./blog-data";

/*
 * Exact SVG divider from Figma:
 * h-0 relative shrink-0 w-full
 * Inner div: absolute inset-[-0.5px_0]
 * SVG: viewBox="0 0 400 1", path: "M0 0.5H400", stroke="#ECEEF0"
 */
function Divider() {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <div className="absolute inset-[-0.5px_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 400 1">
          <path d="M0 0.5H400" stroke="#ECEEF0" />
        </svg>
      </div>
    </div>
  );
}

/*
 * Each trending row: gap-[15px] items-start
 * Thumbnail: h-[68px] w-[120px] rounded-[12px] bg-[#e0e0e0]
 * Title: font-semibold text-[18px] text-[#11181c] tracking-[-0.72px] leading-[1.2]
 * Desc: font-normal text-[14px] text-[#687076] tracking-[-0.28px] leading-[1.4]
 * Text block: gap-[8px] pr-[16px]
 */
function TrendingItem({ post }: { post: Post }) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-[15px] items-start relative shrink-0 w-full hover:opacity-80 transition-opacity"
    >
      {/* Thumbnail: h-[68px] w-[120px] rounded-[12px] */}
      <div className="h-[68px] relative rounded-[12px] shrink-0 w-[120px]">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
          <div className="absolute bg-[#e0e0e0] inset-0 rounded-[12px]" />
          <img
            alt={post.title}
            className="absolute max-w-none object-cover rounded-[12px] size-full"
            src={post.imageUrl}
          />
        </div>
      </div>

      {/* Text block */}
      <div className="flex-[1_0_0] min-w-px relative">
        <div className="flex flex-col gap-[8px] items-start pr-[16px] relative size-full">
          <div className="flex flex-col justify-center relative shrink-0 text-[#11181c]">
            <p className="font-['Inter',sans-serif] font-semibold text-[18px] tracking-[-0.72px] leading-[1.2] overflow-hidden line-clamp-2">
              {post.title}
            </p>
          </div>
          <div className="flex flex-col justify-center min-w-full overflow-hidden relative shrink-0 text-[#687076]">
            <p className="font-['Inter',sans-serif] font-normal text-[14px] tracking-[-0.28px] leading-[1.4] overflow-hidden text-ellipsis line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

type TrendingPostsProps = {
  posts: Post[];
};

export function TrendingPosts({ posts }: TrendingPostsProps) {
  return (
    /*
     * BannerGrid: flex-[1_0_0] flex-col items-start max-w-[400px] self-stretch
     * Frame7: title area (Title2) with h-[56px] gap-[8px] items-start
     * Frame17: list items between dividers, justify-between
     */
    <div className="flex flex-[1_0_0] flex-col items-start max-w-[400px] min-w-px relative self-stretch">

      {/* Frame7 — title h-[56px] */}
      <div className="flex flex-col items-start relative shrink-0 w-full">
        <div className="flex gap-[8px] h-[56px] items-start relative shrink-0 w-full">
          <div className="flex flex-[1_0_0] flex-col items-center justify-center min-w-px relative">
            <div className="flex flex-col justify-center relative shrink-0 text-[#11181c] w-full">
              <p className="font-['Inter',sans-serif] font-semibold text-[24px] tracking-[-0.96px] leading-[1.2]">
                Em alta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frame17 — list with SVG dividers, justify-between, flex-[1_0_0] */}
      <div className="flex flex-[1_0_0] flex-col items-center justify-between min-h-px relative w-full">
        {posts.map((post) => (
          <div key={post.id} className="contents">
            <Divider />
            <TrendingItem post={post} />
          </div>
        ))}
        <Divider />
      </div>

    </div>
  );
}
