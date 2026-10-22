type LogoProps = {
  className?: string;
  alt: string;
  width: number;
  height: number;
};

/** The real wordmark file. Do not retype the name in its place. */
export function Logo({ className, alt, width, height }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src="brand/logo-horizontal.svg"
      alt={alt}
      width={width}
      height={height}
      decoding="async"
    />
  );
}
