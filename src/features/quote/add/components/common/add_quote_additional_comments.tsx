import { useForm } from "react-hook-form";
import {
  NewQuoteAdditionalCommentSchema,
  type TNewQuoteAdditionalCommentSchema,
} from "./add_quote_types";
import { zodResolver } from "@hookform/resolvers/zod";
import AddQuotePreviousButton from "./add_quote_previous_button";
import ControlledInputField from "@/components/reusable/controlled_input_field";
import ControlledTextArea from "@/components/reusable/controlled_text_area";

function AddQuoteAdditionalComments() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TNewQuoteAdditionalCommentSchema>({
    resolver: zodResolver(NewQuoteAdditionalCommentSchema),
  });

  const onSubmit = (values: TNewQuoteAdditionalCommentSchema) => {};

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
            <ControlledInputField
              control={control}
              name="title"
              label="8. Job Title"
              placeholder="Job title (< 30 characters)"
              errors={errors}
              required
            />
            <ControlledTextArea
              control={control}
              name="additionalComment"
              label="9. Additional Comment"
              errors={errors}
              placeholder="Any comments before your quote"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddQuoteAdditionalComments;
