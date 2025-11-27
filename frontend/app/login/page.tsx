"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CustomButton } from "@/components/custom-button"
import { CustomInput } from "@/components/custom-input"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import api from "@/lib/api"
import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await api.post('/auth/login', { email, password });

      // Store token and user info
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Force a storage event for hooks to pick up changes immediately if needed
      window.dispatchEvent(new Event("storage"));

      toast.success('¡Bienvenido de nuevo!', {
        description: `Hola ${response.data.user.name}, has iniciado sesión correctamente.`,
      });
      router.push('/stores');
    } catch (err) {
      toast.error('Error de autenticación', {
        description: 'Credenciales inválidas. Por favor intenta de nuevo.',
      });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Visual (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <Image
          src="/images/carousel/choppi-bags.jpg"
          alt="Choppi Lifestyle"
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
          <h2 className="text-4xl font-bold mb-4 leading-tight">Tus compras frescas,<br/>directo a tu puerta.</h2>
          <p className="text-white/80 text-lg">Únete a miles de usuarios que ya disfrutan de la experiencia Choppi.</p>
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
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Bienvenido de nuevo</h1>
            <p className="text-muted-foreground text-lg">Ingresa tus datos para continuar comprando.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
                <CustomInput
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={20} />}
                required
                className="h-14 bg-muted/30 border-border focus:bg-background transition-all"
                />

                <div className="relative">
                <CustomInput
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock size={20} />}
                    required
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
            </div>

            <div className="flex items-center justify-end">
              <Link href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <CustomButton type="submit" size="xl" isLoading={isLoading} className="w-full text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200">
              Iniciar Sesión <ArrowRight className="ml-2 h-5 w-5" />
            </CustomButton>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-medium">O continúa con</span>
            </div>
          </div>

          <button
            onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
            className="w-full h-14 border border-input bg-background hover:bg-muted/50 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200 group"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors">Google</span>
          </button>

          <p className="text-center text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
              Regístrate gratis
            </Link>
          </p>
          
           <div className="text-center mt-8">
            <Link href="/stores" className="text-sm text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5">
                Continuar como invitado
            </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
