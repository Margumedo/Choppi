'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            try {
                // Decode JWT to get user info
                const payload = JSON.parse(atob(token.split('.')[1]));

                // Store in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(payload));

                // Trigger storage event for useAuth hook
                window.dispatchEvent(new Event('storage'));

                toast.success('¡Bienvenido!', {
                    description: `Hola ${payload.name || payload.email}, has iniciado sesión con Google.`,
                });

                // Navigate to stores
                router.push('/stores');
            } catch (error) {
                console.error('Error processing token:', error);
                toast.error('Error al procesar la autenticación');
                router.push('/login');
            }
        } else {
            toast.error('Error en autenticación', {
                description: 'No se recibió el token de Google',
            });
            router.push('/login');
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary via-primary/80 to-primary/60 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white text-lg font-medium">Iniciando sesión con Google...</p>
            </div>
        </div>
    );
}
