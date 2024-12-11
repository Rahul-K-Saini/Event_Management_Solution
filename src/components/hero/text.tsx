import WordPullUp from "@/components/ui/word-pull-up";
import BlurIn from "@/components/ui/blur-in";

export function WordPullUpDemo() {
  return (
    <WordPullUp
      className="text-4xl mt-8 font-bold t  text-gray-950 dark:text-gray-100 md:text-7xl md:leading-[5rem]"
      words="Event Management Solution"
    />
  );
}

export function BlurInDemo() {
  return (
    <BlurIn
      word="Welcome to EventManager - Your All-in-One Event Management Solution At EventManager, we transform your event ideas into unforgettable experiences. Whether you're planning a corporate conference, a dreamy wedding, or a community festival, our powerful platform streamlines every aspect of event management"
      className=" md:text-xl text-base font-normal sm:mt-10 mt-4 leading-8  text-gray-900 dark:text-gray-300"
    />
  );
}