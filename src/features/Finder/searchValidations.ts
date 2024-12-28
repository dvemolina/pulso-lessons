import { z } from "zod";

export const searchSchema = z.object({
    sport: z.number().min(1, 'Selecciona un Deporte'),
    startDate: z.string().nonempty('Selecciona fecha de Inicio'),
    endDate: z.string().nonempty('Selecciona fecha final'),
    resort: z.number().min(1, 'Selecciona un Centro de Esquí'),
    persons: z.number().min(1, 'Selecciona al menos una persona').default(1),
    hasSearched: z.boolean().default(false)
}).refine(
    (data) => new Date(data.endDate) >= new Date(data.startDate),
    {
      path: ['endDate'],
      message: 'La fecha de finalización debe ser mayor a la de inicio.',
    }
)