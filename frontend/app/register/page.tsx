"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react"
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
            const response = await api.post('/auth/register', data)

            // Store token and user info
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            window.dispatchEvent(new Event("storage"));

            toast.success('¡Cuenta creada!', {
                description: `Bienvenido ${response.data.user.name}, ya puedes empezar a comprar.`,
            })
            router.push('/stores')
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
        <div className="min-h-screen flex bg-background">
            {/* Left Side - Visual (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black">
                <Image
                    src="/images/carousel/branded-delivery.jpg"
                    alt="Choppi Delivery"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40" />

                {/* Logo on Image */}
                <div className="absolute top-8 left-8 flex items-center gap-3">
                    <div className="relative w-10 h-10">
                        <Image src="/images/logo-icon.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="text-white font-bold text-2xl tracking-tight">Choppi</span>
                </div>

                <div className="absolute bottom-12 left-12 max-w-md text-white p-4">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Únete a la<br />revolución del mercado.</h2>
                    <p className="text-white/80 text-lg">Crea tu cuenta y recibe tus compras en minutos, estés donde estés.</p>
                </div>
            </div>

            {/* Right Side - Functional */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-background">
                <div className="w-full max-w-md space-y-8 animate-in slide-in-from-bottom-5 fade-in duration-500">
                    
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
                            <Image src="/images/logo-icon.png" alt="Logo" width={48} height={48} className="object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-primary">Choppi</h1>
                    </div>

                    <div className="text-center lg:text-left space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Crea tu cuenta</h1>
                        <p className="text-muted-foreground text-lg">Completa tus datos para comenzar.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <CustomInput
                                    type="text"
                                    placeholder="Nombre completo"
                                    icon={<User size={20} />}
                                    {...register("name")}
                                    className="h-14 bg-muted/30 border-border focus:bg-background transition-all"
                                />
                                {errors.name && <p className="text-sm text-destructive ml-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <CustomInput
                                    type="email"
                                    placeholder="Correo electrónico"
                                    icon={<Mail size={20} />}
                                    {...register("email")}
                                    className="h-14 bg-muted/30 border-border focus:bg-background transition-all"
                                />
                                {errors.email && <p className="text-sm text-destructive ml-1">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <CustomInput
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Crea una contraseña"
                                        icon={<Lock size={20} />}
                                        {...register("password")}
                                        className="h-14 bg-muted/30 border-border focus:bg-background transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive ml-1">{errors.password.message}</p>}
                                <ul className="text-xs text-muted-foreground list-disc list-inside ml-1 mt-2 space-y-1 pl-2">
                                    <li>Mínimo 8 caracteres</li>
                                    <li>Al menos una mayúscula</li>
                                    <li>Al menos una minúscula</li>
                                    <li>Al menos un número o carácter especial</li>
                                </ul>
                            </div>
                        </div>

                        <CustomButton type="submit" size="xl" isLoading={isLoading} className="w-full text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
                            Registrarse <ArrowRight className="ml-2 h-5 w-5" />
                        </CustomButton>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                             <span className="bg-background px-2 text-muted-foreground font-medium">O</span>
                        </div>
                    </div>

                    <p className="text-center text-muted-foreground">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
