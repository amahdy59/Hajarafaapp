import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
}

export function StarRating({ rating, reviewCount, size = "sm", showCount = true }: StarRatingProps) {
  const starSize = size === "sm" ? 12 : size === "md" ? 16 : 20;
  const textSize = size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  return (
    <div
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars${reviewCount !== undefined ? `, based on ${reviewCount.toLocaleString()} reviews` : ""}`}
      className="flex items-center gap-1"
    >
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star <= rating + 0.5;
          return (
            <span key={star} className="relative inline-block">
              <Star
                size={starSize}
                className="text-border dark:text-zinc-700"
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : "50%" }}
                >
                  <Star
                    size={starSize}
                    className="text-amber-500 dark:text-amber-400"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${textSize} text-muted-foreground font-medium`}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
