import { z } from "zod";
import {
  aiGeneratedTitle,
  articleType,
  faqs,
  gptVersion,
  imageCredit,
  imageSource,
  includeFaqSchema,
  includeYoutubeVideo,
  keywords,
  language,
  publishingDestination,
  realTimeData,
  subHeadings,
} from "../../shared/schema/schema.common";

// bulkInfoFormSchema schema
export const bulkInfoFormSchema = z.object({
  gptVersion,
  realTimeData,
  keywords,
  aiGeneratedTitle,
  language,
  articleType,
  subHeadings,
  faqs,
  includeFaqSchema,
  publishingDestination,
  imageSource,
  imageCredit,
  includeYoutubeVideo,
});

export type BulkInfoFormValues = z.infer<typeof bulkInfoFormSchema>;
