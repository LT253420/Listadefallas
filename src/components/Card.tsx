/**
 * CARD.TSX - COMPONENTE DE TARJETA REUTILIZABLE
 * =============================================
 *
 * Una "Card" (tarjeta) es un contenedor visual que agrupa contenido relacionado.
 *
 * PARA QUE SIRVE?
 * --------------
 * Las tarjetas se usan para agrupar elementos que van juntos:
 * - Una falla con su descripcion
 * - Un menu item con icono y texto
 * - Un formulario de login
 *
 * VARIANTES:
 * --------
 * - default: Fondo oscuro con borde sutil
 * - elevated: Fondo mas claro con sombra (sobresale)
 * - bordered: Sin fondo, solo borde
 * - glow: Con efecto de brillo verde
 *
 * COMO USAR:
 * ---------
 * import { Card } from '../components/Card';
 *
 * <Card variant="glow" padding="lg">
 *   <h3>Titulo</h3>
 *   <p>Contenido...</p>
 * </Card>
 *
 * COMPONENTES ADICIONALES:
 * -----------------------
 * - CardHeader: Seccion superior con borde inferior
 * - CardTitle: Titulo formateado
 * - CardContent: Contenido principal
 * - CardFooter: Seccion inferior con borde superior
 */

import React from 'react';
import { cn } from '../utils/helpers';

/**
 * INTERFACE: CardProps
 * ====================
 *
 * Define las propiedades que puede recibir Card.
 * Extiende los atributos HTML de un div para aceptar onClick, style, etc.
 */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Variante visual
  variant?: 'default' | 'elevated' | 'bordered' | 'glow';

  // Padding (espacio interno)
  padding?: 'none' | 'sm' | 'md' | 'lg';

  // Si tiene efecto hover
  hoverable?: boolean;

  // Si es clickeable (cambia cursor)
  clickable?: boolean;
}

/**
 * COMPONENTE: Card
 * =================
 *
 * Contenedor visual con bordes redondeados y efectos opcionales.
 */
export const Card: React.FC<CardProps> = ({
  className,           // Clases adicionales
  children,            // Contenido dentro de la tarjeta
  variant = 'default', // Variante visual
  padding = 'md',      // Espacio interno
  hoverable = false,   // Si tiene efecto hover
  clickable = false,   // Si es clickeable
  ...props             // Otras props HTML
}) => {
  /**
   * ESTILOS BASE
   * ============
   * Estilos comunes a todas las variantes.
   */
  const baseStyles = `
    relative rounded-xl overflow-hidden
    transition-all duration-300 ease-out
  `;

  /**
   * ESTILOS POR VARIANTE
   * ====================
   */
  const variants = {
    // DEFAULT: Fondo oscuro basico con borde
    default: `
      bg-[var(--bg-surface)]
      border border-[var(--border-color)]
    `,

    // ELEVATED: Fondo mas claro con sombra
    elevated: `
      bg-[var(--bg-elevated)]
      border border-[var(--border-color)]
      shadow-lg shadow-[rgba(0,0,0,0.3)]
    `,

    // BORDERED: Sin fondo, solo borde grueso
    bordered: `
      bg-transparent
      border-2 border-[var(--border-color)]
    `,

    // GLOW: Con efecto de brillo verde
    glow: `
      bg-[var(--bg-surface)]
      border border-[var(--border-color)]
      shadow-[  var(--color-primary-subtle))]
    `,
  };

  /**
   * PADDING (ESPACIO INTERNO)
   * ========================
   * Controla cuanto espacio hay entre el borde y el contenido.
   */
  const paddings = {
    none: '',        // Sin padding
    sm: 'p-4',      // Pequeno (1rem)
    md: 'p-5',      // Mediano (1.25rem)
    lg: 'p-6',      // Grande (1.5rem)
  };

  /**
   * RENDER
   * ======
   */
  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        // Efecto hover: brilla al pasar el mouse
        hoverable && 'hover:border-[var(--border-color-hover)] hover:bg-[var(--color-primary-glow-mid)] hover:shadow-[0_0_25px_var(--color-primary-subtle))]',
        // Efecto clickable: cursor pointer y efecto de presion
        clickable && 'cursor-pointer active:scale-[0.99]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * COMPONENTE: CardHeader
 * =======================
 *
 * Seccion superior de una tarjeta con borde inferior.
 * Usada cuando la tarjeta tiene encabezado y cuerpo separados.
 */
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('border-b border-[var(--border-color)] pb-4 mb-4', className)}
    {...props}
  >
    {children}
  </div>
);

/**
 * COMPONENTE: CardTitle
 * ======================
 *
 * Titulo estilizado para usar dentro de CardHeader.
 * Usa tipografia monoespaciada y color verde.
 */
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle: React.FC<CardTitleProps> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn(
      'text-lg font-semibold text-[var(--color-primary)] font-mono tracking-wide',
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

/**
 * COMPONENTE: CardContent
 * ========================
 *
 * Contenedor para el contenido principal de la tarjeta.
 * No tiene estilos especiales, es solo agrupador.
 */
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('', className)} {...props}>
    {children}
  </div>
);

/**
 * COMPONENTE: CardFooter
 * =======================
 *
 * Seccion inferior de una tarjeta con borde superior.
 * Usada para botones de accion o informacion adicional.
 */
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('border-t border-[var(--border-color)] pt-4 mt-4', className)}
    {...props}
  >
    {children}
  </div>
);
