import { PlusCircle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const SideBarCredits = () => {
  return (
    <Card className="bg-primary rounded-xl p-4 flex flex-col gap-0 mx-2 my-1">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-primary-foreground/80 font-medium">
            Available Credits
          </div>
          <div className="text-2xl font-bold text-primary-foreground">
            85761
          </div>
        </div>
        <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
          <RefreshCw className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>
      <div className="mt-1 text-xs text-primary-foreground/60">
        Expires 02 Jun 2025
      </div>
      <Button
        className="mt-3 w-full hover:bg-white cursor-pointer"
        size="sm"
        variant={"outline"}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Credits
      </Button>
    </Card>
  );
};

export default SideBarCredits;
