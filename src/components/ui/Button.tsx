import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "ghost" | "ghost-inv";

const variants: Record<Variant, string> = {
  primary: "border-ink bg-ink text-cream hover:bg-transparent hover:text-ink",
  dark: "border-ink bg-ink text-cream hover:bg-transparent hover:text-ink",
  ghost: "border-ink/30 bg-transparent text-ink hover:border-ink",
  "ghost-inv": "border-cream/40 bg-transparent text-cream hover:border-cream",
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
  const classes = `inline-flex items-center justify-center gap-2 border px-6 py-3 font-body text-[13px] uppercase tracking-[0.12em] transition duration-200 ${variants[variant]} ${className}`;

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
