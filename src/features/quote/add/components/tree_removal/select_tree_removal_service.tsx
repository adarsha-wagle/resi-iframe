import { type UseFormReturn } from "react-hook-form";
import {
  type TTreeRemovalQuesOneSchema,
  type TTreeRemovalService,
  treeRemovalServiceOptions,
} from "../common/tree_removal_types";

type TSelectTreeRemovalServiceProps = {
  form: UseFormReturn<TTreeRemovalQuesOneSchema>;
};

function SelectTreeRemovalService({ form }: TSelectTreeRemovalServiceProps) {
  const handleServiceChange = (service: TTreeRemovalService) => {
    form.setValue("serviceNeeded", service);
  };

  const watchServiceNeeded = form.watch("serviceNeeded");
  const errorMessage = form.formState.errors.serviceNeeded?.message;

  return (
    <div>
      <div className="flex justify-center gap-8">
        {treeRemovalServiceOptions.map((item) => (
          <span
            key={item.id}
            className={`p-2 px-3 rounded-md cursor-pointer bg-secondary-main w-28 flex flex-col items-center justify-center shadow-md ${
              watchServiceNeeded === item.value ? "border border-[#217442]" : ""
            }`}
            onClick={() => handleServiceChange(item.value)}
          >
            <img src={item.icon} alt={item.label} className="w-16 h-16" />
            <p className="text-[9px] text-center text-secondary-dark font-bold">
              {item.label}
            </p>
          </span>
        ))}
      </div>
      {errorMessage && (
        <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

export default SelectTreeRemovalService;
