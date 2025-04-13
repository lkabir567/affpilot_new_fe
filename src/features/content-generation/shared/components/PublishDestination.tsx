import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Globe, PencilLine } from "lucide-react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";
import {
  bloggerLogo,
  mediumLogo,
  wordpressLogo,
} from "@/lib/images/importImage";

type PublishDestination = {
  value: "wordpress" | "blogger" | "medium" | "editor"; // Restrict to these values
  label: string;
  icon: React.ReactNode;
  description: string;
  color: string;
};

const publishingDestination: PublishDestination[] = [
  {
    value: "wordpress",
    label: "WordPress",
    icon: wordpressLogo,
    description: "Publish to your WordPress site",
    color: "text-[#108cc2]",
  },
  {
    value: "blogger",
    label: "Blogger",
    icon: bloggerLogo,
    description: "Publish to Blogger",
    color: "text-orange-500",
  },
  {
    value: "medium",
    label: "Medium",
    icon: mediumLogo,
    description: "Publish to Medium",
    color: "text-black",
  },
  {
    value: "editor",
    label: "Editor",
    icon: <PencilLine />,
    description: "Open in editor",
    color: "text-primary",
  },
];

interface PublishDestinationProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  destinations?: PublishDestination[];
}

export const PublishDestination = <T extends FieldValues>({
  control,
  setValue,
  name,
  destinations = publishingDestination,
}: PublishDestinationProps<T>) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="space-y-4 md:px-2 px-0">
            <FormLabel className="font-medium text-gray-700 flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-500" />
              Publishing Destination
            </FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {destinations.map((destination) => (
                  <div
                    key={destination.value}
                    className={cn(
                      "flex gap-2 p-2 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md",
                      field.value === destination.value
                        ? "border-primary bg-blue-50 dark:bg-primary/50"
                        : "border-gray-200 hover:border-gray-300 "
                    )}
                    onClick={() =>
                      setValue(name, destination.value as PathValue<T, Path<T>>)
                    }
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold text-white`}
                    >
                      {destination?.value !== "editor" ? (
                        <img
                          src={destination.icon as string}
                          alt={destination.value}
                        />
                      ) : (
                        <p className="text-primary">{destination.icon}</p>
                      )}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span
                        className={`font-medium text-base ${destination.color}`}
                      >
                        {destination.label}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 text-center mt-1 truncate">
                        {destination.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* WordPress Site Alert */}
      {/* {form.watch("publishingDestination") === "wordpress" &&
              !wordpressSite && (
                <Alert className="bg-amber-50 border-amber-100 shadow-sm rounded-xl">
                  <div className="flex flex-col items-center gap-3">
                    <AlertDescription className="text-amber-700 flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      No WordPress site found. Please add a site to
                      continue.
                    </AlertDescription>
                    <Button
                      variant="default"
                      className=" hover:bg-blue-600 border-none shadow-sm transition-all duration-200"
                      onClick={() => setWordpressSite("example.com")}
                    >
                      ADD WORDPRESS SITE
                    </Button>
                  </div>
                </Alert>
        )} */}
    </>
  );
};
