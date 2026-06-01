import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  via?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  from = "from-zinc-950",
  via = "via-red-600",
  to = "to-zinc-950",
  animate = true,
}: GradientTextProps) {
  const gradientClass = via
    ? `bg-gradient-to-r ${from} ${via} ${to}`
    : `bg-gradient-to-r ${from} ${to}`;

  return (
    <span
      className={cn(
        gradientClass,
        "bg-clip-text text-transparent",
        animate && "animate-gradient bg-[length:200%_auto]",
        "dark:from-white dark:via-red-500 dark:to-white",
        className
      )}
    >
      {children}
    </span>
  );
}
