import BulkArticleGeneration from "@/pages/private/dashboard/content-generation/bulk-article-generation/BulkArticleGeneration";
import InputSubHeading from "@/pages/private/dashboard/content-generation/input-sub-heading/InputSubHeading";
import ShortInfoArticle from "@/pages/private/dashboard/content-generation/short-info-article/ShortInfoArticle";

export const contentGenerationRoute = [
  {
    path: "/bulk-article-generate",
    element: <BulkArticleGeneration />,
  },
  {
    path: "/short-info-article",
    element: <ShortInfoArticle />,
  },
  {
    path: "/input-sub-heading",
    element: <InputSubHeading />,
  },
];
