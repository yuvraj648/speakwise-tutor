
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LanguageLevelBadgeProps {
  level: "Beginner" | "Intermediate" | "Advanced";
  className?: string;
}

export function LanguageLevelBadge({ level, className }: LanguageLevelBadgeProps) {
  const colors = {
    Beginner: "bg-emerald-100 text-emerald-800",
    Intermediate: "bg-blue-100 text-blue-800",
    Advanced: "bg-purple-100 text-purple-800",
  };

  return (
    <Badge className={cn("font-medium", colors[level], className)} variant="outline">
      {level}
    </Badge>
  );
}
