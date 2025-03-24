import React from "react";

export default function Loader({
  size = "medium",
  color = "primary",
  type = "spinner",
  text = "Loading...",
  showText = true,
  fullScreen = false,
}) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-blue-600",
    secondary: "text-gray-600",
    success: "text-green-600",
    danger: "text-red-600",
    warning: "text-yellow-600",
  };

  const loaderSize = sizeClasses[size] || sizeClasses.medium;
  const loaderColor = colorClasses[color] || colorClasses.primary;

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50"
    : "flex items-center justify-center";

  const renderLoader = () => {
    switch (type) {
      case "dots":
        return (
          <div className="flex space-x-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`rounded-full ${loaderColor} animate-pulse ${
                  size === "small"
                    ? "h-2 w-2"
                    : size === "medium"
                      ? "h-3 w-3"
                      : "h-4 w-4"
                }`}
                style={{
                  animationDelay: `${(dot - 1) * 0.2}s`,
                }}
              />
            ))}
          </div>
        );

      case "progress":
        return (
          <div
            className={`w-full max-w-xs overflow-hidden rounded-full bg-gray-200`}
          >
            <div
              className={`h-2 ${loaderColor.replace("text", "bg")} animate-pulse`}
              style={{ width: "75%", animationDuration: "1.5s" }}
            />
          </div>
        );

      case "spinner":
      default:
        return (
          <svg
            className={`animate-spin ${loaderSize} ${loaderColor}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        {renderLoader()}
        {showText && text && (
          <span className={`mt-2 ${loaderColor} text-sm font-medium`}>
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
