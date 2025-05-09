import AddQuotePreviousButton from "../common/add_quote_previous_button";
import { useForm } from "react-hook-form";
import {
  TreeRemovalQuesOneSchema,
  type TTreeRemovalQuesOneSchema,
} from "../common/tree_removal_types";
import { zodResolver } from "@hookform/resolvers/zod";

function TreeRemovalQuesOne() {
  const form = useForm<TTreeRemovalQuesOneSchema>({
    resolver: zodResolver(TreeRemovalQuesOneSchema),
  });
  const { control, handleSubmit } = form;
  const onSubmit = (data: TTreeRemovalQuesOneSchema) => {};

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
            TreeRemovalQuesOne
          </div>
        </div>
      </div>
    </form>
  );
}

export default TreeRemovalQuesOne;
