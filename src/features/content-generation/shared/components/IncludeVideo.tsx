import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Youtube } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
interface IncludeVideoProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const IncludeVideo = <T extends FieldValues>({
  control,
  name,
}: IncludeVideoProps<T>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <SwitchInput
            checked={field.value}
            onCheckedChange={field.onChange}
            icon={<Youtube className="h-4 w-4 text-red-500" />}
            badgeText="Youtube"
            label="Include YouTube Video"
            tooltip="AI will find and embed relevant YouTube videos in your content to increase engagement."
            description="Enhance content with relevant videos"
          />
        )}
      />
    </>
  );
};
