import PageTitle from "@/components/page-title/PageTitle";
import { ShortInfoArticleForm } from "@/features/content-generation/write-info-article";

const ShortInfoArticle = () => {
  return (
    <div>
      <PageTitle
        heading="Short Info Article"
        description="Generate high-quality, SEO-optimized articles. Streamline your content creation process with intelligent batch processing."
        tutorial=""
      >
        <ShortInfoArticleForm />
      </PageTitle>
    </div>
  );
};

export default ShortInfoArticle;
