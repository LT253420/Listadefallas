/**
 * INPUT.TSX - COMPONENTE DE CAMPO DE TEXTO
 * =======================================
 *
 * Un Input es un campo donde el usuario puede escribir texto.
 * Se usa para formularios, busquedas, contrasenas, etc.
 *
 * CARACTERISTICAS:
 * --------------
 * - Soporta diferentes tipos: text, password, email, number
 * - Muestra etiqueta (label) encima
 * - Puede mostrar error (mensaje rojo)
 * - Puede mostrar pista (hint)
 * - Iconos opcionales a izquierda o derecha
 * - Para password: boton para mostrar/ocultar
 *
 * COMO USAR:
 * ---------
 * import { Input } from '../components/Input';
 *
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="tu@email.com"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 */

import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../utils/helpers';

/**
 * INTERFACE: InputProps
 * =====================
 *
 * Define las propiedades del Input.
 * Extiende los atributos HTML de input.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Etiqueta que aparece arriba del campo
  label?: string;

  // Mensaje de error (se muestra en rojo)
  error?: string;

  // Pista/ayuda (texto pequeno abajo)
  hint?: string;

  // Icono a la izquierda del campo
  leftIcon?: React.ReactNode;

  // Icono a la derecha del campo
  rightIcon?: React.ReactNode;

  // Si ocupa todo el ancho disponible
  fullWidth?: boolean;
}

/**
 * COMPONENTE: Input
 * ==================
 *
 * forwardRef permite pasar una ref al elemento input interno.
 * Esto es util para:
 * - Hacer focus programaticamente
 * - Obtener el valor directamente
 * - Validar el campo
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,        // Clases adicionales
      label,            // Etiqueta
      error,             // Mensaje de error
      hint,              // Pista
      leftIcon,          // Icono izquierda
      rightIcon,        // Icono derecha
      fullWidth = false, // Ancho completo
      type = 'text',    // Tipo de input
      disabled,          // Si esta desactivado
      ...props           // Otras props HTML
    },
    ref
  ) => {
    /**
     * ESTADO: showPassword
     * =====================
     *
     * Controla si la contrasena es visible.
     * Solo se usa cuando type='password'.
     */
    const [showPassword, setShowPassword] = useState(false);

    // Detectar si es campo de contrasena
    const isPassword = type === 'password';

    /**
     * ESTILOS BASE
     * ============
     */
    const baseInputStyles = `
      w-full bg-transparent text-[var(--text-primary)]
      border-2 border-[var(--border-color)] rounded-lg
      font-mono text-base
      transition-all duration-200 ease-out
      placeholder:text-[var(--text-muted)]
      focus:outline-none focus:border-[var(--color-primary)]
      focus:shadow-[0_0_20px_var(--color-primary-glow)]
      focus:bg-[var(--color-primary-subtle)]
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    /**
     * PADDING
     * ========
     * Ajusta el padding segun si hay iconos.
     */
    const inputPadding = `
      py-3 px-4
      ${leftIcon ? 'pl-11' : ''}  // Mas espacio si hay icono izquierda
      ${rightIcon || isPassword ? 'pr-11' : ''} // Mas espacio si hay icono derecha
    `;

    /**
     * RENDER
     * ======
     */
    return (
      <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
        {/* LABEL (ETIQUETA) */}
        {/* Si hay label, mostrar arriba del campo */}
        {label && (
          <label className="text-sm font-medium text-[var(--color-primary)] tracking-wide font-mono">
            {label}
          </label>
        )}

        {/* CONTENEDOR DEL INPUT */}
        <div className="relative">
          {/* ICONO IZQUIERDA */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              {leftIcon}
            </div>
          )}

          {/* INPUT REAL */}
          <input
            ref={ref}
            // Si es password y showPassword es true, mostrar como texto
            type={isPassword && showPassword ? 'text' : type}
            disabled={disabled}
            className={cn(
              baseInputStyles,
              inputPadding,
              // Si hay error, borde y sombra roja
              error && 'border-[var(--color-error)] shadow-[0_0_15px_rgba(255,68,68,0.25)]',
              className
            )}
            {...props}
          />

          {/* BOTON MOSTRAR/OCULTAR CONTRASENA */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]
                         hover:text-[var(--color-primary)] transition-colors"
              tabIndex={-1} // No incluir en tab order
            >
              {/* Icono segun estado */}
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {/* ICONO DERECHA (solo si no es password) */}
          {rightIcon && !isPassword && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              {rightIcon}
            </div>
          )}
        </div>

        {/* HINT (PISTA) */}
        {/* Mostrar si hay hint y NO hay error */}
        {hint && !error && (
          <p className="text-xs text-[var(--text-muted)]">{hint}</p>
        )}

        {/* ERROR */}
        {/* Mostrar mensaje de error en rojo con animacion */}
        {error && (
          <p className="text-xs text-[var(--color-error)] animate-shake">
            {error}
          </p>
        )}
      </div>
    );
  }
);

/**
 * Nombre para DevTools
 */
Input.displayName = 'Input';
