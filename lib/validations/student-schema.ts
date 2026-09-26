import { z } from "zod";

export const studentSchema = z.object({
    admissionNumber: z
        .string()
        .min(1, "Admission number is required"),

    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .string()
        .email("Enter a valid email")
        .optional()
        .or(z.literal("")),

    phone: z
        .string()
        .regex(
            /^[0-9]{10}$/,
            "Phone number must be 10 digits",
        )
        .optional()
        .or(z.literal("")),

    className: z
        .string()
        .min(1, "Class is required"),

    section: z
        .string()
        .optional(),

    address: z
        .string()
        .optional(),
});

export type StudentFormValues =
    z.infer<typeof studentSchema>;