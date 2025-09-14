import { cn } from "@/lib/utils";

export function ErrorMessage(props: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-red-500 text-sm", props.className)} {...props} />
  );
}
