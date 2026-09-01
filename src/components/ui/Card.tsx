// 通用卡片容器：统一圆角、边框、悬停效果
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** 是否显示悬停上浮效果 */
  hoverable?: boolean;
}

export function Card({ children, className = "", hoverable = false }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${
        hoverable ? "transition-shadow hover:shadow-md" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
