import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
  get,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface IRadioOption {
  value: string;
  label: string;
}

type TControlledRadioFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  defaultValue?: PathValue<T, Path<T>> | undefined | "";
  className?: string;
  options: IRadioOption[];
  required?: boolean;
};

function ControlledRadioField<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  defaultValue = "",
  className = "",
  options = [],
  required = false,
}: TControlledRadioFieldProps<T>) {
  const errormessage = get(errors, name)?.message;

  return (
    <div className={cn("w-full", className)}>
      <Label className="mb-3 block" htmlFor={label}>
        {label} {required && <sup className="text-themePink"> *</sup>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field }) => (
          <>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-2"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
            {errormessage && (
              <span className="text-xs text-red-500 pl-2">
                {errormessage as string}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}

export default ControlledRadioField;
