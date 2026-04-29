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
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star <= rating + 0.5;
          return (
            <span key={star} className="relative inline-block">
              <Star
                size={starSize}
                className="text-gray-200"
                fill="currentColor"
              />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? "100%" : "50%" }}
                >
                  <Star
                    size={starSize}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className={`${textSize} text-gray-500`}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
