import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Globe } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

const languages = [
  { label: "English", value: "English" },
  { label: "Spanish", value: "Spanish" },
  { label: "French", value: "French" },
  { label: "German", value: "German" },
  { label: "Chinese", value: "Chinese" },
  { label: "Japanese", value: "Japanese" },
  { label: "Korean", value: "Korean" },
  { label: "Russian", value: "Russian" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Italian", value: "Italian" },
];

type Language = {
  label: string;
  value: string;
};

interface SelectLanguageProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  language?: Language[];
}

export const SelectLanguage = <T extends FieldValues>({
  control,
  language = languages,
  name,
}: SelectLanguageProps<T>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <SelectInput
              icon={<Globe className="h-4 w-4 text-blue-500" />}
              label="Select Language"
              field={field}
              selectItems={language}
              placeholder="Choose a language"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
