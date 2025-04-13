import SwitchInput from "@/components/shared/inputs/SwitchInput";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

interface AiTitleProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>; // Ensures valid key from the form schema
}

export const AiTitle = <T extends FieldValues>({
  control,
  name,
}: AiTitleProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <SwitchInput
      checked={field.value}
      onCheckedChange={field.onChange}
      badgeText="AI"
      label="Enable AI Title"
      tooltip="Let AI write your title for better SEO reach"
      description="Automatically generate titles using smart AI"
    />
  );
};
