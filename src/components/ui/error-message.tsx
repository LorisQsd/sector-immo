import { cn } from "@/lib/utils";

export function ErrorMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-red-500 text-sm", className)} {...props} />;
}
