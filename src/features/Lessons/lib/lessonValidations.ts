import { z } from 'zod';

export const lessonBasicsSchema = z.object({
    title: z.string().nonempty('Añade Título del Servicio'),
    description: z.string().nonempty('Añade una Descripción del Servicio'),
    resortId: z.number().min(1, 'Selecciona Centro'),
    sports: z.number().array().min(1, 'Selecciona Deporte'),
    timeUnit: z.string().nonempty('Selecciona Tipo de Unidad de Tiempo'),
    minTimeUnit: z.number().min(1, 'Selecciona Cantidad de Tiempo Mínima'),
    maxTimeUnit: z.number().optional().nullable(),
    minStudents: z.number().min(1, 'Selecciona Cantidad de Alumnos Mínima'),
    maxStudents: z.number().optional().nullable(),
    minSkillId: z.number().min(1, 'Selecciona Nivel de Habilidad Mínimo'),
    maxSkillId: z.number().optional().nullable(),
    minAgeGroupId: z.number().min(1, 'Selecciona Edad del Alumno Mínima'),
    maxAgeGroupId: z.number().optional().nullable(),
    pricingMultiplierId: z.string().min(1, 'Selecciona Multiplicador del Precio'),
    currencyId: z.number().min(1, 'Selecciona Divisa'),
    basePrice: z.number().min(1, 'Añade Precio del Servicio'),
})

export type LessonBasicsData = z.infer<typeof lessonBasicsSchema>