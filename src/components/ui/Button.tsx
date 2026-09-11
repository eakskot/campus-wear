import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-inv";

const variants: Record<Variant, string> = {
  primary:
    "bg-lime text-ink border-ink hover:bg-ink hover:text-lime",
  dark: "bg-ink text-cream border-ink hover:bg-lime hover:text-ink",
  ghost: "bg-transparent text-ink border-ink hover:bg-ink hover:text-cream",
  "ghost-inv":
    "bg-transparent text-cream border-cream hover:bg-cream hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const classes = `inline-flex items-center justify-center gap-2 border-2 px-6 py-3 font-display text-sm uppercase tracking-wide shadow-hard-sm transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
