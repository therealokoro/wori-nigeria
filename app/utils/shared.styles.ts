export const buttonStyles = tv({
  base: `focus:highlight-ring group flex items-center justify-center gap-1 whitespace-nowrap w-min rounded-$radius text-sm font-medium ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50`,
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      "sm": "h-7 px-2 text-[0.67rem] font-semibold",
      "default": "h-7 px-2 text-xs sm:(h-9 px-4 text-sm)",
      "lg": "h-11 px-8 text-base",
      "icon-sm": "size-7",
      "icon": "size-9"
    },
    effect: {
      hover: `border-2 border-transparent hover:bg-transparent hover:text-foreground hover:border-primary transition`
    },
    disabled: {
      true: "pointer-events-none opacity-50"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
})
