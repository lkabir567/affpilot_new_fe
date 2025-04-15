import PageTitle from "@/components/page-title/PageTitle";
import { BulkArticleGenerationForm } from "@/features/content-generation/write-info-article";

const BulkArticleGeneration = () => {
  return (
    <div>
      <PageTitle
        heading="Bulk Article Generation"
        description="Generate high-quality, SEO-optimized articles at scale using advanced AI capabilities. Streamline your content creation process with intelligent batch processing."
        tutorial=""
      >
        <BulkArticleGenerationForm />
      </PageTitle>
    </div>
  );
};

export default BulkArticleGeneration;
