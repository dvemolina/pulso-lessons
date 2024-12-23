import { z } from 'zod'

export const weekDays = [
    {value: 1, label: 'Lunes'}, 
    {value: 2, label: 'Martes'}, 
    {value: 3, label: 'Miércoles'}, 
    {value: 4, label: 'Jueves'}, 
    {value: 5, label: 'Viernes'}, 
    {value: 6, label: 'Sábado'},
    {value: 0, label: 'Domingo'}
];

export const availabilitySchema = z.object({
    season_start: z.string().nonempty('Selecciona fecha comienzo de tu temporada'),
    season_end: z.string().nonempty('Selecciona fecha finalización de tu temporada'),
    day_start: z.string().nonempty('Selecciona el inicio de tu jornada'),
    day_end: z.string().nonempty('Selecciona el final de tu jornada'),
    week_days: z.number().array().min(1).max(7).nonempty('Selecciona a que días aplicar tu horario'),
}).refine(
    (data) => new Date(data.season_end) > new Date(data.season_start),
    {
      path: ['season_end'],
      message: 'La fecha de finalización debe ser mayor a la de inicio.',
    }
  )
  .refine(
    (data) => data.day_end > data.day_start,
    {
      path: ['day_end'],
      message: 'El horario de finalización debe ser mayor al de inicio.',
    }
  )