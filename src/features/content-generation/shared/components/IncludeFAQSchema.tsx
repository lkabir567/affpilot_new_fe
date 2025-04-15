import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface IncludeFAQSchemaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const IncludeFAQSchema = <T extends FieldValues>({
  control,
  name,
}: IncludeFAQSchemaProps<T>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
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
