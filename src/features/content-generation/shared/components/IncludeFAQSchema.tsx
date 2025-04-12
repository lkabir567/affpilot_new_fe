import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ContentGenCommonFormValues } from "../schema/schema.common";

interface IncludeFAQSchemaProps {
  control: Control<ContentGenCommonFormValues>;
}

export const IncludeFAQSchema: FC<IncludeFAQSchemaProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="includeFaqSchema"
        render={({ field }) => (
          <SwitchInput
            checked={field.value}
            onCheckedChange={field.onChange}
            badgeText="AI"
            label="Include FAQ Schema"
            tooltip="Add structured data markup for FAQs to help search engines understand your content and potentially show rich results."
            description="Improve SEO with structured FAQ data"
          />
        )}
      />
    </>
  );
};
