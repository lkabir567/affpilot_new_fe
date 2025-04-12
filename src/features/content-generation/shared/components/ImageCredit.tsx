import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ContentGenCommonFormValues } from "../schema/schema.common";

interface ImageCreditProps {
  control: Control<ContentGenCommonFormValues>;
}

export const ImageCredit: FC<ImageCreditProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="imageCredit"
        render={({ field }) => (
          <SwitchInput
            checked={field.value}
            onCheckedChange={field.onChange}
            badgeText="AI"
            label="Image Credit"
            tooltip="Automatically add attribution for images used in your content to comply with copyright requirements."
            description="Add proper attribution to images"
          />
        )}
      />
    </>
  );
};
