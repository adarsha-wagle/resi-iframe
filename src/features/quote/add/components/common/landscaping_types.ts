import { z } from "zod";
import { type IOptionType } from "./add_quote_types.ts";

// -------------------- START LANDSCAPING QUES ONE SCHEMA --------------------

export type TLandscapingServiceNeededType =
  | "lawn_mowing"
  | "mulch_installation"
  | "select";

export interface ILandscapingServiceNeeded extends IOptionType {
  value: TLandscapingServiceNeededType;
}

export const landscapingServiceNeededOptions: ILandscapingServiceNeeded[] = [
  {
    id: 1,
    value: "lawn_mowing",
    label: "Lawn Mowing",
  },
  {
    id: 2,
    value: "mulch_installation",
    label: "Mulch Installation",
  },
];

export const LandscapingQuesOneSchema = z.object({
  serviceNeeded: z
    .enum(["lawn_mowing", "mulch_installation"])
    .or(z.literal(""))
    .refine((val) => val !== "", {
      message: "Service is required",
    }),
});

export type TLandscapingQuesOneSchema = z.infer<
  typeof LandscapingQuesOneSchema
>;

// -------------------- END LANDSCAPING QUES ONE SCHEMA --------------------

// -------------------- START LANDSCAPING QUES TWO : MULCH INSTALLATION SCHEMA   --------------------

export type TMulchAreaType = "front" | "rear" | "entire" | "select";

interface IMulchArea extends IOptionType {
  value: TMulchAreaType;
}

export const mulchInstallationAreaOptions: IMulchArea[] = [
  {
    id: 1,
    value: "front",
    label: "Front",
  },
  {
    id: 2,
    value: "rear",
    label: "Rear",
  },
  {
    id: 3,
    value: "entire",
    label: "Entire",
  },
];

export type TMuchInstallationServiceType = "full_service" | "standard_service";

interface IMulchInstallationServiceType extends IOptionType {
  value: TMuchInstallationServiceType;
}

export const mulchInstallationServiceTypeOptions: IMulchInstallationServiceType[] =
  [
    {
      id: 1,
      value: "full_service",
      label:
        "Full Service (Remove weeds, trim shrubs as needed, edge beds & install mulch)",
    },
    {
      id: 2,
      value: "standard_service",
      label: "Standard Service (Remove weeds, edge beds & install mulch)",
    },
  ];

export type TMulchInstallationMulchType =
  | "regular_shredded_mulch"
  | "brown_colorized_mulch"
  | "black_colorized_mulch"
  | "red_colorized_mulch";

interface IMulchInstallationMulchTypeOptions extends IOptionType {
  value: TMulchInstallationMulchType;
}

export const mulchInstallationMulchTypeOptions: IMulchInstallationMulchTypeOptions[] =
  [
    {
      id: 1,
      value: "regular_shredded_mulch",
      label: "Regular Shredded Mulch (un-colorized)",
    },
    {
      id: 2,
      value: "brown_colorized_mulch",
      label: "Brown Colorized Mulch",
    },
    {
      id: 3,
      value: "black_colorized_mulch",
      label: "Black Colorized Mulch",
    },
    {
      id: 4,
      value: "red_colorized_mulch",
      label: "Red Colorized Mulch",
    },
  ];
export const LandscapingQuesTwoMulchInstallationSchema = z.object({
  mulchInstallation: z.object({
    mulchArea: z.string().min(1, "Please select mulch area"),
    service: z.string().min(1, "Please select service"),
    mulchType: z
      .enum([
        "regular_shredded_mulch",
        "brown_colorized_mulch",
        "black_colorized_mulch",
        "red_colorized_mulch",
      ] as const)
      .or(z.literal(""))
      .refine((val) => val !== "", {
        message: "Please select mulch type",
      }),
  }),
  images: z.any().optional(),
});

export type TLandscapingQuesTwoMulchInstallationSchema = z.infer<
  typeof LandscapingQuesTwoMulchInstallationSchema
>;

// -------------------- END LANDSCAPING QUES TWO : MULCH INSTALLATION SCHEMA   --------------------

// -------------------- START LANDSCAPING QUES TWO : LAWN MOWING SCHEMA   --------------------

export type TLawnMowingFrequencyType = "one_time" | "weekly" | "bi_weekly";

export interface ILawdmowingFrequency extends IOptionType {
  value: TLawnMowingFrequencyType;
}

export const lawnmowingFrequencyOptions: ILawdmowingFrequency[] = [
  {
    id: 1,
    value: "one_time",
    label: "One Time",
  },
  {
    id: 2,
    value: "weekly",
    label: "Weekly",
  },
  {
    id: 3,
    value: "bi_weekly",
    label: "Bi Weekly",
  },
];

export const LandscapingQuesTwoLawnMowingSchema = z.object({
  lawnMowing: z.object({
    frequency: z.string().optional(),
  }),
  images: z.any().optional(),
});

export type TLandscapingQuesTwoLawnMowingSchema = z.infer<
  typeof LandscapingQuesTwoLawnMowingSchema
>;
