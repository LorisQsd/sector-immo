import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & {
  asChild?: boolean;
} & VariantProps<typeof containerVairants>;

const containerVairants = cva("container mx-auto px-4", {
  variants: {
    size: {
      default: "px-4",
      sub: "px-12",
    },
  },
});

export function Container({
  children,
  asChild,
  className,
  size = "default",
  ...props
}: Props) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn(containerVairants({ size }), "p-4", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
