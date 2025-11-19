import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "button-primary shadow-[0_8px_30px_rgba(107,140,255,.35)] text-white",
        ghost:
          "bg-transparent ring-1 ring-white/15 text-foreground hover:bg-white/10",
      },
      size: {
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type AnchorButtonProps = VariantProps<typeof button> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type NativeButtonProps = VariantProps<typeof button> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default function Button(props: ButtonProps) {
  if (props.as === "a") {
    const { as: _as, className, variant, size, children, href, ...anchorProps } = props;
    void _as;
    const classNames = clsx(button({ variant, size }), className);
    return (
      <a href={href} className={classNames} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, className, variant, size, children, ...buttonProps } = props;
  void _as;
  const classNames = clsx(button({ variant, size }), className);
  return (
    <button className={classNames} {...buttonProps}>
      {children}
    </button>
  );
}
