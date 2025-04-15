import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface ImageCreditProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const ImageCredit = <T extends FieldValues>({
  control,
  name,
}: ImageCreditProps<T>) => {
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
            label="Image Credit"
            tooltip="Automatically add attribution for images used in your content to comply with copyright requirements."
            description="Add proper attribution to images"
          />
        )}
      />
    </>
  );
};
