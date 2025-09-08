import React from 'react';
import { cn } from '../../utils/cn';

const Toggle = React.forwardRef(({
  className,
  id,
  checked,
  disabled = false,
  label,
  description,
  error,
  size = "default",
  ...props
}, ref) => {
  // Generate unique ID if not provided
  const toggleId = id || `toggle-${Math.random()?.toString(36)?.substr(2, 9)}`;

  // Size variants
  const sizeClasses = {
    sm: "h-4 w-8",
    default: "h-6 w-11",
    lg: "h-7 w-12"
  };

  const thumbSizeClasses = {
    sm: "h-3 w-3",
    default: "h-5 w-5",
    lg: "h-6 w-6"
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          ref={ref}
          id={toggleId}
          checked={checked}
          disabled={disabled}
          className="sr-only"
          {...props}
        />

        <label
          htmlFor={toggleId}
          className={cn(
            "relative inline-flex items-center cursor-pointer rounded-full border-2 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            sizeClasses?.[size],
            checked
              ? "bg-gradient-to-r from-orange-500 to-pink-500 border-orange-500" :"bg-gray-600 border-gray-400",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span
            className={cn(
              "pointer-events-none block rounded-full bg-white shadow-lg transform ring-0 transition-transform duration-200 ease-in-out",
              thumbSizeClasses?.[size],
              checked ? "translate-x-5" : "translate-x-0.5"
            )}
          />
        </label>
      </div>

      {(label || description || error) && (
        <div className="flex-1 space-y-1">
          {label && (
            <label
              htmlFor={toggleId}
              className={cn(
                "text-sm font-medium leading-none cursor-pointer",
                error ? "text-destructive" : "text-foreground",
                disabled && "cursor-not-allowed opacity-70"
              )}
            >
              {label}
            </label>
          )}

          {description && !error && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Toggle.displayName = "Toggle";

export default Toggle;