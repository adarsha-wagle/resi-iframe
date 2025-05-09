import React from "react";
import AddQuoteSideTextDescription from "./add_quote_side_text_desc.tsx";
import AddQuoteStepper from "./add_quote_stepper.tsx";
import { type TActiveForm } from "./add_quote_types.ts";
import ButtonLoading from "@/components/reusable/button_loading.tsx";

type TAddQuoteSideText = {
  activeForm: TActiveForm;
  buttonType?: "submit" | "button";
  loadingText?: string;
  handleButtonClick?: () => void;
  isLoading?: boolean;
};

const ACTIVE_STEP: Record<TActiveForm, number> = {
  firstPage: 1,

  gutterQuesOne: 2,

  roofingQuesOne: 2,

  roofingQuesTwoAsphalt: 2,
  roofingQuesTwoMetal: 2,

  treeRemovalQuesOne: 2,
  treeRemovalQuesTwo: 2,

  landscapingQuesOne: 2,
  landscapingQuesTwoLawnMowing: 2,
  landscapingQuesTwoMulchInstallation: 2,

  additionalCommentPage: 3,

  lastPage: 3,
};

function AddQuoteSideText({
  activeForm,
  buttonType = "submit",
  loadingText = "Next",
  isLoading = false,
  handleButtonClick = () => {},
}: TAddQuoteSideText) {
  //   const firstPageData = useSelector(newQuoteFirstPageData);

  return (
    <>
      <div className="px-0 md:px-4 py-4">
        <div className="none md:block">
          <p className="responsive__fontsize40 font-bold">
            No Cold Calls, Get Real Quotes from
          </p>

          <p className="responsive__fontsize80 font-extrabold mt-2">
            Real Local Pros in your Area
            <br />
          </p>
          <div className="md:mt-4 lg:mt-8">
            <AddQuoteSideTextDescription selectedService="Gutter Cleaning" />
          </div>
        </div>
        <div className="md:mt-6 lg:mt-12">
          <ButtonLoading
            type={buttonType}
            buttonText={loadingText}
            isLoading={isLoading}
            handleClick={handleButtonClick}
            className="area-normal-600"
          />
        </div>
      </div>
      <div className="md:mt-4 lg:mt-8">
        <AddQuoteStepper activeStep={ACTIVE_STEP[activeForm]} />
      </div>
    </>
  );
}

export default React.memo(AddQuoteSideText);
