import { useState } from "react";
import { Card } from "../ui/card";
import { FileText, Globe, ScanSearch, ShoppingBag, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { NavLinks } from "./NavLinks";
import { NestedLinks } from "./NestedLink";

const writeInfoLinks = [
  { href: "/bulk-article-generate", label: "Bulk Article Generation" },
  { href: "/short-info-article", label: "Short Info Article" },
  { href: "/input-sub-heading", label: "Input Sub Heading" },
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

const Navigation = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { pathname } = useLocation();

  return (
    <Card className="flex-1 overflow-auto py-2 my-2 mx-2 rounded-sm text-sm">
      <nav className="grid gap-1 px-2">
        {/* dashboard & post history */}
        <NavLinks
          pathname={pathname}
          start={0}
          end={2}
          setOpenItem={setOpenItem}
        />

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
          <NavLinks
            pathname={pathname}
            start={2}
            end={3}
            setOpenItem={setOpenItem}
          />

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
          <NavLinks
            pathname={pathname}
            start={3}
            end={4}
            setOpenItem={setOpenItem}
          />

          {/* Referral-program */}
          <NavLinks
            pathname={pathname}
            start={4}
            end={5}
            setOpenItem={setOpenItem}
          />
        </div>
      </nav>
    </Card>
  );
};

export default Navigation;
