import { heroData } from "@/data/heroData";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["400", "700"], 
  subsets: ["latin"],
});

export default function Hero2() {
  return (
    <>
      <div className="relative h-screen overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('/squared-bg-element.svg')] dark:before:bg-[url('/squared-bg-element-dark.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 ">
        <div className="max-w-screen-2xl  mx-auto px-2 sm:px-4 lg:px-6 pt-24 pb-10 mt-10">
          <div className="mt-5 max-w-4xl text-center mx-auto">
            <h1 className={`${roboto.className} block font-bold text-gray-800 text-5xl md:text-6xl lg:text-7xl dark:text-neutral-200`}>
              {heroData.title}{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
                {heroData.highlightedText}
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-4xl text-center mx-auto">
            <p className="text-xl text-gray-600 dark:text-neutral-400 font-inter">
              {heroData.description}
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-none focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-lg font-medium rounded-full py-3 px-4"
              href="#"
            >
              {heroData.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}