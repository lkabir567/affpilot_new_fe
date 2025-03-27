import { FC, ReactNode, useState } from "react";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/lib/utils";
import {
  Award,
  BadgeDollarSign,
  ChevronDown,
  Clock,
  FileText,
  Globe,
  Headset,
  Home,
  ScanSearch,
  ShoppingBag,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/post-history", label: "All Post History", icon: Clock },
  { href: "/affiliate-program", label: "Affiliate Program", icon: Award },
  { href: "/support", label: "Support Ticket", icon: Headset },
  { href: "/referral", label: "Referral", icon: BadgeDollarSign },
];

const writeInfoLinks = [
  { href: "/bulk-article", label: "Bulk Article Generation" },
  { href: "/short-article", label: "Short Info Article" },
  { href: "/sub-heading", label: "Input Sub Heading" },
];

const amazonReview = [
  { href: "/ai-review-article", label: "AI Review Article" },
  { href: "/manual-review-article", label: "Manual Review Article" },
];

const biographyArticle = [
  { href: "/biography-article", label: "Biography Article Generate" },
  { href: "/biography-article-editor", label: "Biography Article Editor" },
];

const seoTools = [
  { href: "/scrap-keyword", label: "Scrap Keyword" },
  { href: "/grouping-keyword", label: "Grouping Keyword" },
  { href: "/explorer-keyword", label: "Explorer keyword" },
];

const addWebsiteAndApi = [
  { href: "/wordpress-site", label: "Wordpress Site" },
  { href: "/blogger-site", label: "Blogger Site" },
  { href: "/medium-account", label: "Medium Account" },
  { href: "/amazon-api", label: "Amazon API" },
];

// for single nav-links
interface NavLinksProps {
  pathname: string;
  start: number;
  end: number;
}

export const NavLinks: FC<NavLinksProps> = ({ pathname, start, end }) => {
  const navigate = useNavigate();
  return (
    <>
      {navLinks.slice(start, end).map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <p
            key={href}
            onClick={() => navigate(`/${href}`)}
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
          </p>
        );
      })}
    </>
  );
};

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
            "flex w-full items-center justify-between rounded-lg py-2.5 font-medium transition-all",
            openItem === name
              ? "bg-primary text-white border-l-4 border-primary"
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
          <Card className="grid gap-1 p-2 mt-1 bg-gray-100 dark:bg-gray-900">
            {item.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <p
                  key={href}
                  onClick={() => navigate(`/${href}`)}
                  className={cn(
                    "block rounded-lg px-4 py-2 text-sm font-medium transition-all",
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

const Navigation = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const pathname = window.location.pathname;

  return (
    <Card className="flex-1 overflow-auto py-2 my-2 mx-2 rounded-sm text-sm">
      <nav className="grid gap-1 px-2">
        {/* dashboard & post history */}
        <NavLinks pathname={pathname} start={0} end={2} />

        <div className="grid border-t gap-2 py-1 my-2">
          {/* Write-info-article */}
          <NestedLinks
            openItem={openItem}
            setOpenItem={setOpenItem}
            pathname={pathname}
            item={writeInfoLinks}
            name={"Write Info Article"}
            icon={<FileText className="h-5 w-5 text-inherit" />}
          />

          {/* Amazon-review */}
          <NestedLinks
            openItem={openItem}
            setOpenItem={setOpenItem}
            pathname={pathname}
            item={amazonReview}
            name={"Amazon Review"}
            icon={<ShoppingBag className="h-5 w-5 text-inherit" />}
          />

          {/* Biography-article */}
          <NestedLinks
            openItem={openItem}
            setOpenItem={setOpenItem}
            pathname={pathname}
            item={biographyArticle}
            name={"Biography Article"}
            icon={<User className="h-5 w-5 text-inherit" />}
          />
        </div>

        <div className="grid border-t gap-2 pt-1 my-2">
          {/* Affiliate-program */}
          <NavLinks pathname={pathname} start={2} end={3} />

          {/* Seo-tools */}
          <NestedLinks
            openItem={openItem}
            setOpenItem={setOpenItem}
            pathname={pathname}
            item={seoTools}
            name={"Seo Tools"}
            icon={<ScanSearch className="h-5 w-5 text-inherit" />}
          />
        </div>

        <div className="grid border-t gap-2 pt-1 my-2">
          {/* Add-website-and-api */}
          <NestedLinks
            openItem={openItem}
            setOpenItem={setOpenItem}
            pathname={pathname}
            item={addWebsiteAndApi}
            name={"Add Website & API"}
            icon={<Globe className="h-5 w-5 text-inherit" />}
          />

          {/* Support-ticket */}
          <NavLinks pathname={pathname} start={3} end={4} />

          {/* Referral-program */}
          <NavLinks pathname={pathname} start={4} end={5} />
        </div>
      </nav>
    </Card>
  );
};

export default Navigation;
