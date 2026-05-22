import type { Columnist } from "./blog-data";

export function ColumnistCard({ columnist }: { columnist: Columnist }) {
  return (
    <a
      href={columnist.pageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-[16px] px-[16px] py-[16px] rounded-[16px] bg-[#f4f4f6] hover:bg-[#eceef0] transition-colors"
    >
      <img
        src={columnist.photoUrl}
        alt={columnist.name}
        className="w-[48px] h-[48px] rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col gap-[4px] min-w-0">
        <span className="font-['Inter',sans-serif] font-semibold text-[15px] text-[#11181c] tracking-[-0.3px] leading-[1.3] truncate">
          {columnist.name}
        </span>
        <p className="font-['Inter',sans-serif] font-normal text-[13px] text-[#7e868c] leading-[1.4] line-clamp-2">
          {columnist.bio}
        </p>
      </div>
    </a>
  );
}
