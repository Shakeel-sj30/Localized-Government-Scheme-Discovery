import { z } from "zod";

export const eligibilitySchema = z.object({
  age: z
    .string()
    .refine((val) => {
      if (val === '') return true;
      const num = parseInt(val);
      return !isNaN(num) && num > 0 && num < 120;
    }, "Please enter a valid age")
    .optional()
    .or(z.literal('')),
  gender: z.enum(["Male", "Female", "Other", "All"]),
  occupation: z.string(),
  income: z
    .string()
    .refine((val) => {
      if (val === '') return true;
      const num = parseInt(val);
      return !isNaN(num) && num >= 0;
    }, "Income must be a valid positive number")
    .optional()
    .or(z.literal('')),
  state: z.string(),
  category: z.enum(["General", "SC", "ST", "OBC", "Minority", "All"]),
});

export type EligibilityFormData = z.infer<typeof eligibilitySchema>;
