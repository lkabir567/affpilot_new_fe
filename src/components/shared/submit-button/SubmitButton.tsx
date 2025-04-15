import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, PenLine } from "lucide-react";
import { FC } from "react";

interface SubmitButtonProps {
  label?: string;
  loadingLabel?: string;
  isSubmitting?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  label,
  loadingLabel = "Loading...",
  isSubmitting,
}) => {
  return (
    <Button
      type="submit"
      className="w-full lg:w-1/2 rounded-xl py-6 text-lg font-medium mx-auto"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        <>
          <PenLine className="mr-2 h-5 w-5" />
          {label}
          <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
