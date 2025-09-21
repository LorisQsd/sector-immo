import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

type LoadingButtonProps = {
  isLoading: boolean;
} & React.ComponentProps<typeof Button>;

export const LoadingButton = ({
  isLoading,
  children,
  ...props
}: Readonly<LoadingButtonProps>) => (
  <Button disabled={isLoading} {...props}>
    {isLoading ? <LoaderCircle className="animate-spin" /> : children}
  </Button>
);
