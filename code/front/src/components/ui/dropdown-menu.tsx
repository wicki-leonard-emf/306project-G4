import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="relative" ref={menuRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            setIsOpen,
            menuRef,
          })
        }
        return child
      })}
    </div>
  )
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, isOpen, setIsOpen, ...props }, ref) => {
    return (
      <button
        ref={ref}
        onClick={() => setIsOpen?.(!isOpen)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

interface DropdownMenuContentPropsWithRef extends DropdownMenuContentProps {
  menuRef?: React.RefObject<HTMLDivElement>
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentPropsWithRef>(
  ({ children, className, isOpen, setIsOpen, menuRef }, ref) => {
    React.useEffect(() => {
      if (!isOpen) return

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (menuRef?.current && !menuRef.current.contains(target)) {
          setIsOpen?.(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, setIsOpen, menuRef])

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        role="menu"
        className={cn(
          "absolute top-full right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-slate-950 border border-[#d5d7da] dark:border-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]",
          className
        )}
      >
        <div className="py-1">{children}</div>
      </div>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "w-full text-left px-4 py-2 text-sm text-[#414651] hover:bg-gray-100 transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem }
