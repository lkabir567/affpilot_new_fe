import { useState } from "react";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Award,
  ChevronDown,
  Clock,
  FileText,
  Home,
  ShoppingBag,
  User,
} from "lucide-react";

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

const Navigation = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const pathname = window.location.pathname;

  return (
    <Card className="flex-1 overflow-auto py-2 my-2 mx-2 rounded-sm text-sm">
      <nav className="grid gap-1 px-2">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <a
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1 rounded-lg px-0 py-2.5 font-medium transition-all",
                isActive
                  ? "bg-primary text-white border-l-4 border-primary"
                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
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
              "flex w-full items-center justify-between rounded-lg py-2.5 font-medium transition-all",
              openItem === "write-info"
                ? "bg-primary text-white border-l-4 border-primary"
                : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
            )}
          >
            <div className="flex items-center gap-1">
              <div className="h-8 w-8 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-inherit" />
              </div>
              <span>Write Info Article</span>
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform mr-2",
                openItem === "write-info" && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="animate-accordion-down">
            <Card className="grid gap-1 p-2 mt-1 bg-gray-100 dark:bg-gray-900">
              {writeInfoLinks.map(({ href, label }) => {
                const isActive = pathname === href;
                return (
                  <a
                    key={href}
                    href={href}
                    className={cn(
                      "block rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      isActive
                        ? "text-white bg-primary"
                        : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
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
    </Card>
  );
};

export default Navigation;
