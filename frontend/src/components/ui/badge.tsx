import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "destructive"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        {
          "border-transparent bg-brand-900 text-brand-50 shadow hover:bg-brand-900/80":
            variant === "default",
          "border-transparent bg-brand-100 text-brand-900 hover:bg-brand-100/80":
            variant === "secondary",
          "text-foreground hidden border-brand-200": variant === "outline",
          "border-transparent bg-green-100 text-green-800 hover:bg-green-100/80":
            variant === "success",
          "border-transparent bg-red-100 text-red-800 hover:bg-red-100/80":
            variant === "destructive",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
