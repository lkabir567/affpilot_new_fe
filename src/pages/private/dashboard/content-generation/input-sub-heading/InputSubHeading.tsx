import PageTitle from "@/components/page-title/PageTitle";
import { InputSubHeadingForm } from "@/features/content-generation/write-info-article";

const InputSubHeading = () => {
  return (
    <div>
      <PageTitle
        heading="Input Sub Heading (H2)"
        description="Write article with your own subheadings (h2). Affpilot will write contents and publish to your website automatically."
        tutorial=""
      >
        <InputSubHeadingForm />
      </PageTitle>
    </div>
  );
};

export default InputSubHeading;
