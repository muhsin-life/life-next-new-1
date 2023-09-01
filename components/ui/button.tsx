import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { IconProps } from "./icons";
import { typographyVariants } from "./typography";

const buttonVariants = cva(
  "inline-flex items-center  w-fit justify-center  duration-200 transition-all active:scale-95",
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary disabled:bg-blue-400 disabled:cursor-not-allowed  hover:bg-blue-500 ",
          typographyVariants({ variant: "secondary" })
        ),
        outline: cn("btn-primary", typographyVariants({ variant: "primary" })),
        ghost: cn(
          "border-[#39f] border hover:border-slate-100 ",
          typographyVariants({ variant: "ghost" })
        ),
        normal: "hover:bg-slate-200 bg-slate-100 ",
        white: "bg-white text-life-2",
        categoryBtn: cn(
          "bg-[#f4f7ff]  hover:bg-slate-200 border border-slate-300",
          typographyVariants({ variant: "lifeText" })
        ),
        productsListBtn:
          "bg-white w-full hover:bg-slate-200 text-black justify-start text-left",
        closeBtn: "border border-muted bg-white hover:bg-slate-200 ltr:ml-auto rtl:mr-auto rounded-full h-[37px] w-[37px]",
        primaryLink:
          "text-primary disabled:bg-blue-400 disabled:cursor-not-allowed  hover:text-blue-500 !p-0",
        sideBarMenuButton:
          "rounded-lg p-2 text-slate-700 hover:bg-blue-300  peer-checked:text-white hover:text-white peer-checked:bg-blue-400 md:w-full w-fit !justify-start cursor-pointer",
        footerLink: "hover:text-blue-500 text-gray-500 underline-tra !p-0",
        primaryRadioCheck:
          "peer-checked:bg-blue-500 peer-checked:text-white border border-slate-200 cursor-pointer",
        clearBtn:
          "bg-slate-200  text-slate-700 hover:bg-slate-300 ",
      },
      size: {
        default: cn(typographyVariants({ size: "default" }), "py-1.5 px-4"),
        sm: cn(typographyVariants({ size: "sm" }), "px-2 py-1"),
        lg: cn(typographyVariants({ size: "lg" }), "py-2 px-5"),
        xs: cn(typographyVariants({ size: "xs" }), "px-1 py-[2px]"),
      },
      position:{
        inputLeftBtn: "flex items-center  ltr:rounded-r-none rtl:rounded-l-none",
        inputRightBtn: "flex items-center  ltr:rounded-l-none rtl:rounded-r-none",
      },
      rounded: {
        full: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
        sm: "rounded-sm",
        xl: "rounded-xl",
        xxl: "rounded-2xl",
        txl: "rounded-3xl",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  disableBtn?: boolean;
  iconLeft?: React.ReactNode;
  iconType?: IconProps["type"];
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      children,
      isLoading,
      disableBtn,
      iconLeft,
      iconType,
      iconRight,
      position,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className, position }))}
        ref={ref}
        {...props}
        disabled={isLoading || disableBtn}
      >
        {iconLeft && iconLeft}
        {children}
        {iconRight && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
