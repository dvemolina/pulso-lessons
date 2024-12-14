import { z } from 'zod'

export const userSignupSchema = z.object({
    name: z.string().nonempty('Introduce Nombre '),
    surname: z.string().nonempty('Introduce Apellido'),
    email: z.string().nonempty('Introduce un Email').email('Email inválido'),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm_password: z.string().min(8, "Mínimo 8 caracteres"),
    country_code: z.string().optional(),
    phone: z.number().optional()
}).refine((data) => data.password == data.confirm_password, {
    message: "Contraseñas no coinciden",
    path: ["confirm_password"]
}).refine((data) => data.phone !== null || data.country_code !== null, {
    message: "Introduce Código y Teléfono",
    path: ["phone"]
} ) 
