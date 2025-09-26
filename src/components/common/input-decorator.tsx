import { cn } from "@/lib/utils";
import { ErrorMessage } from "../ui/error-message";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type InputDecoratorProps = {
  name: string;
  label: string;
  containerProps?: React.ComponentProps<"div">;
  errorMessage?: string[];
  slotProps?: {
    label?: React.ComponentProps<typeof Label>;
    input?: React.ComponentProps<typeof Input>;
    errorMessage?: React.ComponentProps<typeof ErrorMessage>;
  };
};

export const InputDecorator = ({
  label,
  containerProps,
  slotProps,
  name,
  errorMessage,
}: Readonly<InputDecoratorProps>) => (
  <div className={cn("mb-2", containerProps?.className)} {...containerProps}>
    <Label htmlFor={name} className="mb-2" {...slotProps?.label}>
      {label}
    </Label>
    <Input id={name} name={name} type="text" required {...slotProps?.input} />
    {errorMessage &&
      errorMessage.length > 0 &&
      errorMessage.map((error) => (
        <ErrorMessage
          className="text-xs"
          {...slotProps?.errorMessage}
          key={error}
        >
          {error}
        </ErrorMessage>
      ))}
  </div>
);
