import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  external?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-anita-orange text-white hover:bg-anita-orange-dark shadow-lg shadow-anita-orange/25",
  secondary: "bg-anita-black text-white hover:bg-anita-black/90",
  outline:
    "border-2 border-anita-orange text-anita-orange hover:bg-anita-orange hover:text-white",
  ghost: "text-anita-black hover:text-anita-orange",
};

export function Button({
  className,
  variant = "primary",
  href,
  external,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-all duration-200 active:scale-95",
    variants[variant],
    className,
  );

  if (href) {
    const linkProps: AnchorHTMLAttributes<HTMLAnchorElement> = external
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (external || href.startsWith("http") || href.startsWith("tel:")) {
      return (
        <a href={href} className={classes} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
