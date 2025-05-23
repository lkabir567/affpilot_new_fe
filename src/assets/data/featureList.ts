export const featureList =  [
      {
        id: 1585,
        label: "AI Info Bulk Article",
        description:
          "Provide keyword and write 100% unique SEO friendly informative article with just one click.",
        image: "./bulk_generation.png",
        link: ROUTES.infoArticle,
        isPremium: false,
        category: "AI Info Article",
        recommended: true,
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.AI_INFO_ARTICLE
            ? taskUserDetails?.free_trails?.AI_INFO_ARTICLE
            : 0,
      },
      {
        id: 5785,
        label: "Short Info Article",
        description:
          "Just input your keywords, Affpilot will write contents and publish to your website automatically.",
        image: "./editor.png",
        link: ROUTES.shortArticle,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            ? taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            : 0,
      },
      {
        id: 2757,
        label: "AI Info Manual Sub-Heading",
        description:
          "Provide keyword with your own Sub-Headings and write 100% unique SEO friendly article with just one click.",
        image: "./manual_sub.png",
        link: ROUTES.manualSubheading,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.INFO_ARTICLE_NEW_Manual_Subheading
            ? taskUserDetails?.free_trails?.INFO_ARTICLE_NEW_Manual_Subheading
            : 0,
      },
      {
        id: 3425,
        label: "AI Info Article Editor",
        description:
          "Don't have a Wordpress Site? No worries, this feature will generate the article in an interactive editor.",
        image: "./editor.png",
        link: ROUTES.infoArticleEditor,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            ? taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            : 0,
      },
      {
        id: 4545,
        label: "Human Like Mode (Outline to Editor)",
        description:
          "Enter a keyword, customize the outline, and generate your AI-powered article in an interactive editor.",
        image: "./editor.png",
        link: ROUTES.assistedWriter,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            ? taskUserDetails?.free_trails?.INFO_ARTICLE_EDITOR
            : 0,
      },

      {
        id: 8557,
        label: "Client Generator",
        description:
          "Just input your keywords, Affpilot will write contents and publish to your website automatically.",
        image: "./editor.png",
        link: ROUTES.clientGenerator,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
      },
      {
        id: 7875,
        label: "Affiliate Content Generator",
        description:
          "Write Long-Form Affiliate Content simply by entering your product name, link, niche and keywords.",
        image: "./editor.png",
        link: ROUTES.affiliateContentGenerator,
        recommended: true,
        isPremium: false,
        category: "AI Info Article",
      },
      {
        id: 6145,
        label: "Amazon Review Article",
        description:
          "Write human-readable, 100% unique SEO optimized product review article in minutes.",
        image: "./amazon_2.png",
        link: ROUTES.reviewArticle,
        recommended: true,
        isPremium: false,
        category: "AI Review Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.REVIEW_ARTICLE
            ? taskUserDetails?.free_trails?.REVIEW_ARTICLE
            : 0,
      },
      {
        id: 7875,
        label: "Amazon Review Article Manual",
        description:
          "Search and add products manually and write 100% unique SEO optimized product review article in minutes.",
        image: "./amazon_2.png",
        link: ROUTES.manualReviewArticle,
        recommended: true,
        isPremium: false,
        category: "AI Review Article",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.REVIEW_ARTICLE_MANUAL
            ? taskUserDetails?.free_trails?.REVIEW_ARTICLE_MANUAL
            : 0,
      },
      {
        id: 417512,
        label: "Keywords Explorer",
        description:
          "Google suggested keyword ideas with low competitive keyword difficulty",
        image: "./SEO.png",
        isNew: true,
        link: ROUTES.keywordExplorer,
        isPremium: false,
        category: "SEO Tools",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.GOOGLE_AUTO_SUGGESTION
            ? taskUserDetails?.free_trails?.GOOGLE_AUTO_SUGGESTION
            : null,
      },
      {
        id: 7275,
        label: "Scrape Competitor's Keywords",
        description:
          "Scrape all keywords and post titles from any website. Clone any website in minutes.",
        image: "./SEO.png",
        isNew: true,
        link: ROUTES.scrapKeyword,
        isPremium: false,
        category: "SEO Tools",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.SITEMAP_TO_TITLE
            ? taskUserDetails?.free_trails?.SITEMAP_TO_TITLE
            : null,
      },
      {
        id: 4175,
        label: "Keyword Grouping Tool",
        description:
          "Cluster large volume of keyword in second! Keywords clustering is an advanced SEO strategy that relies on grouping semantically-related words together.",
        image: "./SEO.png",
        link: ROUTES.keywordGroupingTool,
        isNew: true,
        isPremium: false,
        category: "SEO Tools",
        isFree:
          taskUserDetails?.free_trails &&
          taskUserDetails?.free_trails?.KEYWORD_GROUPING_TOOL
            ? taskUserDetails?.free_trails?.KEYWORD_GROUPING_TOOL
            : null,
      },
    ];
