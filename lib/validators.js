import { z } from 'zod'

export const daySchema = z.object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
}).refine((data) => {
    if (data.isAvailable) {
        return data.startTime < data.endTime;
    }
    return true;
}, {
    message: "Start time must be less than end time",
    path: ["startTime", "endTime"],
});
            
export const usernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(20)
        .regex(/^[a-zA-Z0-9]+$/, { message: 'Username can only contain letters and numbers' }),
})

export const eventSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(100, "Title cannot be longer than 100 characters"),
    description: z
        .string()
        .min(1, "Description is required")
        .max(500, "Description cannot be longer than 1000 characters"),
    duration: z
        .number()
        .int()
        .positive("Duration must be a positive integer"),
    isPrivate: z.boolean(),
});

export const availabilitySchema = z.object({
    monday: daySchema,
    tuesday: daySchema,
    wednesday: daySchema,
    thursday: daySchema,
    friday: daySchema,
    saturday: daySchema,
    sunday: daySchema,
    timeGap: z.number().min(0, "Time gap must be a positive number").int(),
})

export const bookingSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Please use YYYY-MM-DD."),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format. Please use HH:MM."),
    additionalInfo: z.string().optional(),
});
