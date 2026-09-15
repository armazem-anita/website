import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <h2
        className={cn(
          "font-display text-4xl leading-none tracking-wide uppercase md:text-5xl lg:text-6xl",
          light ? "text-white" : "text-anita-black",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-base md:text-lg",
            light ? "text-white/80" : "text-anita-gray",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
