import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon } from "lucide-react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";

type ImageSource = "google" | "none";

interface ImageSourceSelectorProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  imageSourceOptions?: Array<ImageSourceOption>;
}

interface ImageSourceOption {
  value: ImageSource;
  label: string;
}

const defaultImageSourceOptions: ImageSourceOption[] = [
  {
    value: "google",
    label: "Use Google Images",
  },
  {
    value: "none",
    label: "Don't use images",
  },
];

export const SelectImageSource = <T extends FieldValues>({
  control,
  setValue,
  name,
  imageSourceOptions = defaultImageSourceOptions,
}: ImageSourceSelectorProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="font-medium text-gray-700 flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-blue-500" />
            Select Image Source
          </FormLabel>
          <FormControl>
            <Tabs
              value={field.value}
              onValueChange={(value) =>
                setValue(name, value as PathValue<T, Path<T>>)
              }
              className="w-full"
            >
              <TabsList className="w-fit flex gap-4">
                {imageSourceOptions.map((option) => (
                  <TabsTrigger
                    key={option.value}
                    value={option.value}
                    className="flex-1 flex gap-2 items-center justify-center"
                  >
                    <ImageIcon className="h-4 w-4" />
                    {option.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
