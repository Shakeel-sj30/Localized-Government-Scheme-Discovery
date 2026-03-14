import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required to be at least 2 characters"),
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
  district: z.string().optional(),
  category: z.enum(["General", "SC", "ST", "OBC", "Minority", "All"]),
  digilockerVerified: z.boolean().optional(),
  digilockerVerifiedAt: z.string().optional(),
  digilockerReferenceId: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
