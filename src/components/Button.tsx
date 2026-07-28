/**
 * BUTTON.TSX - COMPONENTE DE BOTON REUTILIZABLE
 * =============================================
 *
 * Este archivo define un componente de boton que se puede reutilizar en toda la app.
 *
 * QUE ES UN COMPONENTE?
 * --------------------
 * Un componente es una pieza de UI (interfaz) que se puede usar muchas veces.
 * Como un "bloque de LEGO" que puedes usar en diferentes lugares.
 *
 * VENTAJAS DE USAR COMPONENTES:
 * ----------------------------
 * 1. Escribe una vez, usa donde quieras
 * 2. Si cambias el componente, cambia en todos lados
 * 3. El codigo es mas limpio y facil de mantener
 *
 * COMO USAR ESTE COMPONENTE:
 * -------------------------
 * import { Button } from '../components/Button';
 *
 * <Button variant="primary" onClick={() => alert('Hola!')}>
 *   Hacer clic
 * </Button>
 *
 * VARIANTES (estilos):
 * ------------------
 * - primary: Boton verde brillante (accion principal)
 * - secondary: Boton con borde verde (accion secundaria)
 * - ghost: Boton transparente (acciones sutiles)
 * - danger: Boton rojo (acciones peligrosas)
 *
 * TAMANOS:
 * -------
 * - sm: Pequeno
 * - md: Mediano (por defecto)
 * - lg: Grande
 *
 * PROPS ADICIONALES:
 * -----------------
 * - loading: Muestra animacion de carga
 * - disabled: Desactiva el boton
 * - icon: Agrega un icono al boton
 * - fullWidth: Ocupa todo el ancho disponible
 */

import React, { forwardRef, useRef } from 'react';
import { cn } from '../utils/helpers';

/**
 * INTERFACE: ButtonProps
 * =====================
 *
 * Define que propiedades puede recibir el boton.
 *
 * Extiende React.ButtonHTMLAttributes asi hereda todas las props
 * de un boton HTML normal (onClick, disabled, type, etc.)
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Variante visual del boton
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  // Tamano del boton
  size?: 'sm' | 'md' | 'lg';

  // Si mostrar animacion de carga
  loading?: boolean;

  // Icono a mostrar (componente React)
  icon?: React.ReactNode;

  // Donde mostrar el icono: izquierda o derecha
  iconPosition?: 'left' | 'right';

  // Si el boton debe ocupar todo el ancho
  fullWidth?: boolean;
}

/**
 * COMPONENTE: Button
 * ===================
 *
 * forwardRef permite pasar una "ref" al elemento HTML interno.
 * Esto es util si el componente padre necesita acceder al boton directamente.
 *
 * @example
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * <Button ref={buttonRef}>Mi boton</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,      // Clases CSS adicionales
      children,       // Contenido del boton (texto)
      variant = 'secondary', // Estilo del boton (default: secondary)
      size = 'md',    // Tamano del boton (default: md)
      loading = false, // Si esta cargando
      disabled,       // Si esta desactivado
      icon,           // Icono a mostrar
      iconPosition = 'left', // Posicion del icono
      fullWidth = false, // Si ocupa todo el ancho
      onClick,        // Funcion al hacer clic
      ...props         // Otras props HTML
    },
    ref
  ) => {
    // Referencia al elemento boton para el efecto ripple
    const buttonRef = useRef<HTMLButtonElement>(null);

    /**
     * ESTILOS BASE
     * ============
     * Estos estilos se aplican a TODOS los botones.
     *
     * Tailwind CSS: Framework de CSS que usa clases.
     * - px-4: padding horizontal de 4 unidades
     * - py-2: padding vertical de 2 unidades
     * - rounded-lg: bordes redondeados (large)
     * - transition-all: anima todos los cambios
     */
    const baseStyles = `
      relative overflow-hidden inline-flex items-center justify-center
      font-medium tracking-wide rounded-lg
      transition-all duration-200 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      active:scale-[0.98]
    `;

    /**
     * ESTILOS POR VARIANTE
     * ====================
     *
     * Cada variante tiene colores y efectos diferentes.
     * Usamos CSS Variables (var(--nombre)) para usar los colores
     * definidos en index.css.
     */
    const variants = {
      // PRIMARY: Boton verde brillante para acciones principales
      primary: `
        bg-[var(--color-primary)] text-[#111]
        border border-transparent
        shadow-[0_0_15px_var(--color-primary-subtle)]
        hover:shadow-[0_0_25px_ var(--color-primary-luz);]
        hover:bg-[var(--color-primary-light)]
        focus-visible:ring-[var(--color-primary)]
      `,

      // SECONDARY: Boton con borde verde para acciones secundarias
      secondary: `
        bg-transparent text-[var(--color-primary)]
        border border-[var(--border-color)]
        shadow-[0_0_8px_var(--color-primary-subtle)]
        hover:bg-[var(--color-primary-subtle)]
        hover:border-[var(--border-color-hover)]
        hover:shadow-[0_0_15px_var(--color-primary-glow)]
        focus-visible:ring-[var(--color-primary)]
      `,

      // GHOST: Boton transparente para acciones sutiles
      ghost: `
        bg-transparent text-[var(--color-primary)]
        border border-transparent
        hover:bg-[var(--color-primary-subtle)]
        focus-visible:ring-[var(--color-primary)]
      `,

      // DANGER: Boton rojo para acciones peligrosas (eliminar, cerrar)
      danger: `
        bg-transparent text-[var(--color-error)]
        border border-[rgba(255,68,68,0.25)]
        shadow-[0_0_8px_rgba(255,68,68,0.15)]
        hover:bg-[rgba(255,68,68,0.1)]
        hover:border-[rgba(255,68,68,0.5)]
        hover:shadow-[0_0_15px_rgba(255,68,68,0.3)]
        focus-visible:ring-[var(--color-error)]
      `,
    };

    /**
     * TAMANOS
     * =======
     *
     * Definen el padding y tamano de fuente segun el tamano del boton.
     */
    const sizes = {
      sm: 'px-3 py-2 text-sm gap-1.5', // Pequeno
      md: 'px-4 py-3 text-base gap-2',  // Mediano
      lg: 'px-6 py-4 text-lg gap-2.5',  // Grande
    };

    /**
     * EFECTO RIPPLE
     * =============
     *
     * Crea una onda que se expande desde donde se hizo clic.
     * Similar al efecto "Material Design" de Google.
     *
     * COMO FUNCIONA:
     * 1. Detecta posicion del clic
     * 2. Crea un elemento span circular
     * 3. Lo posiciona donde se hizo clic
     * 4. Anima su expansion (keyframes: ripple en index.css)
     * 5. Lo elimina despues de la animacion
     */
    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button || disabled || loading) return;

      // Obtener dimensiones del boton
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      // Calcular posicion del clic relativa al boton
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      // Crear elemento span para el efecto ripple
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: var(--color-primary-glow);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out forwards;
        pointer-events: none;
      `;

      // Agregar al boton y eliminar despues de la animacion
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      // Llamar al onClick original si existe
      onClick?.(e);
    };

    /**
     * RENDER
     * ======
     */
    return (
      <button
        // Manejar referencias
        ref={(node) => {
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        // Desactivar si esta loading o disabled
        disabled={disabled || loading}
        // Manejar clic con efecto ripple
        onClick={handleRipple}
        // Combinar todas las clases CSS
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        // Pasar otras props HTML
        {...props}
      >
        {/* CONTENIDO SEGUN ESTADO */}
        {loading ? (
          // CARGANDO: Mostrar spinner + texto
          <>
            <LoadingSpinner size={size} />
            <span className="ml-2 opacity-80">{children}</span>
          </>
        ) : (
          // NORMAL: Mostrar icono + texto
          <>
            {/* Icono izquierda */}
            {icon && iconPosition === 'left' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
            {/* Texto del boton */}
            {children}
            {/* Icono derecha */}
            {icon && iconPosition === 'right' && (
              <span className="flex-shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

/**
 * Nombre para DevTools (aparece en React Inspector)
 */
Button.displayName = 'Button';

/**
 * COMPONENTE: LoadingSpinner
 * ==========================
 *
 * Spinner animado que se muestra mientras el boton esta en estado "loading".
 *
 * @param size - Tamano del spinner ('sm', 'md', 'lg')
 */
const LoadingSpinner = ({ size }: { size: 'sm' | 'md' | 'lg' }) => {
  // Mapear tamano a clases CSS
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <svg
      className={cn('animate-spin', sizeMap[size])}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Circulo exterior (opacidad 25%) */}
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* Arco animado (opacidad 75%) */}
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};
