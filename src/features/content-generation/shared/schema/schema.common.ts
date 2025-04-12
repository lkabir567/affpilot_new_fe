import { z } from "zod";

export const gptVersion = z.enum(["gpt-4o", "gpt-4", "gpt-4o-mini"]);
export const realTimeData = z.boolean().default(false);
export const keywords = z.string().min(1, "Keywords are required");
export const aiGeneratedTitle = z.boolean().default(true);
export const publishingDestination = z.enum([
  "wordpress",
  "blogger",
  "medium",
  "editor",
]);

export const language = z.string().min(1, "Language is required");
export const articleType = z.string().min(1, "Article type is required");
export const subHeadings = z
  .string()
  .min(1, "Number of sub-headings is required");

export const faqs = z.string().min(1, "Number of FAQs is required");
export const includeFaqSchema = z.boolean().default(true);
export const imageSource = z.enum(["google", "none"]);

export const imageCredit = z.boolean().default(true);
export const includeYoutubeVideo = z.boolean().default(false);
export const tone = z.string().default("professional");
export const wordCount = z.string().default("1000");

export const contentGenerationCommonSchema = z.object({
  gptVersion,
  realTimeData,
  keywords,
  aiGeneratedTitle,
  publishingDestination,
  language,
  articleType,
  subHeadings,
  faqs,
  includeFaqSchema,
  imageSource,
  imageCredit,
  includeYoutubeVideo,
  tone,
  wordCount,
});

export type ContentGenCommonFormValues = z.infer<
  typeof contentGenerationCommonSchema
>;
