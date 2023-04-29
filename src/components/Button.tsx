import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva("px-5 py-3 text-lg font-semibold", {
  variants: {
    intent: {
      fillPrimary: "bg-indigo-600 hover:bg-indigo-700 text-neutral-100",
      outline:
        "border border-neutral-700 hover:bg-neutral-100 dark:border-neutral-300 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
    },
    size: {
      sm: "text-sm px-3 py-2",
      md: "text-base px-5 py-3",
      mdLong: "text-base px-12 py-3",
      lg: "text-lg px-5 py-3",
    },
  },
  defaultVariants: {
    intent: "fillPrimary",
    size: "md",
  },
});
export type ButtonVariants = VariantProps<typeof buttonVariants>;
const button = (variants?: ButtonVariants) => twMerge(buttonVariants(variants));

interface Props extends ComponentPropsWithoutRef<"button"> {
  variants?: ButtonVariants;
  children: ReactNode;
}

const Button = ({ variants, children, ...props }: Props) => (
  <button className={button(variants)} {...props}>
    {children}
  </button>
);

export default Button;
