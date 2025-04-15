import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { MessageSquareText } from "lucide-react";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ContentGenCommonFormValues } from "../schema/schema.common";

const tones = [
  { label: "Professional", value: "professional" },
  { label: "Conversational", value: "conversational" },
  { label: "Friendly", value: "friendly" },
  { label: "Authoritative", value: "authoritative" },
  { label: "Humorous", value: "humorous" },
  { label: "Technical", value: "technical" },
  { label: "Persuasive", value: "persuasive" },
];

type Tones = {
  label: string;
  value: string;
};

interface SelectToneProps {
  control: Control<ContentGenCommonFormValues>;
  tone?: Tones[];
}

export const SelectTone: FC<SelectToneProps> = ({ control, tone = tones }) => {
  return (
    <>
      <FormField
        control={control}
        name="tone"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <SelectInput
              icon={<MessageSquareText className="h-4 w-4 text-purple-500" />}
              label="Content Tone"
              field={field}
              selectItems={tone}
              placeholder="Choose content tone"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
