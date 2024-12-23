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
    seasonStart: z.string().nonempty('Selecciona fecha comienzo de tu temporada'),
    seasonEnd: z.string().nonempty('Selecciona fecha finalización de tu temporada'),
    dayStart: z.string().nonempty('Selecciona el inicio de tu jornada'),
    dayEnd: z.string().nonempty('Selecciona el final de tu jornada'),
    weekDays: z.array(z.number()).min(1).max(7).nonempty('Selecciona a que días aplicar tu horario'),
}).refine(
    (data) => new Date(data.seasonEnd) > new Date(data.seasonStart),
    {
      path: ['season_end'],
      message: 'La fecha de finalización debe ser mayor a la de inicio.',
    }
  )
  .refine(
    (data) => data.dayEnd > data.dayStart,
    {
      path: ['day_end'],
      message: 'El horario de finalización debe ser mayor al de inicio.',
    }
  )