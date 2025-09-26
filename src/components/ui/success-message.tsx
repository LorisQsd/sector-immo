import { cn } from "@/lib/utils";

export function SuccessMessage({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("text-green-500 text-sm", className)} {...props} />;
}
