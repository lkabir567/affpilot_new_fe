import SwitchInput from "@/components/shared/inputs/SwitchInput";
import { FormField } from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface RealTimeDataProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const RealTimeData = <T extends FieldValues>({
  control,
  name,
}: RealTimeDataProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <SwitchInput
          checked={field.value}
          onCheckedChange={field.onChange}
          badgeText="Real-Time"
          label="Real Time Data"
          tooltip="Let AI generate an optimized title for your content in Real Time."
          description="Real-time data is highly effective for articles necessitating the
              latest information. For optimal quality, consider deactivating it
              when not necessary."
        />
      )}
    />
  );
};
