import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bulkInfoFormSchema,
  BulkInfoFormValues,
} from "../schemas/write.info.article.schemas";

export function useBulkInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordpressSite, setWordpressSite] = useState<string | null>(null);

  const bulkForm = useForm<BulkInfoFormValues>({
    resolver: zodResolver(bulkInfoFormSchema),
    defaultValues: {
      gptVersion: "gpt-4o",
      realTimeData: false,
      keywords: "",
      aiGeneratedTitle: true,
      publishingDestination: "wordpress",
      language: "English",
      articleType: "Long Post Form",
      subHeadings: "AI will creatively think",
      faqs: "AI will creatively think",
      includeFaqSchema: true,
      imageSource: "google",
      imageCredit: true,
      includeYoutubeVideo: false,
    },
  });

  async function onSubmit(data: BulkInfoFormValues) {
    try {
      setIsSubmitting(true);
      console.log("Form submitted:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Handle success
      console.log("Content generation successful");
      bulkForm.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const addWordpressSite = (site: string) => {
    setWordpressSite(site);
  };

  return {
    bulkForm,
    onSubmit: bulkForm.handleSubmit(onSubmit),
    isSubmitting,
    wordpressSite,
    addWordpressSite,
  };
}
