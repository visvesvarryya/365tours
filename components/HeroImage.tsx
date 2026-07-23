import Image, { type ImageProps } from "next/image";
import { heroBlur } from "@/lib/hero-blur";

export default function HeroImage({ className, src, ...props }: ImageProps) {
  const blurDataURL = typeof src === "string" ? heroBlur(src) : undefined;

  return (
    <Image
      {...props}
      src={src}
      className={className}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
    />
  );
}
