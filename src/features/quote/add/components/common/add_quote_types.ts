import { z } from "zod";

export type TActiveForm =
  | "firstPage"
  | "additionalCommentPage"
  | "lastPage"
  | "gutterQuesOne"
  | "roofingQuesOne"
  | "roofingQuesTwoAsphalt"
  | "roofingQuesTwoMetal"
  | "landscapingQuesOne"
  | "landscapingQuesTwoLawnMowing"
  | "landscapingQuesTwoMulchInstallation"
  | "treeRemovalQuesOne"
  | "treeRemovalQuesTwo";

export interface IOptionType {
  id: number;
  label: string;
}

const fairfaxZipCodes = [
  "22003",
  "22030",
  "20171",
  "22015",
  "20170",
  "20120",
  "22079",
  "22033",
  "22042",
  "22309",
  "22031",
  "22306",
  "22032",
  "22153",
  "22101",
  "22310",
  "20191",
  "22315",
  "22152",
  "22041",
  "22150",
  "22312",
  "22102",
  "20121",
  "22182",
  "22043",
  "20151",
  "22180",
  "20190",
  "22124",
  "22311",
  "22039",
  "22046",
  "22151",
  "22066",
  "20124",
  "22181",
  "22303",
  "22044",
  "22308",
  "20194",
  "22307",
  "22060",
  "20193",
  "22092",
  "22047",
  "22120",
  "22027",
  "22184",
  "22035",
  "22185",
  "22009",
  "22037",
  "22036",
  "22067",
  "22081",
  "22082",
  "22095",
  "22096",
  "22103",
  "22107",
  "22106",
  "22109",
  "22108",
  "22118",
  "22116",
  "22119",
  "22122",
  "22121",
  "22158",
  "22156",
  "22160",
  "22159",
  "22161",
  "22183",
  "22199",
  "20041",
  "20069",
  "20070",
  "20122",
  "20153",
  "20172",
  "20192",
  "20195",
  "20196",
  "20206",
];

const loudounZipCodes = [
  "20147",
  "20148",
  "20176",
  "20164",
  "20175",
  "20152",
  "20165",
  "20105",
  "20151",
  "20132",
  "20166",
  "20180",
  "20141",
  "20158",
  "22093",
  "20135",
  "20117",
  "20197",
  "20184",
  "20129",
  "20149",
  "20107",
  "20101",
  "20103",
  "20102",
  "20104",
  "20118",
  "20131",
  "20134",
  "20142",
  "20146",
  "20159",
  "20163",
  "20160",
  "20167",
  "20177",
  "20178",
  "20189",
];

const arlingtonZipCodes = [
  "22204",
  "22201",
  "22207",
  "22202",
  "22203",
  "22229",
  "22205",
  "22223",
  "22206",
  "22234",
  "22218",
  "20231",
  "22209",
  "22213",
  "22211",
  "22214",
  "22222",
  "20598",
  "22210",
  "22212",
  "22215",
  "22217",
  "22216",
  "22219",
  "22226",
  "22225",
  "22227",
  "22230",
  "22241",
  "22240",
  "22243",
  "22242",
  "22245",
  "22244",
  "22246",
  "20301",
  "20310",
  "20330",
  "20350",
  "20453",
  "20406",
];

// Merge all the zip codes
const allZipCodes = [
  ...fairfaxZipCodes,
  ...loudounZipCodes,
  ...arlingtonZipCodes,
];

// -------------------- START NEW QUOTE SCHEMA --------------------

export type TServiceType =
  | "tree_removal"
  | "landscaping"
  | "roofing"
  | "gutter";
export interface IServiceTypeOptions extends IOptionType {
  value: TServiceType;
}

export const serviceTypeOptions: IServiceTypeOptions[] = [
  {
    id: 1,
    value: "tree_removal",
    label: "Tree Removal",
  },
  {
    id: 2,
    value: "landscaping",
    label: "Landscaping",
  },
  {
    id: 3,
    value: "roofing",
    label: "Roofing",
  },
  {
    id: 4,
    value: "gutter",
    label: "Gutter Cleaning",
  },
];

export type TPropertyType = "home" | "business";
export interface IPropertyTypeOptions extends IOptionType {
  value: TPropertyType;
}

export const propertyTypeOptions: IPropertyTypeOptions[] = [
  {
    id: 1,
    value: "home",
    label: "Home",
  },
  {
    id: 2,
    value: "business",
    label: "Business",
  },
];

export const AddQuoteFirstPageSchema = z.object({
  serviceType: z
    .enum(["tree_removal", "landscaping", "roofing", "gutter"])
    .refine((val) => val !== undefined, {
      message: "Please select service type",
    }),

  location: z.object({
    address: z.string().min(1, "Address is required"),
    zipCode: z
      .string()
      .min(1, "Zip code is required")
      .refine((value) => allZipCodes.includes(value), {
        message:
          "We are sorry but we are currently not offering services in your area.",
      }),
  }),
  propertyType: z.string().min(1, "Please select service type"),
});

export type TAddQuoteFirstPageSchema = z.infer<typeof AddQuoteFirstPageSchema>;

// -------------------- END NEW QUOTE SCHEMA --------------------

// -------------------- START LAST PAGE QUES  --------------------

export const NewQuoteAdditionalCommentSchema = z.object({
  additionalComment: z
    .string()
    .max(150, "Additional comment must be at most 150 characters")
    .nullable()
    .optional(), // allows both `null` and `undefined`

  title: z
    .string()
    .max(30, "Title should not exceed more than 30 character")
    .refine((val) => val !== null && val !== "", {
      message: "Title is required",
    })
    .nullable(),
});

export type TNewQuoteAdditionalCommentSchema = z.infer<
  typeof NewQuoteAdditionalCommentSchema
>;
