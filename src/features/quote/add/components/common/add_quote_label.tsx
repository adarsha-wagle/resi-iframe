import { cn } from "@/lib/utils";
import React from "react";

type TAddQuoteLabelProps = {
  title: string;
  className?: React.ComponentProps<"p">["className"];
};

function AddQuoteLabel({ title, className }: TAddQuoteLabelProps) {
  return (
    <p className={cn("font-bold text-2xl text-left mb-2", className)}>
      {title}
    </p>
  );
}

export default AddQuoteLabel;
