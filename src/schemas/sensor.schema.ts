import { z } from "zod";

export const sensorSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  value: z.string(),
  createdAt: z.any()
});

export const Datas = z.object({
  value: z.string(),
  createdAt: z.any()
})

export const sensorDTO = z.object({
  id: z.string(),
  name: z.string().max(50),
  allValues: Datas
})

export const sensorsSchema = z.object({
  dadosChuva: z.array(sensorDTO),
  dadosTemperatura:z.array(sensorDTO),
  dadosPPM: z.array(sensorDTO),
  dadosPressaoAbsoluta: z.array(sensorDTO),
  dadosPressaoRelativa: z.array(sensorDTO),
  dadosUmidade: z.array(sensorDTO),
})

export const sensorResponseSchema = sensorSchema.omit({id: true})

export const sensorRequestSchema = sensorSchema.omit({id: true, createdAt: true})

export const sensorsResponseSchema = sensorResponseSchema.array()
