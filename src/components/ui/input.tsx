import * as React from "react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(
      type === "password",
    );

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className="relative w-full">
        <label
          className={cn(
            "text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform text-sm transition-all duration-500",
            isFocused || props.value
              ? "text-primary left-2 top-0 bg-white px-1 text-xs"
              : "text-gray-500",
          )}
        >
          {placeholder}
        </label>
        <input
          type={isPasswordVisible ? "password" : "text"}
          className={cn(
            "flex h-10 w-full rounded-[6px] border !bg-white bg-transparent px-3 text-sm placeholder-transparent shadow-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-red-500"
              : isFocused || props.value
                ? "border-primary"
                : "border-gray-300",
            className,
          )}
          placeholder={placeholder}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
          >
            {isPasswordVisible ? (
              <EyeClosedIcon
                fontSize={20}
                className={`outline-none ${isFocused ? "text-primary" : "text-gray-500"}`}
              />
            ) : (
              <EyeIcon
                size={20}
                className={`outline-none ${isFocused ? "text-primary" : "text-gray-500"}`}
              />
            )}
          </button>
        )}
      </div>
    );
  },
);

InputCustom.displayName = "Input";

export { InputCustom };
