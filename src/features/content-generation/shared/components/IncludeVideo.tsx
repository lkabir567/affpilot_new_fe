import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Youtube } from "lucide-react";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ContentGenCommonFormValues } from "../schema/schema.common";

interface IncludeVideoProps {
  control: Control<ContentGenCommonFormValues>;
}

export const IncludeVideo: FC<IncludeVideoProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="includeYoutubeVideo"
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
