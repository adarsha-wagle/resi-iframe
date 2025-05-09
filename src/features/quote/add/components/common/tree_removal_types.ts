import { z } from "zod";

import stumpIconGreen from "src/assets/icons/stump_icon_green.png";
import treeLeafGreenIcon from "src/assets/icons/tree_leaf_icon_green.png";
import plantPotGreenIcon from "src/assets/icons/plant_pot_icon_green.png";

import { type IOptionType } from "./add_quote_types.ts";

// -------------------- START TREE QUES ONE  --------------------

export const treeCountOptions = [
  { id: 1, value: "1", label: "1" },
  {
    id: 2,
    value: "2",
    label: "2",
  },
  {
    id: 3,
    value: "3",
    label: "3",
  },
  {
    id: 5,
    value: "5",
    label: "5+",
  },
];

export type TTreeRemovalService =
  | "tree_removal"
  | "stump_removal"
  | "crown_cleaning_or_pruning";

export type TTreeRemovalServiceOptions = {
  id: number;
  label: string;
  value: TTreeRemovalService;
  icon: string;
};

export const treeRemovalServiceOptions: TTreeRemovalServiceOptions[] = [
  {
    id: 1,
    label: "Tree Removal",
    value: "tree_removal",
    icon: treeLeafGreenIcon,
  },
  {
    id: 2,
    label: "Stump Removal",
    value: "stump_removal",
    icon: stumpIconGreen,
  },
  {
    id: 3,
    label: "Crown Cleaning or Pruning",
    value: "crown_cleaning_or_pruning",
    icon: plantPotGreenIcon,
  },
];

export const TreeRemovalQuesOneSchema = z.object({
  serviceNeeded: z
    .string({
      required_error: "Service needed is required",
    })
    .nullable()
    .refine((val) => val !== null && val !== "", {
      message: "Service needed is required",
    }),
  treeCount: z
    .string({
      required_error: "Tree count is required",
    })
    .min(1, "Tree count is required"),
});

export type TTreeRemovalQuesOneSchema = z.infer<
  typeof TreeRemovalQuesOneSchema
>;

// -------------------- END TREE QUES ONE  --------------------

// -------------------- START TREE QUES TWO  --------------------

type TRadioOption = "true" | "false";

interface IRadioOption extends IOptionType {
  value: TRadioOption;
}

export const radioOptions: IRadioOption[] = [
  {
    id: 1,
    label: "Yes",
    value: "true",
  },
  {
    id: 2,
    label: "No",
    value: "false",
  },
];
export const removeWoodChipsOptions: IRadioOption[] = [
  {
    id: 1,
    label: "Removed",
    value: "true",
  },
  {
    id: 2,
    label: "Leave on site",
    value: "false",
  },
];

interface ITreeLocationArea extends IOptionType {
  value: "front" | "back";
}
export const treeLocationAreaOptions: ITreeLocationArea[] = [
  {
    id: 1,
    label: "Front",
    value: "front",
  },
  {
    id: 2,
    label: "Back",
    value: "back",
  },
];

export const TreeRemovalQuesTwoSchema = z.object({
  treeDetails: z.array(
    z.object({
      hasPowerLinesNearby: z
        .boolean({
          required_error: "Missing Field",
        })
        .nullable(),
      removeWoodChips: z
        .boolean({
          required_error: "Missing Field",
        })
        .nullable(),
      hasObstructions: z
        .boolean({
          required_error: "Missing Field",
        })
        .nullable(),
      stumpGround: z.boolean().nullable().optional(),
      treeImages: z.any().nullable().optional(),
      treeLocation: z.object({
        locationArea: z
          .string({
            required_error: "Tree Location is required",
          })
          .refine((val) => ["front", "back", ""].includes(val), {
            message: "Tree Location is required",
          }),
        coordinates: z.object({
          latitude: z.number().nullable(),
          longitude: z.number().nullable(),
        }),
      }),
    })
  ),
});

export type TTreeRemovalQuesTwoSchema = z.infer<
  typeof TreeRemovalQuesTwoSchema
>;
