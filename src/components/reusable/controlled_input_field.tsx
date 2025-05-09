import {
  type Control,
  Controller,
  type FieldErrors,
  type FieldValues,
  type Path,
  type PathValue,
  get,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type TControlledInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  type?: "text" | "number" | "password" | "email" | "datetime-local";
  defaultValue?: PathValue<T, Path<T>> | undefined | "";
  className?: React.ComponentProps<"input">["className"];
  placeholder?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
};

function ControlledInputField<T extends FieldValues>({
  name,
  label,
  control,
  errors,
  type = "text",
  defaultValue = "",
  className = "",
  inputClassName = "",
  placeholder = "",
  required = false,
  disabled = false,
}: TControlledInputFieldProps<T>) {
  const errorMessage = get(errors, name)?.message;

  // Get current date and time in YYYY-MM-DDThh:mm format for min attribute
  const getCurrentDateTime = (): string => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  };

  return (
    <div className={cn("w-full", className)}>
      <Label className="mb-3 block" htmlFor={label}>
        {label}
        {required && <sup className="text-themePink"> *</sup>}
      </Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as PathValue<T, Path<T>>}
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <>
            <input
              {...fieldProps}
              required={required}
              type={type}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                inputClassName
              )}
              disabled={disabled}
              placeholder={placeholder}
              value={
                type === "datetime-local" && value
                  ? formatDateForInput(value)
                  : value || ""
              }
              min={type === "datetime-local" ? getCurrentDateTime() : undefined}
              onChange={(e) => {
                if (type === "datetime-local") {
                  // Convert the datetime-local value to ISO string
                  const date = new Date(e.target.value);
                  onChange(date.toISOString());
                } else {
                  onChange(e);
                }
              }}
            />
            {errorMessage && (
              <span className="text-xs text-red-500 pl-2">
                {errorMessage as string}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
}

// Helper function to format date for datetime-local input
function formatDateForInput(value: string): string {
  try {
    const date = new Date(value);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "";
    }
    // Format to YYYY-MM-DDThh:mm
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
  } catch {
    return "";
  }
}

export default ControlledInputField;
