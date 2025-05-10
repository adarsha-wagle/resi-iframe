import React from "react";
import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
  get,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";

interface ISelectOptions {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

type TControlledSelectFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  defaultValue?: PathValue<T, Path<T>> | undefined | "";
  className?: string;
  placeholder?: string;
  options: ISelectOptions[];
  setKey?: keyof ISelectOptions;
  showKey?: keyof ISelectOptions;
  inputClassName?: string;
  required?: boolean;
};
function ControlledSelectField<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  defaultValue = "",
  options = [],
  placeholder = "",
  className = "",
  setKey = "value",
  showKey = "label",
  inputClassName = "",
  required = false,
}: TControlledSelectFieldProps<T>) {
  const errormessage = get(errors, name)?.message;
  // console.log("options", options);
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
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className={inputClassName}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem
                    value={option?.[setKey] as string}
                    key={option?.value}
                  >
                    {option?.[showKey] as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default ControlledSelectField;
