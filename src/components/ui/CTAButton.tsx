// CTA 按钮：主按钮（金色）/ 次按钮（描边），内部使用 <a> 支持站内外链接
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function CTAButton({ href, children, variant = "primary", className = "" }: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-gold-500 text-brand-950 hover:bg-gold-400"
      : "border border-white/40 text-white hover:bg-white/10";

  // 站外链接（http/https/mailto）用 <a>，站内用 next/link
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const cls = `${base} ${styles} ${className}`;

  if (isExternal) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
