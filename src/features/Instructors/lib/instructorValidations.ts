import { z } from 'zod'

export const availabilitySchema = z.object({
    season_start: z.string().min(1, 'Introduce fecha Inicio Temporada'),
    season_end: z.string().min(1, 'Introduce fecha Finalización Temporada'),
    week_days: z.string().array(),
    day_start: z.string().min(1, 'Selecciona Hora Inicio Jornada'),
    day_end: z.string().min(1, 'Selecciona Hora final Jornada')
})
