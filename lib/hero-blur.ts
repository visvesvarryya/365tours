import blurMap from "./hero-blur.json";

const map: Record<string, string> = blurMap;

// Looks up the pre-generated tiny blur placeholder for a hero image (local
// path or remote URL). Returns undefined if none was generated for it —
// callers should treat that as "no blur, render normally".
export function heroBlur(src: string): string | undefined {
  return map[src];
}
