import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#EAEAEB]", className)}
      {...props}
    />
  );
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelContent?: React.ReactNode;
}

function Radio({ className, labelContent, ...props }: RadioProps) {
  return (
    <>
      <label className="relative flex cursor-pointer items-center rounded-full px-2 py-1">
        <input
          type="radio"
          {...props}
          className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-blue-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
        />
        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-blue-500 opacity-0 transition-opacity peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
          </svg>
        </div>
      </label>
      {labelContent && (
        <label
          htmlFor={props.id}
          className="mt-px cursor-pointer select-none font-light text-gray-700"
        >
          {labelContent}
        </label>
      )}
    </>
  );
}

export { Skeleton, Radio };
