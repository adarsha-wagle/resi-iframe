import { z } from "zod";

import { type IOptionType } from "./add_quote_types";

// -------------------- START GUTTER CLEANING QUES ONE SCHEMA --------------------

export type TGutterProtection =
  | "no_gutter_protection"
  | "solid_gutter_covers"
  | "gutter_screens";

export interface IGutterProtectionOptions extends IOptionType {
  value: TGutterProtection;
}

export const gutterProtectionOptions: IGutterProtectionOptions[] = [
  {
    id: 1,
    value: "no_gutter_protection",
    label: "No Gutter Protection",
  },
  {
    id: 2,
    value: "solid_gutter_covers",
    label: "Solid Gutter Covers",
  },
  {
    id: 3,
    value: "gutter_screens",
    label: "Gutter Screens",
  },
];

export type TLastGutterCleaningTimeRange =
  | "0_6_months"
  | "6_12_months"
  | "12_24_months"
  | "over_2_years"
  | "select";

export interface ILastGutterCleaningTimeRangeOptions extends IOptionType {
  value: TLastGutterCleaningTimeRange;
}

export const lastGutterCleaningTimeRangeOptions: ILastGutterCleaningTimeRangeOptions[] =
  [
    {
      id: 1,
      value: "0_6_months",
      label: "0-6 Months",
    },
    {
      id: 2,
      value: "6_12_months",
      label: "6-12 Months",
    },
    {
      id: 3,
      value: "12_24_months",
      label: "12-24 Months",
    },
    {
      id: 4,
      value: "over_2_years",
      label: "Over 2 Years",
    },
  ];

export const GutterCleaningQuesOneSchema = z.object({
  gutterProtectionType: z.string().min(1, "Gutter protection type is required"),
  lastGutterCleaningTimeRange: z.string().min(1, "Time range is required"),
  images: z.any().optional(), // you can refine this if needed for file list or S3 object
});

export type TGutterCleaningQuesOneSchema = z.infer<
  typeof GutterCleaningQuesOneSchema
>;

// -------------------- END GUTTER CLEANING QUES ONE SCHEMA --------------------
