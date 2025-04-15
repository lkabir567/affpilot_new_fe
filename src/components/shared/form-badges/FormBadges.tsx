import { Badge } from "@/components/ui/badge";
import { FC } from "react";

interface FormBadgesProps {
  badgeNumber: number;
  labels: string[];
}

// Just classNames, index order matters
const allBadgeStyles = [
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-green-50 text-green-700 border-green-100",
  "bg-purple-50 text-purple-700 border-purple-100",
  "bg-amber-50 text-amber-700 border-amber-100",
];

const FormBadges: FC<FormBadgesProps> = ({ badgeNumber, labels }) => {
  // Validate props
  if (badgeNumber > 4) {
    throw new Error("badgeNumber cannot be more than 4");
  }

  if (labels.length !== badgeNumber) {
    throw new Error("The number of labels must match badgeNumber");
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      {labels.map((label, index) => (
        <Badge
          key={index}
          variant="outline"
          className={`${allBadgeStyles[index]} px-3 py-1`}
        >
          {label}
        </Badge>
      ))}
    </div>
  );
};

export default FormBadges;
