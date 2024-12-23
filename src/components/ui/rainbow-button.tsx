import React from "react";
import { cn } from "@/lib/utils";

type RainbowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:400%] px-8 py-6 font-medium text-primary-foreground transition-all duration-500 ease-in-out hover:bg-[length:300%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        // before styles - increased blur and spread
        "before:absolute before:bottom-[-30%] before:left-1/2 before:z-0 before:h-1/4 before:w-4/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(1.2*1rem))] before:transition-all before:duration-500 before:ease-in-out group-hover:before:w-full group-hover:before:[filter:blur(calc(1.5*2rem))]",
        // light mode colors with wider gradient
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))]",
        // dark mode colors with wider gradient
        "dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
