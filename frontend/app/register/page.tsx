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

export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Assuming backend has a register endpoint or we use users service
            // If no direct register endpoint, we might need to create one or use users create
            // For now, I'll assume /users (POST) is open or I need to check backend
            await api.post('/auth/register', { name, email, password });
            toast.success('¡Cuenta creada!', {
                description: 'Ahora puedes iniciar sesión.',
            });
            router.push('/login');
        } catch (err) {
            toast.error('Error al registrarse', {
                description: 'Hubo un problema al crear tu cuenta. Intenta de nuevo.',
            });
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
                    <form onSubmit={handleRegister} className="space-y-4">
                        <CustomInput
                            type="text"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            icon={<User size={18} />}
                            required
                        />

                        <CustomInput
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={<Mail size={18} />}
                            required
                        />

                        <div className="relative">
                            <CustomInput
                                type={showPassword ? "text" : "password"}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={18} />}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
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
