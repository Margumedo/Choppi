import React from "react"
import { cn } from "@/lib/utils"

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-foreground mb-2">{label}</label>}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">{icon}</div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-3 border-2 border-input rounded-2xl text-foreground placeholder-muted-foreground transition-all duration-200",
              "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/10",
              icon && "pl-12",
              error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/10",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    )
  },
)

CustomInput.displayName = "CustomInput"
