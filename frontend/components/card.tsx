import React from "react"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-card rounded-2xl border border-border overflow-hidden shadow-ambient transition-all duration-200 hover:shadow-lg hover:border-primary/20",
      className,
    )}
    {...props}
  />
))

Card.displayName = "Card"
