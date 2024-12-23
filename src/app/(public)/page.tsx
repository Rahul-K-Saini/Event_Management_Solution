import Hero from "@/components/hero/newHero";
import FeaturedEvents from "@/components/events/featured";
import { FeaturesSectionDemo } from "@/components/feature"
import HyperText from "@/components/ui/hyper-text";
export default function Home() {
  return (
    <>
      <Hero />
      <HyperText className="text-center text-4xl font-bold tracking-wider">
        What & Why ?
      </HyperText>
      <FeaturesSectionDemo />
      <FeaturedEvents />
    </>
  );
}
