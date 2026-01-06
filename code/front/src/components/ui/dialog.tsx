import * as React from "react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 pointer-events-auto">{children}</div>
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  className?: string
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    )
  }
)
DialogContent.displayName = "DialogContent"

interface DialogHeaderProps {
  children: React.ReactNode
  className?: string
}

const DialogHeader = ({ children, className }: DialogHeaderProps) => {
  return (
    <div className={cn("px-6 py-5 border-b border-[#E9EAEB]", className)}>
      {children}
    </div>
  )
}

interface DialogTitleProps {
  children: React.ReactNode
  className?: string
}

const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <h2 className={cn("text-xl font-semibold text-[#181d27]", className)}>
      {children}
    </h2>
  )
}

interface DialogDescriptionProps {
  children: React.ReactNode
  className?: string
}

const DialogDescription = ({ children, className }: DialogDescriptionProps) => {
  return (
    <p className={cn("text-sm text-[#535862] mt-1", className)}>{children}</p>
  )
}

interface DialogBodyProps {
  children: React.ReactNode
  className?: string
}

const DialogBody = ({ children, className }: DialogBodyProps) => {
  return <div className={cn("px-6 py-5", className)}>{children}</div>
}

interface DialogFooterProps {
  children: React.ReactNode
  className?: string
}

const DialogFooter = ({ children, className }: DialogFooterProps) => {
  return (
    <div
      className={cn(
        "px-6 py-4 border-t border-[#E9EAEB] flex items-center justify-end gap-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
}
