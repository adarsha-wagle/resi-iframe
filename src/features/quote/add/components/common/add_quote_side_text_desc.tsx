import React from "react";
import CheckMarkSvg from "@/components/reusable/check_mark_svg";
import { removeUnderscore } from "@/lib/helpers";

type TNewQuoteSideTextDescriptionProps = {
  selectedService?: string;
};

function NewQuoteSideTextDescription({
  selectedService = "",
}: TNewQuoteSideTextDescriptionProps) {
  const TextDescription = [
    `Get the best deals by comparing prices for ${
      selectedService === "select" || !selectedService
        ? "different services"
        : removeUnderscore(selectedService)
    } now.`,
    "Risk-free, no obligation service",
  ];

  return (
    <>
      {TextDescription.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-start gap-x-4 mb-8 md:mb-5 lg:mb-8"
        >
          <CheckMarkSvg />
          <p className="text-secondary-dark font-bold leading-[30px] text-[1.1rem] md:text-[1.25rem]">
            {item}
          </p>
        </div>
      ))}
    </>
  );
}

export default React.memo(NewQuoteSideTextDescription);
