import SelectInput from "@/components/shared/inputs/SelectInput";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FileText } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

const articleTypes = [
  { label: "Long-form Article", value: "Long Post Form" },
  { label: "Short-form Article", value: "Short Post" },
  { label: "List Article", value: "List Article" },
  { label: "How-to Guide", value: "How-to Guide" },
  { label: "News Article", value: "News Article" },
  { label: "Product Review", value: "Product Review" },
  { label: "Comparison Post", value: "Comparison Post" },
  { label: "Case Study", value: "Case Study" },
];

type Article = {
  label: string;
  value: string;
};

interface SelectArticleTypeProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  articles?: Article[];
}

export const SelectArticleType = <T extends FieldValues>({
  control,
  articles = articleTypes,
  name,
}: SelectArticleTypeProps<T>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <SelectInput
              icon={<FileText className="h-4 w-4 text-blue-500" />}
              label="Type of Article"
              field={field}
              selectItems={articles}
              placeholder="Choose article type"
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
