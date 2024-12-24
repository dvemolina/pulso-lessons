import { z } from 'zod'

export const userSignupSchema = z.object({
    name: z.string().nonempty('Introduce Nombre').regex(/^[^0-9]*$/, {
        message: "No se aceptan números",
      }),
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
});

export const userLoginSchema = z.object({
    email: z.string().nonempty('Introduce un Email').email('Email inválido'),
    password: z.string().min(8, "Mínimo 8 caracteres")
});

export const userProfileSchema = z.object({
    name: z.string().nonempty('Introduce Nombre').regex(/^[^0-9]*$/, {
        message: "No se aceptan números",
      }),
    surname: z.string().nonempty('Introduce Apellido').regex(/^[^0-9]*$/, {
        message: "No se aceptan números",
      }),
    email: z.string().nonempty('Introduce un Email').email('Email inválido'),
    country_code: z.string().optional().default('+34'),
    phone_number: z.number().optional(),
    profileImage: z.string().optional(),
    nationality: z.number().optional().nullable(),
    age: z.number().min(0, 'Eres Benjamin Button?').max(99, "No mientas, aún eres joven").optional().nullable(),
    resortId: z.number(),
    sports: z.array(z.number())
}).refine((data) => data.phone_number !== null || data.country_code !== null, {
    message: "Introduce Código y Teléfono",
    path: ["phone"]
});;

export type UserSignup = z.infer<typeof userSignupSchema>
export type UserProfile = z.infer<typeof userProfileSchema>