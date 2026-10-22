import { photoUrl, type Photo } from "@/lib/photos";

type PhotoProps = {
  photo: Photo;
  priority?: boolean;
  alt?: string;
  className?: string;
};

export function Photo({ photo, priority = false, alt, className }: PhotoProps) {
  const label = alt ?? photo.alt;
  return (
    <picture className={className}>
      <source srcSet={photoUrl(photo, "webp")} type="image/webp" />
      {/* The JPEG is the fallback and the file an owner replaces first. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photoUrl(photo, "jpg")}
        alt={label}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}

export function Frame({
  photo,
  priority = false,
  className = "",
}: {
  photo: Photo;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`frame ${className}`.trim()}>
      <Photo photo={photo} priority={priority} />
    </div>
  );
}
