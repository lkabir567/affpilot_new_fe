import { Button } from "@/components/ui/button";
import { primaryLogo } from "@/lib/images/importImage";
import { cn } from "@/lib/utils";
import { BarChart2, HelpCircle, Settings, X } from "lucide-react";
import { useState } from "react";
import SideBarCredits from "../credits-card/SideBarCredits";
import ColorPicker from "../settings/ColorPicker";
import { Card } from "../ui/card";
import Navigation from "./Navigation";

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const [openSetting, setOpenSetting] = useState(false);
  return (
    <aside
    
      className={cn(
        "flex flex-col h-full bg-gray-secondary text-primary border-r",
        isMobile ? "w-full" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="border-b flex items-center justify-between h-16">
        <a href="/" className="mx-auto">
          <img src={primaryLogo} className="w-30 h-fit" />
        </a>
      </div>

      <SideBarCredits />

      {/* Navigation */}
      <Navigation />

      {/* Bottom Section */}
      <div className="mt-auto px-4 pt-1 border-t">
        {!openSetting && (
          <Card className="flex items-center gap-2 p-2 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 transition cursor-pointer">
            <div>
              <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-2">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm font-medium">Earn Credits</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Complete tasks & get rewards
              </div>
            </div>
          </Card>
        )}

        {/* Color change */}
        <div className="grid grid-cols-2 gap-2 mt-3 relative mb-1">
          {openSetting && (
            <Card className="absolute -bottom-1 w-full py-8 px-2 border">
              <Button
                className="w-fit ml-auto absolute -top-4 -right-2"
                variant="outline"
                onClick={() => setOpenSetting(false)}
              >
                <X />
              </Button>
              <ColorPicker />
            </Card>
          )}

          <Button
            variant="outline"
            className="h-10 w-full rounded-lg hover:text-white hover:bg-primary cursor-pointer"
            onClick={() => setOpenSetting(true)}
          >
            <Settings className="h-5 w-5 mr-1" />
            <span>Settings</span>
          </Button>
          <Button
            variant="outline"
            className="h-10 w-full rounded-lg hover:text-white hover:bg-primary cursor-pointer"
          >
            <HelpCircle className="h-5 w-5 mr-1" />
            <span>Help</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
