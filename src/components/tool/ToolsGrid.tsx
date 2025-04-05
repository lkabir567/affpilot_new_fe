import { FileText, Users, Layers, FileEdit, Sparkles, Zap } from "lucide-react";
import { ToolCard } from "./ToolCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetAllFeaturesQuery } from "@/redux/features/task/taskApi";
import { useEffect, useState } from "react";
import useFeatureList from "@/hooks/features/useFeatureList";

const tools = [
  {
    id: 1,
    title: "AI Info Bulk Article",
    description: "Generate multiple SEO-friendly articles with a single click.",
    icon: <FileText className="h-5 w-5" />,
    color: "violet",
    isPopular: true,
  },
  {
    id: 2,
    title: "Short Info Article",
    description: "Create concise, informative content automatically.",
    icon: <Zap className="h-5 w-5" />,
    color: "emerald",
    isNew: true,
  },
  {
    id: 3,
    title: "Manual Sub-Heading",
    description: "Customize article structure with your own headings.",
    icon: <Layers className="h-5 w-5" />,
    color: "amber",
  },
  {
    id: 4,
    title: "Article Editor",
    description: "Edit and refine AI-generated content interactively.",
    icon: <FileEdit className="h-5 w-5" />,
    color: "rose",
    isPopular: true,
  },
  {
    id: 5,
    title: "Human-Like Mode",
    description: "Generate content that mimics human writing styles.",
    icon: <Users className="h-5 w-5" />,
    color: "blue",
  },
  {
    id: 6,
    title: "Client Generator",
    description: "Create and publish content directly to client websites.",
    icon: <Sparkles className="h-5 w-5" />,
    color: "indigo",
    isNew: true,
  },
];

export interface Feature {
  id: number;
  key: string;
  title: string;
  status: string;
  priority: number;
  sub_title: string;
  image: string | null;
}

interface PaginationLinks {
  next: string | null;
  previous: string | null;
}

interface FeaturesApiResponse {
  links: PaginationLinks;
  count: number;
  total_pages: number;
  current_page: number;
  results: Feature[];
}

export function ToolsGrid() {
  const { data, isLoading, isError, error } = useGetAllFeaturesQuery(undefined);
  const { getFeatures, setGetFeatures } = useFeatureList();
  const [nextPage, setNextPage] = useState<string | null>(null);

  // Initialize getFeatures as an empty array if not already
  useEffect(() => {
    if (!getFeatures) {
      setGetFeatures([]);
    }
  }, [getFeatures, setGetFeatures]);

  const fetchMoreData = async () => {
    if (!nextPage) return;

    const response = await fetch(nextPage);
    const pageData: FeaturesApiResponse = await response.json();

    // Make sure pageData.results is always an array
    setGetFeatures((prevFeatures) => [
      ...prevFeatures,
      ...(pageData.results || []), // Fallback to empty array if results are null/undefined
    ]);

    setNextPage(pageData.links?.next); // Set the next page URL
  };

  useEffect(() => {
    if (data) {
      setGetFeatures(data.results); // Set the initial features on load
      setNextPage(data.links?.next); // Set the next page URL
    }
  }, [data, setGetFeatures]);

  console.log("getFeatures", getFeatures);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}

      {/* infinite scroll */}

      <div>
        <InfiniteScroll
          dataLength={getFeatures?.length} // Length of the data already loaded
          next={fetchMoreData} // Function to call when scroll reaches the bottom
          hasMore={!!nextPage} // Check if there's more data to load
          loader={<div>Loading more...</div>} // Loader while fetching new data
          endMessage={<div>No more features to load</div>} // Message when all data is loaded
        >
          {getFeatures.map((feature, i) => (
            <div
              key={feature?.id}
              className="p-4 border rounded-lg shadow-sm mb-2 bg-white dark:bg-slate-900"
            >
              <p>{i}</p>
              <h3>{feature?.title}</h3>
              <p>{feature?.sub_title}</p>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
