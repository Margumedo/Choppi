"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react"
import api from "@/lib/api"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const registerSchema = z.object({
        name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
        email: z.string().email("Correo electrónico inválido"),
        password: z
            .string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
            .regex(/[a-z]/, "Debe contener al menos una minúscula")
            .regex(/[0-9!@#$%^&*]/, "Debe contener al menos un número o carácter especial"),
    })

    type RegisterFormValues = z.infer<typeof registerSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true)
        try {
            await api.post('/auth/register', data)
            toast.success('¡Cuenta creada!', {
                description: 'Ahora puedes iniciar sesión.',
            })
            router.push('/login')
        } catch (err: any) {
            const message = err.response?.data?.message || 'Hubo un problema al crear tu cuenta.'
            toast.error('Error al registrarse', {
                description: Array.isArray(message) ? message[0] : message,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary via-primary/80 to-primary/60 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold text-primary-foreground mb-2">Choppi</h1>
                    <p className="text-primary-foreground/80">Únete a la comunidad</p>
                </div>

                {/* Form Card */}
                <div className="bg-card rounded-3xl p-8 space-y-6 shadow-lg">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <CustomInput
                                type="text"
                                placeholder="Nombre completo"
                                icon={<User size={18} />}
                                {...register("name")}
                            />
                            {errors.name && <p className="text-sm text-destructive ml-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <CustomInput
                                type="email"
                                placeholder="Correo electrónico"
                                icon={<Mail size={18} />}
                                {...register("email")}
                            />
                            {errors.email && <p className="text-sm text-destructive ml-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <CustomInput
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Contraseña"
                                    icon={<Lock size={18} />}
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-destructive ml-1">{errors.password.message}</p>}
                        </div>

                        <CustomButton type="submit" size="xl" isLoading={isLoading}>
                            Registrarse
                        </CustomButton>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-card text-muted-foreground">O</span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-muted-foreground">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-primary font-semibold hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
