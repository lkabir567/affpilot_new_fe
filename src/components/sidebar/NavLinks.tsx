import { cn } from "@/lib/utils";
import { Award, BadgeDollarSign, Clock, Headset, Home } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/post-history", label: "All Post History", icon: Clock },
  { href: "/affiliate-program", label: "Affiliate Program", icon: Award },
  { href: "/support", label: "Support Ticket", icon: Headset },
  { href: "/referral", label: "Referral", icon: BadgeDollarSign },
];

// for single nav-links
interface NavLinksProps {
  pathname: string;
  start: number;
  end: number;
  setOpenItem: (item: string | null) => void;
}

export const NavLinks: FC<NavLinksProps> = ({
  pathname,
  start,
  end,
  setOpenItem,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {navLinks.slice(start, end).map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <p
            key={href}
            onClick={() => {
              navigate(`${href}`);
              setOpenItem(null);
            }}
            className={cn(
              "flex items-center gap-1 rounded-lg px-0 py-2.5 font-medium transition-all cursor-pointer",
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
