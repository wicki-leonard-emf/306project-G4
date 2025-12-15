import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[#d5d7da] bg-white px-3.5 py-2.5 text-base text-[#181d27] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7f56d9] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

export { Select }
