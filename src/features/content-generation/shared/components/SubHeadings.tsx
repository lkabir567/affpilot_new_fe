import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Heading2 } from "lucide-react";
import { FC } from "react";
import { Control } from "react-hook-form";
import { ContentGenCommonFormValues } from "../schema/schema.common";

const subHeadingOptions = [
  {
    label: "AI will determine (Recommended)",
    value: "AI will creatively think",
  },
  { label: "3 sub-headings", value: "3" },
  { label: "5 sub-headings", value: "5" },
  { label: "7 sub-headings", value: "7" },
  { label: "10 sub-headings", value: "10" },
  { label: "15 sub-headings", value: "15" },
];

type SubHeadings = {
  label: string;
  value: string;
};

interface SubHeadingsProps {
  control: Control<ContentGenCommonFormValues>;
  subHeadings?: SubHeadings[];
}

export const SubHeadings: FC<SubHeadingsProps> = ({
  control,
  subHeadings = subHeadingOptions,
}) => {
  return (
    <>
      <FormField
        control={control}
        name="subHeadings"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <SelectInput
              icon={<Heading2 className="h-4 w-4 text-blue-500" />}
              label="Number of Sub-Headings"
              field={field}
              selectItems={subHeadings}
              placeholder="Choose sub-headings"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
