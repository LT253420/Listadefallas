/**
 * PRELOADER.TSX - PANTALLA DE CARGA ANIMADA
 * =========================================
 *
 * Este componente muestra una animacion mientras la app se carga.
 *
 * PARA QUE SIRVE?
 * --------------
 * Al abrir la app, hay un pequeno delay antes de que todo este listo.
 * El Preloader llenan ese tiempo con una animacion profesional.
 *
 * DURACION:
 * -------
 * Por defecto dura 2 segundos (2000ms).
 * Se puede cambiar con la prop 'duration'.
 *
 * FLUJO:
 * -----
 * 1. App.tsx renderiza Preloader
 * 2. Preloader muestra animacion de progreso
 * 3. Cuando llega a 100%, llama a onComplete
 * 4. App.tsx deja de mostrar Preloader y muestra contenido real
 *
 * COMO USAR:
 * ---------
 * <Preloader
 *   duration={2000}
 *   onComplete={() => setCargando(false)}
 * />
 */

import React, { useState, useEffect } from 'react';
import { cn } from '../utils/helpers';

/**
 * INTERFACE: PreloaderProps
 * ==========================
 */
interface PreloaderProps {
  // Funcion a llamar cuando termina la animacion
  onComplete?: () => void;

  // Duracion en milisegundos
  duration?: number;
}

/**
 * COMPONENTE: Preloader
 * =====================
 */
export const Preloader: React.FC<PreloaderProps> = ({
  onComplete,
  duration = 2000,
}) => {
  /**
   * ESTADOS
   * =======
   */
  // Progreso actual (0-100)
  const [progress, setProgress] = useState(0);

  // Si llego a 100%
  const [isComplete, setIsComplete] = useState(false);

  // Si esta desapareciendo (fade out)
  const [fadeOut, setFadeOut] = useState(false);

  /**
   * EFFECT: Animacion de progreso
   * =============================
   *
   * Cada 'intervalTime' milisegundos, incrementa el progreso.
   * Los incrementos no son lineales para dar efecto de carga real.
   */
  useEffect(() => {
    // Valores de incremento (no lineales)
    const increments = [1, 5, 10, 20, 35, 50, 65, 80, 90, 100];

    // Tiempo entre incrementos
    const intervalTime = duration / increments.length;

    let index = 0;
    const interval = setInterval(() => {
      if (index < increments.length) {
        setProgress(increments[index]);
        index++;
      } else {
        // Termino la animacion
        clearInterval(interval);
        setIsComplete(true);
        setFadeOut(true);

        // Esperar 500ms para la animacion de fade out
        // y luego llamar onComplete
        setTimeout(() => {
          onComplete?.();
        }, 500);
      }
    }, intervalTime);

    // Cleanup: limpiar interval al desmontar
    return () => clearInterval(interval);
  }, [duration, onComplete]);

  /**
   * SI ESTA HACIENDO FADE OUT
   * ========================
   * Mostrar pantalla vacia que desaparece
   */
  if (fadeOut) {
    return (
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center
                   bg-[var(--bg-base)] transition-opacity duration-500 opacity-0 pointer-events-none"
      />
    );
  }

  /**
   * RENDER MAIN
   * ===========
   */
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-base)]"
    >
      {/* PATRON DE FONDO */}
      {/* Grid verde sutil para dar efecto tecnologico */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, var(--color-primary-subtle)) 1px, transparent 1px),
              linear-gradient(var(--color-primary-subtle)) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px',
          }}
        />
      </div>

      {/* CONTENIDO CENTRAL */}
      <div className="relative flex flex-col items-center gap-8 animate-hudAppear">
        {/* LOGO Y TITULO */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] font-mono tracking-widest">
            Bienvenido
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1 tracking-wide">
            Diagnostic System v2.0
          </p>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="w-72 space-y-3">
          {/* TEXTO DE PORCENTAJE */}
          <div className="flex justify-between items-center text-sm font-mono">
            <span className="text-[var(--text-muted)]">INITIALIZING</span>
            <span
              className={cn(
                'text-[var(--color-primary)] tabular-nums',
                isComplete && 'animate-pulseGlow'
              )}
            >
              {progress}%
            </span>
          </div>

          {/* BARRA VISUAL */}
          <div className="relative h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden border border-[var(--border-color)]">
            {/* Relleno verde */}
            <div
              className={cn(
                'h-full bg-[var(--color-primary)] rounded-full transition-all duration-200 ease-out',
                isComplete && 'animate-pulseGlow'
              )}
              style={{
                width: `${progress}%`,
                boxShadow: isComplete
                  ? '0 0 20px var(--color-primary-glow)'
                  : 'none',
              }}
            />

            {/* EFECTO DE LINEA QUE ESCANEA */}
            <div
              className="absolute top-0 left-0 w-8 h-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, transparent, var(--color-primary-glow) , transparent)',
                transform: `translateX(${progress * 2.8}px)`,
              }}
            />
          </div>

          {/* TEXTO DE ESTADO */}
          <p className="text-xs text-[var(--text-muted)] text-center font-mono">
            {isComplete ? 'SISTEMA LISTO' : 'Cargando modulos...'}
          </p>
        </div>

        {/* PUNTOS DECORATIVOS ANIMADOS */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
