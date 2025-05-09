import { z } from "zod";
import { type IOptionType } from "./add_quote_types.ts";

// -------------------- START ROOFING QUES ONE  SCHEMA   --------------------

export type TRoofingTypeNeeded = "replacement";

export interface IRoofingNeededOptions extends IOptionType {
  value: TRoofingTypeNeeded;
}

export const roofingServiceNeededOptions: IRoofingNeededOptions[] = [
  {
    id: 1,
    value: "replacement",
    label: "Roof Replacement",
  },
];

export type TRoofingMaterialType =
  | "asphalt_shingles"
  | "metal"
  | "flat_roof"
  | "other";

export interface IRoofingMaterialType extends IOptionType {
  value: TRoofingMaterialType;
}

export const roofingMaterialTypeOptions: IRoofingMaterialType[] = [
  {
    id: 1,
    value: "asphalt_shingles",
    label: "Asphalt Shingles",
  },
  {
    id: 2,
    value: "metal",
    label: "Metal",
  },
  {
    id: 3,
    value: "flat_roof",
    label: "Flat Roof",
  },
  {
    id: 4,
    value: "other",
    label: "Other",
  },
];

const RoofingMaterialSchema = z.object({
  type: z
    .enum(["asphalt_shingles", "metal", "flat_roof", "other"] as const)
    .or(z.literal(""))
    .refine((val) => val !== "", { message: "Please select roofing material" })
    .nullable(),

  otherType: z.string().nullable().optional(),
});

export const RoofingQuesOneSchema = z.object({
  serviceNeeded: z
    .enum(["replacement"] as const)
    .or(z.literal(""))
    .refine((val) => val !== "", { message: "Please select service needed" }),

  roofingMaterial: RoofingMaterialSchema.superRefine((val, ctx) => {
    if (
      val.type === "other" &&
      (!val.otherType || val.otherType.trim() === "")
    ) {
      ctx.addIssue({
        path: ["otherType"],
        code: z.ZodIssueCode.custom,
        message: "Please enter your preffered material",
      });
    }
  }),
});

export type TRoofingQuesOneSchema = z.infer<typeof RoofingQuesOneSchema>;

// -------------------- END ROOFING QUES ONE  SCHEMA   --------------------

// -------------------- START ROOFING QUES TWO : METAL SCHEMA  SCHEMA    --------------------

export type TMetalRoofingType = "aluminum" | "steel" | "copper" | "other";

interface IMetalRoofingOptions extends IOptionType {
  value: TMetalRoofingType;
}

export const metalRoofingOptions: IMetalRoofingOptions[] = [
  {
    id: 1,
    value: "aluminum",
    label: "Aluminum",
  },
  {
    id: 2,
    value: "copper",
    label: "Copper",
  },
  {
    id: 3,
    value: "steel",
    label: "Steel",
  },
  {
    id: 4,
    value: "other",
    label: "Other",
  },
];

const MetalRoofingSchema = z.object({
  type: z
    .enum(["aluminum", "steel", "copper", "other"] as const)
    .or(z.literal(""))
    .refine((val) => val !== "", {
      message: "Please select one of the field",
    })
    .nullable(),

  otherType: z.string().nullable().optional(),
});

export const RoofingQuesTwoMetalSchema = z.object({
  metalRoofing: MetalRoofingSchema.superRefine((val, ctx) => {
    if (
      val.type === "other" &&
      (!val.otherType || val.otherType.trim() === "")
    ) {
      ctx.addIssue({
        path: ["otherType"],
        code: z.ZodIssueCode.custom,
        message: "Please specify other type",
      });
    }
  }),
});

export type TRoofingQuesTwoMetalSchema = z.infer<
  typeof RoofingQuesTwoMetalSchema
>;

// -------------------- END ROOFING QUES TWO : METAL SCHEMA  SCHEMA    --------------------

// -------------------- START ROOFING QUES TWO : ASPHALT SHINGLE SCHEMA  SCHEMA    --------------------

export type TAshphaltShingleGafType =
  | "timberline_NS"
  | "timberline_HDZ"
  | "timberline_UHDZ"
  | "other";

export interface IAsphaltShingleTypeGafOptions extends IOptionType {
  value: TAshphaltShingleGafType;
}

export const asphaltShingleGafTypeOptions: IAsphaltShingleTypeGafOptions[] = [
  {
    id: 1,
    value: "timberline_NS",
    label: "Timberline NS (Good)",
  },
  {
    id: 2,
    value: "timberline_HDZ",
    label: "Timberline HDZ (Better)",
  },
  {
    id: 3,
    value: "timberline_UHDZ",
    label: "Timberline UHDZ (Best)",
  },
  {
    id: 4,
    value: "other",
    label: "Other",
  },
];

export type TAshpaltShingleCertainTeedType =
  | "landmark"
  | "landmark_pro"
  | "grand_manor"
  | "other";

export interface IAshpaltShingleCertainTeedOptions extends IOptionType {
  value: TAshpaltShingleCertainTeedType;
}

export const asphaltCertainTeedTypeOptions: IAshpaltShingleCertainTeedOptions[] =
  [
    {
      id: 1,
      label: "Landmark (Good)",
      value: "landmark",
    },
    {
      id: 2,
      label: "Landmark PRO (Better)",
      value: "landmark_pro",
    },
    {
      id: 3,
      label: "Grand Manor (Best)",
      value: "grand_manor",
    },
    {
      id: 4,
      label: "Other",
      value: "other",
    },
  ];

export type TAsphaltShingleBrand = "gaf_brand" | "certain_teed_brand" | "other";
export const RoofingQuesTwoAsphaltSchema = z.object({
  asphaltShingleRoofing: z
    .object({
      brand: z
        .enum(["gaf_brand", "certain_teed_brand", "other"] as const)
        .or(z.literal(""))
        .refine((val) => val !== "", {
          message: "Please choose one of the field",
        })
        .nullable(),

      otherBrand: z.string().nullable().optional(),

      type: z.string().nullable().optional(),

      otherType: z.string().nullable().optional(),
    })
    .superRefine((val, ctx) => {
      const { brand, otherBrand, type, otherType } = val;

      if (brand === "other" && (!otherBrand || otherBrand.trim() === "")) {
        ctx.addIssue({
          path: ["otherBrand"],
          code: z.ZodIssueCode.custom,
          message: "Please specify your preffered brand",
        });
      }

      const brandTypes = [
        "landmark",
        "landmark_pro",
        "grand_manor",
        "other",
        "timberline_NS",
        "timberline_HDZ",
        "timberline_UHDZ",
      ];

      if (brand !== "other") {
        if (!type || !brandTypes.includes(type)) {
          ctx.addIssue({
            path: ["type"],
            code: z.ZodIssueCode.custom,
            message: "Please select one of the field",
          });
        }
      }

      if (type === "other" && (!otherType || otherType.trim() === "")) {
        ctx.addIssue({
          path: ["otherType"],
          code: z.ZodIssueCode.custom,
          message: "Please specify preffered type",
        });
      }
    }),
});

export type IRoofingQuesTwoAsphaltSchema = z.infer<
  typeof RoofingQuesTwoAsphaltSchema
>;
