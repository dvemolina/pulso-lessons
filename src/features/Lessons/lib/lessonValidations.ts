import { z } from 'zod';

export const lessonBasicsSchema = z.object({
    userId: z.number(),
    isBaseLesson: z.boolean(),
    title: z.string().nonempty('Añade Título del Servicio'),
    description: z.string().nonempty('Añade una Descripción del Servicio'),
    resortId: z.number().min(1, 'Selecciona Centro'),
    sports: z.number().array().min(1, 'Selecciona Deporte'),
    timeUnit: z.string().nonempty('Selecciona Tipo de Unidad de Tiempo').default("hour"),
    minTimeUnit: z.number().min(1, 'Selecciona Cantidad de Tiempo Mínima').default(1),
    maxTimeUnit: z.number().optional().nullable().default(6),
    minStudents: z.number().min(1, 'Selecciona Cantidad de Alumnos Mínima').default(1),
    maxStudents: z.number().optional().nullable().default(6),
    minSkillId: z.number().min(1, 'Selecciona Nivel de Habilidad Mínimo'),
    maxSkillId: z.number().optional().nullable(),
    minAgeGroupId: z.number().min(1, 'Selecciona Edad del Alumno Mínima'),
    maxAgeGroupId: z.number().optional().nullable(),
    pricingModeId: z.number().min(1, 'Selecciona el Modo de Precio').default(2),
    currencyId: z.number().min(1, 'Selecciona Divisa').default(2),
    basePrice: z.number().min(1, 'Añade Precio del Servicio').default(50),
})

export type LessonBasicsData = z.infer<typeof lessonBasicsSchema>