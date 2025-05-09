import React from "react";
import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type TButtonLoadingProps = {
  buttonText: string;
  loadingText?: string;
  loadingIcon?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  isLoading: boolean;
  handleClick?: () => void;
  className?: React.ComponentProps<"button">["className"];
  disabled?: boolean;
};

function ButtonLoading({
  buttonText,
  loadingIcon = (
    <LoaderCircle className="animate-spin h-5 w-5 mr-1" size={20} />
  ),
  variant = "default",
  type = "button",
  isLoading,
  handleClick = () => {},
  className = "",
  loadingText = "Loading...",
  disabled = false,
}: TButtonLoadingProps) {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={handleClick}
      className={cn(className)}
      disabled={disabled}
    >
      {isLoading && loadingIcon}
      {isLoading ? loadingText : buttonText}
    </Button>
  );
}

export default ButtonLoading;
