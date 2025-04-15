import { z } from "zod";

const contentGenerationCommonSchema = z.object({
  gptVersion: z.enum(["gpt-4o", "gpt-4", "gpt-4o-mini"]),
  realTimeData: z.boolean().default(false),
  keywords: z.string().min(1, "Keywords are required"),
  aiGeneratedTitle: z.boolean().default(true),
  publishingDestination: z.enum(["wordpress", "blogger", "medium", "editor"]),
  language: z.string().min(1, "Language is required"),
  articleType: z.string().min(1, "Article type is required"),
  subHeadings: z.string().min(1, "Number of sub-headings is required"),
  faqs: z.string().min(1, "Number of FAQs is required"),
  includeFaqSchema: z.boolean().default(true),
  imageSource: z.enum(["google", "none"]),
  imageCredit: z.boolean().default(true),
  includeYoutubeVideo: z.boolean().default(false),
  tone: z.string().default("professional"),
  wordCount: z.string().default("1000"),
});

// bulkInfoFormSchema schema
export const bulkInfoFormSchema = contentGenerationCommonSchema.pick({
  gptVersion: true,
  realTimeData: true,
  keywords: true,
  aiGeneratedTitle: true,
  publishingDestination: true,
  language: true,
  articleType: true,
  subHeadings: true,
  faqs: true,
  includeFaqSchema: true,
  imageSource: true,
  imageCredit: true,
  includeYoutubeVideo: true,
});

export type BulkInfoFormValues = z.infer<typeof bulkInfoFormSchema>;
