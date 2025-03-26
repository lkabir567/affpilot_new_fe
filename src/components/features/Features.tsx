import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube } from "lucide-react";
import { ReactNode } from "react";

interface FeaturesProps {
  heading?: string;
  description?: string;
  children?: ReactNode;
}

const Features: React.FC<FeaturesProps> = ({
  heading,
  description,
  children,
}) => {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-4 group">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:bg-gradient-to-t py-1">
              {heading ? heading : "Features Page"}
            </h1>
            <p className="text-gray-900 font-medium text-sm">
              {description
                ? description
                : "Generate high-quality, SEO-optimized articles at scale using advanced AI capabilities. Streamline your content creation process with intelligent batch processing."}
            </p>
          </div>

          <div className="mt-auto">
            <Button className="cursor-pointer">
              <Youtube className="text-red-400 size-7" />
              Watch Tutorial
            </Button>
          </div>
        </div>

        <div>{children}</div>
      </CardContent>
    </Card>
  );
};

export default Features;
