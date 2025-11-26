import React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "store" | "stock" | "default"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      store: "bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full",
      stock: "bg-secondary/20 text-secondary text-xs font-medium px-2 py-1 rounded-md",
      default: "bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1.5 rounded-full",
    }

    return (
      <div ref={ref} className={cn(variants[variant], className)} {...props}>
        {children}
      </div>
    )
  },
)

Badge.displayName = "Badge"
