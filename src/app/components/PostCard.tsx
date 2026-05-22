import type { Post } from "./blog-data";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-[12px] hover:opacity-90 transition-opacity"
    >
      {/* Thumbnail: aspect-[16/9], rounded-[16px], bg-[#e0e0e0] */}
      <div className="aspect-[16/9] overflow-hidden rounded-[16px] bg-[#e0e0e0] relative">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="absolute inset-0 max-w-none object-cover rounded-[16px] size-full group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      <div className="flex flex-col gap-[8px]">
        <span className="font-['Inter',sans-serif] font-medium text-[12px] text-[#7e868c] tracking-[1.2px] uppercase leading-[1.4]">
          {post.category}
        </span>
        <p className="font-['Inter',sans-serif] font-semibold text-[18px] text-[#11181c] tracking-[-0.72px] leading-[1.2] line-clamp-2">
          {post.title}
        </p>
        <p className="font-['Inter',sans-serif] font-normal text-[14px] text-[#687076] tracking-[-0.28px] leading-[1.4] line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </a>
  );
}
