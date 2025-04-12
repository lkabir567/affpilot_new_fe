import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Control } from "react-hook-form";
import { FC } from "react";
import { ContentGenCommonFormValues } from "../schema/schema.common";

interface AiTitleProps {
  control: Control<ContentGenCommonFormValues>;
}

export const AiTitle: FC<AiTitleProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="aiGeneratedTitle"
        render={({ field }) => (
          <SwitchInput
            checked={field.value}
            onCheckedChange={field.onChange}
            badgeText="AI"
            label="Enable AI Title"
            tooltip="Let AI write your title for better SEO reach"
            description="Automatically generate titles using smart AI"
          />
        )}
      />
    </>
  );
};
