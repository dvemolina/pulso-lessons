import { z } from 'zod'

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = [".pdf"];

export const userSignupSchema = z.object({
    name: z.string().nonempty('Introduce Nombre '),
    surname: z.string().nonempty('Introduce Apellido'),
    email: z.string().nonempty('Introduce un Email').email('Email inválido'),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm_password: z.string().min(8, "Mínimo 8 caracteres"),
    country_code: z.string().optional(),
    phone: z.number().optional().transform((phone)=> phone?.toString())
}).refine((data) => data.password == data.confirm_password, {
    message: "Contraseñas no coinciden",
    path: ["confirm_password"]
}).refine((data) => data.phone !== null || data.country_code !== null, {
    message: "Introduce Código y Teléfono",
    path: ["phone"]
})

export const instructorSignupSchema = z.object({
    name: z.string().nonempty('Introduce Nombre '),
    surname: z.string().nonempty('Introduce Apellido'),
    email: z.string().nonempty('Introduce un Email').email('Email inválido'),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm_password: z.string().min(8, "Mínimo 8 caracteres"),
    country_code: z.string().optional(),
    phone: z.number().optional().transform((phone)=> phone?.toString()),
    qualification_document: z
    .any()
    .refine((files) => files?.length === 0, "Tu titulación es obligatoria") // if no file files?.length === 0, if file files?.length === 1
    .refine((files) => files?.[0]?.size >= MAX_FILE_SIZE, `Tamaño máximo del pdf: 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Solo aceptamos documentos en formato .pdf"
    ),
}).refine((data) => data.password == data.confirm_password, {
    message: "Contraseñas no coinciden",
    path: ["confirm_password"]
}).refine((data) => data.phone !== null || data.country_code !== null, {
    message: "Introduce Código y Teléfono",
    path: ["phone"]
})

export type UserSignup = z.infer<typeof userSignupSchema>
export type InstructorSignup = z.infer<typeof instructorSignupSchema>