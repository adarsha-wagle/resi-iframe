import React, { useEffect, useState } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
  get,
} from "react-hook-form";

import { cn } from "@/lib/utils";
import { env } from "@/config/env";
import { Label } from "../ui/label";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

type TControlledGoogleInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  className?: React.ComponentProps<"div">["className"];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

export type TOption = {
  // eslint-disable-next-line
  value: any;
  label: string;
};

export default function ControlledGoogleInputField<T extends FieldValues>({
  name,
  label,
  form,
  className = "",
  placeholder = "",
  required = false,
  defaultValue = "",
}: TControlledGoogleInputFieldProps<T>) {
  const errorMessage = get(form.formState.errors, name)?.message;

  // Use defaultValue prop or existing form value for initial state
  const existingAddress = (form.getValues(name) as string) || defaultValue;
  const [selectedValue, setSelectedValue] = useState<TOption | null>(
    existingAddress
      ? { value: { description: existingAddress }, label: existingAddress }
      : null
  );

  // Initialize from existing form values
  useEffect(() => {
    const address = form.getValues(name) as string;
    if (address && !selectedValue) {
      setSelectedValue({
        value: { description: address },
        label: address,
      });
    }
  }, [form, name, selectedValue]);

  // Handle address changes
  useEffect(() => {
    if (selectedValue) {
      // Set the address value directly
      form.setValue(name, selectedValue.label as PathValue<T, typeof name>, {
        shouldValidate: true,
      });
    }
  }, [selectedValue, form, name]);

  return (
    <div className={cn("w-full", className)}>
      <Label className="mb-3 block" htmlFor={name}>
        {label} {required && <sup className="text-themePink"> *</sup>}
      </Label>
      <GooglePlacesAutocomplete
        selectProps={{
          value: selectedValue,
          onChange: setSelectedValue,
          placeholder: placeholder,
          styles: {
            control: (base) => ({
              ...base,
              backgroundColor: "rgb(43,43,43)",
              color: "white",
              borderRadius: "8px",
              border: "1px solid #ffffff50",
              padding: "6px",
              "& input": {
                color: "white",
              },
              "&:hover": {
                borderColor: "#555",
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: "black",
              borderRadius: "8px",
              border: "1px solid #333",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }),
            option: (base, { isFocused, isSelected }) => ({
              ...base,
              backgroundColor: isFocused
                ? "#333"
                : isSelected
                ? "#444"
                : "black",
              color: "white",
              padding: "10px",
              cursor: "pointer",
            }),
            input: (base: any) => ({
              ...base,
              color: "#fff",
            }),
            singleValue: (base) => ({
              ...base,
              color: "white",
            }),
          },
        }}
        apiKey={env.GOOGLE_API_KEY}
        debounce={400}
      />
      {errorMessage && (
        <span className="text-xs text-red-500 pl-2">
          {errorMessage as string}
        </span>
      )}
    </div>
  );
}
