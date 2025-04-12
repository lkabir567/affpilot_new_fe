import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Globe } from "lucide-react";
import { Control } from "react-hook-form";
import { FC } from "react";
import { ContentGenCommonFormValues } from "../schema/schema.common";

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

interface SelectLanguageProps {
  control: Control<ContentGenCommonFormValues>;
  language?: Language[];
}

export const SelectLanguage: FC<SelectLanguageProps> = ({
  control,
  language = languages,
}) => {
  return (
    <>
      <FormField
        control={control}
        name="language"
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
