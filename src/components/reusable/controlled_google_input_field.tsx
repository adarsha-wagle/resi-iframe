import { useState, useEffect } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
  get,
} from "react-hook-form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { env } from "@/config/env";

type TControlledGoogleInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  form: UseFormReturn<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
};

export type TOption = {
  // eslint-disable-next-line
  value: any;
  label: string;
};

// Component to show error or info messages
const MessageDisplay = ({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) => (
  <div
    className={`text-sm ${isError ? "text-red-500" : "text-green-600"} mt-1`}
  >
    {message}
  </div>
);

export default function ControlledGoogleInputField<T extends FieldValues>({
  name,
  label,
  form,
  placeholder = "",
  required = false,
  defaultValue = "",
}: TControlledGoogleInputFieldProps<T>) {
  const errorMessage = get(form.formState.errors, name)?.message;
  const [selectedValue, setSelectedValue] = useState<TOption | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState<string | null>(null);

  // Handle the value change
  useEffect(() => {
    if (selectedValue) {
      form.setValue(name, selectedValue.label as PathValue<T, typeof name>, {
        shouldValidate: true,
      });
    }
  }, [selectedValue, form, name]);

  // Load the Google Maps script
  useEffect(() => {
    // If the script is already in the document, consider it loaded
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      setScriptLoaded(true);
      return;
    }

    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    // Create and append the script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${env.GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setScriptLoaded(true);
    };

    script.onerror = () => {
      setScriptError("Failed to load Google Maps script");
    };

    document.head.appendChild(script);

    // Cleanup
    return () => {
      // We don't remove the script on unmount as other components might need it
    };
  }, []);

  return (
    <div className="w-full">
      <div className="text-left mb-2">
        <label className="font-bold text-gray-700 text-lg">
          {label} {required && <span className="text-blue-500">*</span>}
        </label>
      </div>

      {defaultValue && <MessageDisplay message={`Selected: ${defaultValue}`} />}

      {scriptError ? (
        <MessageDisplay message={scriptError} isError={true} />
      ) : !scriptLoaded ? (
        <div className="w-full h-10 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <span className="text-gray-400">Loading...</span>
        </div>
      ) : (
        <GooglePlacesAutocomplete
          apiOptions={{ language: "en", region: "us" }}
          selectProps={{
            value: selectedValue,
            onChange: setSelectedValue,
            placeholder,
            className: "w-full",
            classNamePrefix: "google-places",
            styles: {
              control: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
                padding: "0.1875rem",
                "& input": {
                  color: "#4b5563",
                },
                "&:hover": {
                  borderColor: "#10b981",
                },
              }),
              menu: (base) => ({
                ...base,
                borderRadius: "0.5rem",
                borderColor: "#10b981",
                boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                color: "#4b5563",
                cursor: "pointer",
              }),
            },
          }}
          apiKey={env.GOOGLE_API_KEY}
          autocompletionRequest={{
            types: ["geocode", "establishment"],
          }}
          debounce={400}
        />
      )}

      {errorMessage && <MessageDisplay message={errorMessage} isError={true} />}
    </div>
  );
}
