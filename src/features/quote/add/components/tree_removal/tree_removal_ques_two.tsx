import ControlledSelectField from "@/components/reusable/controlled_select_field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pin } from "lucide-react";
import {
  treeLocationAreaOptions,
  TreeRemovalQuesTwoSchema,
  type TTreeRemovalQuesTwoSchema,
} from "../common/tree_removal_types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AddQuoteLabel from "../common/add_quote_label";

function TreeRemovalQuesTwo() {
  //   const index =
  //     prevForm === "additionalCommentPage"
  //       ? Number(treeRemovalQuesOneData?.treeCount || 1) - 1
  //       : 0;
  const index = 0;
  const [currentIndex, setCurrentIndex] = useState<number>(index);

  const form = useForm<TTreeRemovalQuesTwoSchema>({
    resolver: zodResolver(TreeRemovalQuesTwoSchema),
  });

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex justify-between items-center flex-col md:flex-row">
      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[45%] xl:w-[38%]">
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </div>
      TreeRemovalQuesTwo
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
        <div>
          <p>1</p>
          <Separator />
        </div>
        <div className="flex gap-4 items-center">
          <ControlledSelectField
            control={control}
            name={`treeDetails.${currentIndex}.treeLocation.locationArea`}
            label="Tree Location"
            options={treeLocationAreaOptions}
            errors={errors}
            className="w-[40%]"
          />
          <div>
            <AddQuoteLabel title="Drop Tree Location Pin on Map" />
            <div className="flex items-center justify-center px-1 sm:px-4 cursor-pointer h-[44px] rounded-xl">
              <Pin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreeRemovalQuesTwo;
