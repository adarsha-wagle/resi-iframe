import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
  get,
} from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type TControlledTextAreaProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  type?: "text" | "number" | "password" | "email" | "datetime-local";
  defaultValue?: PathValue<T, Path<T>> | undefined | "";
  className?: string;
  placeholder?: string;
  inputClassName?: string;
  required?: boolean;
};

export default function ControlledTextArea<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  defaultValue = "",
  className = "",
  placeholder = "",
  inputClassName = "",
  required = false,
}: TControlledTextAreaProps<T>) {
  const errormessage = get(errors, name)?.message;

  return (
    <div className={cn("w-full", className)}>
      <Label className="mb-3 block" htmlFor={label}>
        {label} {required && <sup className="text-themePink"> *</sup>}
      </Label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field }) => (
          <>
            <Textarea
              placeholder={placeholder}
              className={cn("resize-none", inputClassName)}
              {...field}
            />
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
