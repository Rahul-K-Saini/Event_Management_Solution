"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { BlurInDemo, WordPullUpDemo } from "./text";
import { RainbowButton } from "@/components/ui/rainbow-button";

export default function DotPatternLinearGradient() {
  return (
    <div className="relative h-[calc(100vh-100px)] flex size-full  overflow-hidden bg-background sm:p-28 p-8 ">
      <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
        <WordPullUpDemo />
        <BlurInDemo />
      <RainbowButton className="md:text-2xl text-sm sm:mt-20 mt-16 tracking-normal">Get Started</RainbowButton>
      </p>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}
