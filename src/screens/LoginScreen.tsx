import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/helpers';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try{
        setIsLoading(true);
        await login();
    }finally{
        setIsLoading(false);
    }
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                         rounded-full bg-[var(--color-primary-subtle)]
                         blur-[100px] opacity-30"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-md animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className={cn(
              'inline-flex items-center justify-center mb-6',
              'w-20 h-20 rounded-2xl',
              'border-2 border-[var(--color-primary)]',
              'bg-[var(--color-primary-subtle)]',
              'animate-pulseGlow'
            )}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-mono font-bold tracking-wide">
            Lista de Fallas
          </h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">
            Sistema de Diagnostico Profesional
          </p>
        </div>

        {/* Login card */}
        <Card variant="glow" padding="lg" className="animate-hudAppear">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-lg font-mono text-[var(--text-primary)]">
                Acceso al Sistema
              </h2>
              <p className="text-[var(--text-muted)] text-sm mt-1">
                Autenticate con tu cuenta de Google
              </p>
            </div>

            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={handleGoogleLogin}
              loading={isLoading}
              icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.27H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.73l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.27l3.66 2.84c.87-2.6 3.3-4.73 6.16-4.73z"
                  />
                </svg>
              }
            >
              Acceder con Google
            </Button>
          </div>
        </Card>

        {/* Footer info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-[var(--text-tertiary)]">
            Powered by Novacell Repairs & Grow Educativa | By Lucas M. Tuillier
          </p>
        </div>
      </div>
    </div>
  );
};

// Password verification screen (2FA)
interface PasswordVerificationProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PasswordVerification: React.FC<PasswordVerificationProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { verifySecondFactor, logout } = useAuth();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Ingresa la contraseña');
      return;
    }

    setIsLoading(true);
    setError('');

    const isValid = await verifySecondFactor(password);

    if (isValid) {
      onSuccess();
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
      // Countdown de 5 segundos antes de redirigir
      setCountdown(5);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            logout();
            window.location.href = 'https://www.google.com';
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                         rounded-full bg-[var(--color-primary-subtle)]
                         blur-[100px] opacity-20"
        />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fadeInUp">
        {/* Icon */}
        <div className="text-center mb-8">
          <div
            className={cn(
              'inline-flex items-center justify-center mb-4',
              'w-16 h-16 rounded-xl',
              'border-2 border-[var(--color-primary)]',
              'bg-[var(--color-primary-subtle)]',
              countdown !== null && 'border-[var(--color-error)] bg-[rgba(255,68,68,0.1)]'
            )}
          >
            {countdown !== null ? (
              <AlertCircle size={32} className="text-[var(--color-error)]" />
            ) : (
              <Shield size={32} className="text-[var(--color-primary)]" />
            )}
          </div>
          <h1 className="text-2xl font-mono font-bold tracking-wide">
            Verificacion de Seguridad
          </h1>
          <p className="text-[var(--text-muted)] mt-2 text-sm">
            Ingresa tu contrasena de acceso
          </p>
        </div>

        {/* Form card */}
        <Card variant="glow" padding="lg" className="animate-hudAppear">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="password"
              label="Contrasena de Acceso"
              placeholder="Ingresa la contrasena"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              error={error}
              disabled={countdown !== null}
              fullWidth
              autoFocus
            />

            {countdown !== null && (
              <div
                className={cn(
                  'p-4 rounded-lg',
                  'bg-[rgba(255,68,68,0.1)]',
                  'border border-[var(--color-error)]',
                  'text-[var(--color-error)] text-center font-mono text-sm',
                  'animate-shake'
                )}
              >
                <AlertCircle className="inline-block mr-2" size={18} />
                Redirigiendo en {countdown} segundos...
              </div>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={onCancel}
                disabled={isLoading || countdown !== null}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isLoading}
                disabled={countdown !== null}
                className="flex-1"
              >
                Entrar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};