import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg transition-colors disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-[#7f56d9] text-white hover:bg-[#6941c6] border border-[#7f56d9] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]": variant === "default",
            "bg-white text-[#414651] hover:bg-gray-50 border border-[#d5d7da] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]": variant === "outline",
            "hover:bg-gray-100": variant === "ghost",
            "bg-[#fafafa] text-[#414651] hover:bg-gray-200": variant === "secondary",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-9 px-3 py-2": size === "sm",
            "h-11 px-8": size === "lg",
            "h-9 w-9 p-2": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
