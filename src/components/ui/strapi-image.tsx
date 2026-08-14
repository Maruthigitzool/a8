import Image, { type ImageProps } from "next/image";

import { getStrapiMediaUrl } from "@/app/lib/strapi-media";

type StrapiImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

export function StrapiImage({ src, alt, ...props }: StrapiImageProps) {
  const resolvedSrc = getStrapiMediaUrl(src);

  if (!resolvedSrc) {
    return null;
  }

  return (
    <Image
      {...props}
      src={resolvedSrc}
      alt={alt}
      unoptimized
    />
  );
}
