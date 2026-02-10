import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "outline-blue" | "outline-destructive" | "secondary" | "ghost" | "dashed" | "link"
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-xs" | "icon-lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          {
            "bg-blue-600 text-white hover:bg-blue-700 border border-transparent shadow-sm": variant === "default",
            "bg-red-600 text-white hover:bg-red-700 shadow-sm": variant === "destructive",
            "bg-white border-[1.5px] border-slate-300 text-gray-700 hover:bg-brand-gray-100 hover:border-slate-400 active:bg-brand-gray-200 shadow-sm": variant === "outline",
            "bg-white border-[1.5px] border-blue-600 text-blue-600 hover:bg-blue-50 shadow-sm": variant === "outline-blue",
            "bg-white border-[1.5px] border-slate-300 text-gray-600 hover:text-red-600 hover:bg-red-50 shadow-sm": variant === "outline-destructive",
            "bg-gray-100 text-gray-900 hover:bg-gray-200 shadow-sm": variant === "secondary",
            "hover:bg-brand-gray-100 text-gray-700": variant === "ghost",
            "border border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-300 hover:text-blue-500": variant === "dashed",
            "text-gray-900 underline-offset-4 hover:underline": variant === "link",
          },
          {
            "h-10 px-4 py-2": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8": size === "lg",
            "h-9 w-9": size === "icon",
            "h-8 w-8": size === "icon-sm",
            "h-6 w-6 p-0.5": size === "icon-xs",
            "h-11 w-11": size === "icon-lg",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
