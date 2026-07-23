import Image, { type ImageProps } from "next/image";

export default function HeroImage({ className, ...props }: ImageProps) {
  return <Image {...props} className={className} />;
}
