import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FileText, Globe, MessageSquareText } from "lucide-react";
import { useBulkInfoForm } from "../hooks/useBulkInfoForm";
import SubmitButton from "@/components/shared/submit-button/SubmitButton";
import FormBadges from "@/components/shared/form-badges/FormBadges";
import {
  AiTitle,
  GptVersion,
  ImageCredit,
  IncludeFAQSchema,
  IncludeVideo,
  Keywords,
  NumberOfFAQs,
  PublishDestination,
  RealTimeData,
  SelectArticleType,
  SelectImageSource,
  SelectLanguage,
  SubHeadings,
} from "../../shared";

export const BulkArticleGenerationForm = () => {
  const { bulkForm: form, onSubmit, isSubmitting } = useBulkInfoForm();
  return (
    <div className="mx-auto">
      <Card className="border-0 sm:border-1 md:shadow-none shadow-none sm:shadow-lg">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-8 px-0 sm:px-8">
              {/* Content Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6 rounded-md p-2 bg-primary-foreground">
                  <div className="bg-primary p-2 rounded-full">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">
                    Content Details
                  </h2>
                </div>
                <div className="grid gap-4 md:px-2">
                  <div className="border rounded-md p-4">
                    {/* AI Model GPT Version */}
                    <GptVersion control={form.control} name="gptVersion" />

                    {/* Real-time data */}
                    {form.watch("gptVersion") === "gpt-4o-mini" && (
                      <RealTimeData
                        control={form.control}
                        name="realTimeData"
                      />
                    )}
                  </div>

                  {/* Keywords */}
                  <Keywords control={form.control} name="keywords" />

                  {/* AI Generated Title */}
                  <AiTitle control={form.control} name="aiGeneratedTitle" />
                </div>
              </div>
              <Separator className="my-8" />

              {/* Style & Format Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6 bg-primary-foreground rounded-md p-2">
                  <div className="bg-primary p-2 rounded-full">
                    <MessageSquareText className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">
                    Style & Format
                  </h2>
                </div>

                <div className="space-y-4 border rounded-md py-4 px-2">
                  {/* language and content and tone and word count */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-2">
                    {/* Language */}
                    <SelectLanguage control={form.control} name="language" />

                    {/* Type of Article */}
                    <SelectArticleType
                      control={form.control}
                      name="articleType"
                    />
                  </div>

                  {/*  sub-heading & FAQs*/}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                    {/* Number of Sub-Headings */}
                    <SubHeadings control={form.control} name="subHeadings" />

                    {/* Number of FAQs */}
                    <NumberOfFAQs control={form.control} name="faqs" />
                  </div>

                  {/* Include FAQ Schema */}
                  <IncludeFAQSchema
                    control={form.control}
                    name="includeFaqSchema"
                  />
                </div>
              </div>
              <Separator className="my-8" />

              {/* Publishing Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-6 bg-primary-foreground rounded-md p-2">
                  <div className="bg-primary p-2 rounded-full">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-primary">
                    Publishing & Media
                  </h2>
                </div>

                {/* Publishing Destination */}
                <PublishDestination
                  control={form.control}
                  setValue={form.setValue}
                  name="publishingDestination"
                />

                {/* Select Image */}
                <Separator />
                <div className="grid grid-cols-1 gap-6 mt-6 md:px-2">
                  {/* Select Image Source */}
                  <SelectImageSource
                    control={form.control}
                    setValue={form.setValue}
                    name="imageSource"
                  />

                  {/* Image Credit */}
                  {form.watch("imageSource") === "google" && (
                    <ImageCredit control={form.control} name="imageCredit" />
                  )}

                  {/* Include YouTube Video */}
                  <IncludeVideo
                    control={form.control}
                    name="includeYoutubeVideo"
                  />
                </div>
              </div>
              <Separator />

              {/* Submit Button */}
              <div className="pt-0 grid gap-4">
                <SubmitButton
                  label="Generate High-Quality Content"
                  loadingLabel="Generating Your Content..."
                  isSubmitting={isSubmitting}
                />

                {/* form-badges */}
                <div>
                  <FormBadges
                    badgeNumber={4}
                    labels={[
                      "SEO Optimized",
                      "Plagiarism Free",
                      "AI-Powered",
                      "Human-Like Quality",
                    ]}
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
