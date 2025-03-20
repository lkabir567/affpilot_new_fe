import { FileText, Users, Layers, FileEdit, Sparkles, Zap } from "lucide-react";
import { ToolCard } from "./ToolCard";

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

export function ToolsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
