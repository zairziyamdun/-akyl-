import { z } from "zod";

export const createHouseSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  address: z.string().trim().optional().nullable(),
  city: z.string().trim().optional().nullable(),
  description: z.string().trim().optional().nullable(),
  status: z.string().trim().optional().nullable(),
});

export const updateHouseSchema = createHouseSchema.partial();

export type CreateHouseBody = z.infer<typeof createHouseSchema>;
export type UpdateHouseBody = z.infer<typeof updateHouseSchema>;
