import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ReactNode } from "react";

interface titleProps {
  heading?: string;
  description?: string;
  tutorial?: string;
  children?: ReactNode;
}

const PageTitle: React.FC<titleProps> = ({
  heading,
  description,
  tutorial,
  children,
}) => {
  return (
    <Card>
      <CardContent className="flex sm:flex-row flex-col sm:items-center items-start justify-between">
        <div className="space-y-4 group">
          <h1 className="text-4xl font-bold bg-gradient-to-t from-primary to-secondary bg-clip-text text-transparent py-1">
            {heading ? heading : "Features Page"}
          </h1>
          <p className="text-gray-900 font-medium text-sm hidden sm:block">
            {description !== "" ? description : ""}
          </p>
        </div>
        {tutorial !== "" && (
          <div className="mt-0 sm:mt-auto">
            <Button>
              <Youtube className="text-red-400 size-7" />
              Watch Tutorial
            </Button>
          </div>
        )}

        <div className="mt-0">
          <Button
            variant={"outline"}
            className="cursor-pointer text-primary hover:bg-primary hover:text-white"
          >
            <Youtube className="text-red-400 size-7" />
            Watch Tutorial
          </Button>
        </div>
      </CardContent>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PageTitle;
