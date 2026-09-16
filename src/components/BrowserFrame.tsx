import Image from "next/image";

export function BrowserFrame({
  src,
  alt,
  label,
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  label?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/25 ${className}`}
    >
      <div aria-hidden className="flex h-8 items-center gap-3 border-b border-line px-3.5">
        <span className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
          <span className="size-2 rounded-full bg-line-strong" />
        </span>
        {label && (
          <span className="label truncate text-faint normal-case tracking-normal">{label}</span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    </div>
  );
}
