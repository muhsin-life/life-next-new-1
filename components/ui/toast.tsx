import { cn } from "@/lib/utils";
import * as React from "react";
import hotToast, { Toaster as HotToaster } from "react-hot-toast";
import { Icon } from "./icons";
import { buttonVariants } from "./button";
import Link from "next/link";
import { Typography } from "./typography";

export const Toaster = HotToaster;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
}

export function Toast({ visible, className, ...props }: ToastProps) {
  return (
    <div
      className={cn(
        "min-h-16 mb-2 flex w-[350px] flex-col items-start gap-2 rounded-md bg-white px-6 py-4 shadow-lg relative",
        visible && "animate-in slide-in-from-bottom-5",
        className
      )}
      {...props}
    />
  );
}

Toast.Icon = function ToastIcon({ name, className, ...props }: any) {
  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
      <Icon
        type="checkIcon"
        className={cn("h-10 w-10", className)}
        {...props}
      />
    </div>
  );
};

interface ToastTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

Toast.Title = function ToastTitle({ className, ...props }: ToastTitleProps) {
  return <Typography bold={"bold"} {...props} />;
};

interface ToastDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

Toast.Description = function ToastDescription({
  className,
  ...props
}: ToastDescriptionProps) {
  return <Typography variant={"paragraph"} size={"sm"} {...props} />;
};

interface ToastOpts {
  title?: string;
  message: string;
  type?: "success" | "error" | "default";
  duration?: number;
}

export function toast(opts: ToastOpts) {
  const { title, message, type = "default", duration = 3000 } = opts;

  return hotToast.custom(
    ({ visible }) => (
      <Toast
        visible={visible}
        className={cn({
          "bg-red-200 text-white": type === "error",
          "bg-white text-black": type === "success",
        })}
      >
        <div className="flex space-x-2 items-center">
          {type === "success" && (
            <Icon
              type="checkIcon"
              sizes={"lg"}
              className="text-white fill-green-500"
            />
          )}
          <div>
          <Toast.Title>{title}</Toast.Title>
          {message && <Toast.Description>{message}</Toast.Description>}

          </div>
        </div>

        {type === "success" && (
          <Link
            href="/checkout"
            className={cn(
              buttonVariants({ size: "sm", rounded: "sm" }),
              "text-white h-fit w-full bg-green-500 hover:bg-green-600"
            )}
          >
            CHECKOUT
          </Link>
        )}
      </Toast>
    ),
    { duration }
  );
}
