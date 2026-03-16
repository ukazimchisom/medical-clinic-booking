import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(2, "Doctor name is required"),
  specialty: z.string().min(2, "Specialty is required"),
  photo: z.string().url("Photo must be a valid URL").optional(),
});

export type DoctorFormData = z.infer<typeof doctorSchema>;
