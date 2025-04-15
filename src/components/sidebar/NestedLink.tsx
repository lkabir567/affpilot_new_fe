import { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Card } from "../ui/card";

// nested nav-link
interface NavItem {
  href: string;
  label: string;
}
interface NestedLinksProps {
  openItem: string | null;
  setOpenItem: (item: string | null) => void;
  pathname: string;
  item: NavItem[];
  name: string;
  icon: ReactNode;
}

export const NestedLinks: FC<NestedLinksProps> = ({
  openItem,
  setOpenItem,
  pathname,
  item,
  name,
  icon,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Collapsible
        open={openItem === name}
        onOpenChange={() => setOpenItem(openItem === name ? null : name)}
      >
        <CollapsibleTrigger
          className={cn(
            "flex w-full items-center justify-between rounded-lg py-2.5 font-medium transition-all cursor-pointer",
            openItem === name
              ? "bg-gray-200"
              : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
          )}
        >
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center">
              {icon}
            </div>
            <span>{name}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform mr-2",
              openItem === name && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-accordion-down">
          <Card className="grid gap-2 p-2 mt-1 bg-gray-100 dark:bg-gray-900">
            {item.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <p
                  key={href}
                  onClick={() => navigate(`${href}`)}
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                    isActive
                      ? "text-white bg-primary"
                      : "text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
                  )}
                >
                  {label}
                </p>
              );
            })}
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};
