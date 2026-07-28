/**
 * LAYOUT.TSX - COMPONENTES DE ESTRUCTURA VISUAL
 * ============================================
 *
 * Este archivo contiene componentes que definen la estructura de la app:
 * - Header: Barra superior con logo, tema, y usuario
 * - Footer: Barra inferior con creditos y logo
 * - HomeButton: Boton flotante para volver al inicio
 *
 * POR QUE IMPORTA EL LAYOUT?
 * -------------------------
 * El Layout define donde va cada cosa. Sin un layout consistente:
 * - El header apareceria en diferentes posiciones
 * - El footer tendria diferentes estilos
 * - La navegacion seria confusa
 *
 * COMPONENTES EN ESTE ARCHIVO:
 * --------------------------
 * 1. Header - Barra superior fija
 * 2. FooterLogo - Logo del footer (con modo oscuro/claro)
 * 3. Footer - Barra inferior
 * 4. HomeButton - Boton flotante de home
 */

import React from 'react';
import { LogOut, User, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './Button';
import { cn } from '../utils/helpers';

/**
 * COMPONENTE: Header
 * ===================
 *
 * Barra superior fija que aparece en todas las pantallas.
 *
 * CONTIENE:
 * --------
 * - Logo/Brand (NOVACELL)
 * - Boton de cambiar tema (sol/luna)
 * - Info del usuario (si esta logueado)
 * - Boton de logout (si esta logueado)
 *
 * PROPS:
 * -----
 * - showLogout: Si mostrar boton de cerrar sesion (default: true)
 */
interface HeaderProps {
  showLogout?: boolean;
}


export const Header: React.FC<HeaderProps> = ({ showLogout = true }) => {
  // Obtener usuario y funcion logout del Context de autenticacion
  const { user, logout } = useAuth();

  // Obtener tema actual y funcion para cambiarlo
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      {/* CONTENEDOR CON EFECTO BLUR */}
      <div
        className={cn(
          'max-w-4xl mx-auto flex items-center justify-between',
          'bg-[var(--bg-surface)]/80 backdrop-blur-md',
          'border border-[var(--border-color)]',
          'rounded-xl px-4 py-2',
          'shadow-lg shadow-[rgba(0,0,0,0.3)]'
        )}
      >
        {/* BRAND / LOGO */}
        <div className="flex items-center gap-3">
          {/* Icono animado con efecto de brillo */}
          <div
            className={cn(
              'w-8 h-8 flex items-center justify-center',
              'border border-[var(--border-color)] rounded-lg',
              'text-[var(--color-primary)]',
              'animate-pulseGlow'
            )}
          >
            <div className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
          </div>

          {/* Nombre de la marca (oculto en movil) */}
          <span className="font-mono text-sm text-[var(--text-secondary)]">
            Lista de Fallas - By Novacellrepairs & Grow Educativa
          </span>
        </div>

        {/* LADO DERECHO: Tema + Usuario */}
        <div className="flex items-center gap-2">
          {/* BOTON DE CAMBIAR TEMA */}
          <button
            onClick={toggleTheme}
            className={cn(
              'p-2 rounded-lg',
              'text-[var(--text-secondary)]',
              'hover:text-[var(--color-primary)]',
              'hover:bg-[var(--color-primary-subtle)]',
              'transition-all duration-200',
              'border border-transparent hover:border-[var(--border-color)]'
            )}
            aria-label="Cambiar tema"
          >
            {/* Icono segun tema actual */}
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* INFO DE USUARIO (si esta logueado y showLogout=true) */}
          {user && showLogout && (
            <div className="flex items-center gap-2">
              {/* Email del usuario (oculto en movil) */}
              <div
                className={cn(
                  'hidden sm:flex items-center gap-2 px-3 py-1.5',
                  'rounded-lg bg-[var(--color-primary-subtle)]',
                  'text-[var(--color-primary)] font-mono text-xs'
                )}
              >
                <User size={14} />
                {/* Trunca el email si es muy largo */}
                <span className="max-w-[150px] truncate">{user.email}</span>
              </div>

              {/* BOTON LOGOUT */}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                icon={<LogOut size={16} />}
                className="text-[var(--text-secondary)] hover:text-[var(--color-error)]"
              >
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

/**
 * COMPONENTE: Footer
 * ===================
 *
 * Barra inferior con creditos y logo.
 *
 * ESTRUCTURA:
 * ----------
 * - Izquierda: "Powered by Novacell Repairs" + "Developed by Lucas M. Tuillier"
 * - Derecha: Logo personalizable
 */
export const Footer: React.FC = () => {

  const { theme } = useTheme();

  return (
    <footer
      className={cn(
        'w-full py-8 mt-8',
        'border-t border-[var(--border-color)]'
      )}
    >
      <div className="max-w-4xl mx-auto px-4">
        {/* FLEX: Texto a la izquierda, Logo a la derecha */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
          {/* TEXTO IZQUIERDA */}
          <div className="flex flex-col items-center sm:items-start gap-1 text-center sm:text-left">
            <span className="font-mono text-sm text-[var(--text-muted)]">
              Powered by Novacell Repairs & Grow Educativa
            </span>
            <p className="text-xs text-[var(--text-tertiary)]">
              By Lucas M. Tuillier
            </p>
          </div>

          {/* LOGO DERECHA */}
           <div className="flex-shrink-0">
            <img
              src={
                theme === 'light'
                  ? '/public/footer-logo-light.png'
                  : '/public/footer-logo-dark.png'
              }
              alt="Grow Educativa"
              className="h-20 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * COMPONENTE: HomeButton
 * ======================
 *
 * Boton flotante que aparece en esquinas de pantalla.
 * Permite volver al inicio con un solo clic.
 *
 * POSICION: Esquina inferior derecha (bottom-6 right-6)
 *
 * PROPS:
 * -----
 * - onClick: Funcion a ejecutar al hacer clic
 * - visible: Si mostrar el boton (default: true)
 */
interface HomeButtonProps {
  onClick: () => void;
  visible?: boolean;
}

export const HomeButton: React.FC<HomeButtonProps> = ({
  onClick,
  visible = true,
}) => {
  // Si no debe ser visible, no renderizar nada
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        'fixed bottom-6 right-6 z-50',
        'w-14 h-14 rounded-xl',
        'flex items-center justify-center',
        'bg-[var(--bg-elevated)]',
        'border-2 border-[var(--border-color)]',
        'text-[var(--color-primary)]',
        'shadow-lg shadow-[rgba(0,0,0,0.4)]',
        'transition-all duration-300',
        'hover:border-[var(--color-primary)]',
        'hover:shadow-[var(--shadow-glow)]',
        'active:scale-95'
      )}
      aria-label="Volver al inicio"
    >
      {/* Icono SVG de casa */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    </button>
  );
};
