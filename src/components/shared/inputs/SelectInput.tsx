import { FormControl, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, ReactNode } from "react";

interface SelectInputProps {
  label?: string;
  icon?: ReactNode;
  placeholder?: string;
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  selectItems: {
    label: string;
    value: string;
  }[];
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  icon,
  field,
  placeholder = "Select option",
  selectItems,
}) => {
  return (
    <>
      {label && (
        <FormLabel className="font-medium text-gray-700 flex items-center gap-2">
          {icon}
          {label}
        </FormLabel>
      )}
      <Select value={field.value} onValueChange={field.onChange}>
        <FormControl>
          <SelectTrigger className="py-[20px] text-md font-medium">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="max-h-[300px]">
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectInput;
