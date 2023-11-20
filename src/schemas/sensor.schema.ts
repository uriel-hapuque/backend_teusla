import { z } from "zod";

export const sensorSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  value: z.number(),
  createdAt: z.date()
});

export const sensorResponseSchema = sensorSchema.omit({id: true})

export const sensorRequestSchema = sensorSchema.omit({id: true, createdAt: true})

export const sensorsResponseSchema = sensorResponseSchema.array()
