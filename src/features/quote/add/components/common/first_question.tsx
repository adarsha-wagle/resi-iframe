import { useForm } from "react-hook-form";

import {
  AddQuoteFirstPageSchema,
  serviceTypeOptions,
  type TAddQuoteFirstPageSchema,
} from "./add_quote_types";
import { zodResolver } from "@hookform/resolvers/zod";
import AddQuoteSideText from "./add_quote_side_text";
import AddQuotePreviousButton from "./add_quote_previous_button";
import ControlledSelectField from "@/components/reusable/controlled_select_field";
import ControlledInputField from "@/components/reusable/controlled_input_field";
import ControlledGoogleInputField from "@/components/reusable/controlled_google_input_field";

function FirstQuestion() {
  const form = useForm<TAddQuoteFirstPageSchema>({
    resolver: zodResolver(AddQuoteFirstPageSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: TAddQuoteFirstPageSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[38%]">
          <AddQuotePreviousButton to="firstPage" />
          <div
            className="
  px-4 sm:px-6 md:px-8 lg:px-11
  py-3 sm:py-4 md:py-7.5 lg:py-9
  bg-[rgba(241,241,241,0.89)]
  shadow-[0px_3px_6px_rgba(0,0,0,0.16)]
  rounded
  flex flex-col gap-8
"
          >
            <ControlledSelectField
              control={control}
              name="serviceType"
              label="1. What type of service are you looking for?"
              options={serviceTypeOptions}
              errors={errors}
              required
            />
            <div>
              <ControlledGoogleInputField
                form={form}
                name="location.address"
                required
                label="2. What is the property address ?"
                defaultValue={""}
              />
              <ControlledInputField
                control={control}
                name="location.zipCode"
                errors={errors}
                label=""
                placeholder="Zip Code *"
                className="w-full sm:w-1/2 md:[40%] mt-4"
                required
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-[80%] md:w-[50%]">
          <AddQuoteSideText activeForm="gutterQuesOne" />
        </div>
      </div>
    </form>
  );
}

export default FirstQuestion;
