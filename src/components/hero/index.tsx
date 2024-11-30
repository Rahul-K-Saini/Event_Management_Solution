import { BackgroundLines } from "@/components/ui/background-lines";
import { heroData } from "@/data/heroData";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center pt-20 flex-col">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        {heroData.title} <br /> {heroData.highlightedText}
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        {heroData.description}
      </p>
    </BackgroundLines>
  );
}
