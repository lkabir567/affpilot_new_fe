import { useState, useEffect } from "react";
import {
  BarChart2,
  Clock,
  FileText,
  Home,
  ChevronDown,
  User,
  ShoppingBag,
  Award,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ColorPicker from "../settings/ColorPicker";
import { Card } from "../ui/card";
import SideBarCredits from "../creditsCard/SideBarCredits";

interface SidebarProps {
  isMobile?: boolean;
}

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/history", label: "All Post History", icon: Clock },
  { href: "/affiliate-content", label: "Affiliate Content", icon: Award },
  { href: "/amazon-review", label: "Amazon Review", icon: ShoppingBag },
  { href: "/biography", label: "Biography Article", icon: User },
];

const writeInfoLinks = [
  { href: "/bulk-article", label: "Bulk Article Generation" },
  { href: "/short-article", label: "Short Info Article" },
  { href: "/sub-heading", label: "Input Sub Heading" },
];

export function Sidebar({ isMobile = false }: SidebarProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [openSetting, setOpenSetting] = useState(false);
  const pathname = window.location.pathname;

  return (
    <aside
      className={cn(
        "flex flex-col h-full bg-gray-secondary text-primary border-r",
        isMobile ? "w-full" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <span className="text-xl font-bold text-black">AffPilot</span>
        </a>
      </div>

      <SideBarCredits />

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <a
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-2.5 font-medium transition-all",
                  isActive
                    ? "bg-primary text-white border-l-4 border-primary"
                    : "text-black hover:bg-black/10"
                )}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                  <Icon className="h-5 w-5 text-inherit" />
                </div>
                <span>{label}</span>
              </a>
            );
          })}

          {/* Write Info Article Collapsible */}
          <Collapsible
            open={openItem === "write-info"}
            onOpenChange={() =>
              setOpenItem(openItem === "write-info" ? null : "write-info")
            }
          >
            <CollapsibleTrigger
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-4 py-2.5 font-medium transition-all",
                openItem === "write-info"
                  ? "bg-primary text-white border-l-4 border-primary"
                  : "text-gray-400 hover:bg-black/10 hover:text-black"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-inherit" />
                </div>
                <span>Write Info Article</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  openItem === "write-info" && "rotate-180"
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="animate-accordion-down">
              <Card className="grid gap-1 p-2 mt-1">
                {writeInfoLinks.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <a
                      key={href}
                      href={href}
                      className={cn(
                        "block rounded-lg px-4 py-2 text-sm transition-all",
                        isActive
                          ? "text-white bg-primary"
                          : "text-gray-400 hover:bg-black/10 hover:text-black"
                      )}
                    >
                      {label}
                    </a>
                  );
                })}
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto p-4 border-t">
        {!openSetting && (
          <Card className="flex items-center gap-3 p-3 text-black transition cursor-pointer">
            <div>
              <div className="h-8 w-8 rounded-lg bg-gray-200 flex items-center justify-center mb-2">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-sm font-medium">Earn Credits</div>
              <div className="text-xs">Complete tasks & get rewards</div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 gap-2 mt-3 relative">
          {openSetting && (
            <Card className="absolute -bottom-2 w-full py-6 px-2 border">
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
            className="h-10 w-full rounded-lg"
            onClick={() => setOpenSetting(true)}
          >
            <Settings className="h-5 w-5 mr-2" />
            <span>Settings</span>
          </Button>
          <Button variant="outline" className="h-10 w-full rounded-lg">
            <HelpCircle className="h-5 w-5 mr-2" />
            <span>Help</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
