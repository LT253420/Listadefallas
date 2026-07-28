import React from 'react';
import { Wrench, Search, Phone, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Header, Footer } from '../components/Layout';
import { cn } from '../utils/helpers';

type Screen = 'home' | 'search' | 'howToUse' | 'contact' | 'falla';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const menuItems = [
    {
      id: 'search',
      title: 'Buscar Fallas',
      description: 'Accede a la lista completa de diagnosticos',
      icon: <Search size={24} />,
      action: () => onNavigate('search'),
      variant: 'primary' as const,
    },
    {
      id: 'howToUse',
      title: 'Como Usar',
      description: 'Guia rapida de uso del sistema',
      icon: <HelpCircle size={24} />,
      action: () => onNavigate('howToUse'),
      variant: 'secondary' as const,
    },
    {
      id: 'contact',
      title: 'Soporte',
      description: 'Contacto y colaboracion',
      icon: <Phone size={24} />,
      action: () => onNavigate('contact'),
      variant: 'secondary' as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content */}
      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Title */}
          <div className="text-center mb-8 animate-fadeInUp">
            <div
              className={cn(
                'inline-flex items-center justify-center mb-4',
                'w-16 h-16 rounded-xl',
                'border-2 border-[var(--color-primary)]',
                'bg-[var(--color-primary-subtle)]',
                'animate-pulseGlow'
              )}
            >
              <Wrench size={28} className="text-[var(--color-primary)]" />
            </div>
            <h1 className="text-2xl font-mono font-bold tracking-wide">
              Sistema de Diagnostico
            </h1>
            <p className="text-[var(--text-muted)] text-sm mt-2">
              Selecciona una opcion para continuar
            </p>
          </div>

          {/* Menu items */}
          <div className="space-y-4">
            {menuItems.map((item, index) => (
              <Card
                key={item.id}
                variant="bordered"
                padding="md"
                clickable
                hoverable
                onClick={item.action}
                className={cn(
                  'animate-fadeInUp',
                  `stagger-${index + 1}`
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex-shrink-0 flex items-center justify-center',
                      'w-12 h-12 rounded-xl',
                      item.variant === 'primary'
                        ? 'bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]'
                        : 'bg-[var(--bg-elevated)] border border-[var(--border-color)]'
                    )}
                  >
                    <span
                      className={
                        item.variant === 'primary'
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--text-secondary)]'
                      }
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-[var(--text-muted)]">
                    <svg size={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Quick stats */}
          <div
            className={cn(
              'grid grid-cols-3 gap-3 pt-4',
              'animate-fadeInUp stagger-4'
            )}
          >
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                36+
              </div>
              <div className="text-xs text-[var(--text-muted)]">Fallas</div>
            </div>
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                120+
              </div>
              <div className="text-xs text-[var(--text-muted)]">Soluciones</div>
            </div>
            <div
              className={cn(
                'text-center p-4 rounded-xl',
                'bg-[var(--bg-surface)]',
                'border border-[var(--border-color)]'
              )}
            >
              <div
                className={cn(
                  'text-2xl font-mono font-bold',
                  'text-[var(--color-primary)]'
                )}
              >
                v2.0
              </div>
              <div className="text-xs text-[var(--text-muted)]">Version</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// How to use screen
export const HowToUseScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
            className="animate-fadeIn"
          >
            Volver
          </Button>

          {/* Content */}
          <Card variant="glow" padding="lg" className="animate-fadeInUp">
            <h2 className="text-xl font-mono font-bold mb-4 text-center">
              Como Usar el Sistema
            </h2>

            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                La lista esta disenada de forma simple: selecciona de toda la
                lista la falla que ves en tu equipo.
              </p>

              <p>
                Te apareceran las posibles causas para que las revises. Toca en
                una y aparecera un texto con sus posibles soluciones.
              </p>

              <div
                className={cn(
                  'p-4 rounded-lg',
                  'bg-[var(--color-primary-subtle)]',
                  'border border-[var(--border-color)]',
                  'text-[var(--text-primary)]'
                )}
              >
                <strong className="text-[var(--color-primary)]">Recorda:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Un componente danado se cambia por uno nuevo</li>
                  <li>Un componente desconectado se vuelve a conectar</li>
                  <li>Un componente faltante se coloca</li>
                  <li>Una zona sucia o sulfatada se limpia</li>
                </ul>
              </div>

              <p>
                Si dos o mas componentes funcionan, el problema esta en la
                conexion entre ambos (FPC).
              </p>

              <p className="text-sm text-[var(--text-muted)]">
                En muchos casos, la lista te indicara donde deberias revisar o
                el componente que podria generar la falla. Esta en el tecnico
                decidir que hacer ;)
              </p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Contact screen
export const ContactScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-6">
          {/* Back button */}
          <Button
            variant="ghost"
            onClick={onBack}
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            }
            className="animate-fadeIn"
          >
            Volver
          </Button>

          {/* Content */}
          <Card variant="glow" padding="lg" className="animate-fadeInUp">
            <h2 className="text-xl font-mono font-bold mb-4 text-center">
              Soporte y Contacto
            </h2>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/5491127222169"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'relative block p-4 rounded-xl overflow-hidden',
                  'bg-[var(--color-primary)]',
                  'text-[#111]',
                  'font-medium',
                  'transition-all duration-300',
                  'hover:shadow-[var(--shadow-glow-strong)]',
                  'active:scale-[0.98]',
                  'group'
                )}
              >
                {/* Efecto de iluminacion shimmer animado */}
                <div
                  className={cn(
                    'absolute inset-0 opacity-0',
                    'group-hover:opacity-100 group-active:opacity-100',
                    'transition-opacity duration-300',
                    'pointer-events-none'
                  )}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s ease-in-out infinite',
                  }}
                />
                <div className="relative flex items-center gap-3 z-10">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.866 9.866 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.432-9.881 9.884-9.881 2.637.001 5.116 1.029 6.986 2.897a9.825 9.825 0 012.893 6.994c-.003 5.45-4.433 9.881-9.879 9.881m0-19.85C5.078 1.935 1.001 6.012 1 11.5c0 2.074.765 4.028 2.158 5.557l-.14 2.064 2.404-.654a9.875 9.875 0 005.009 1.35h.004c5.448 0 9.878-4.431 9.879-9.88 0-2.641-1.029-5.123-2.894-6.987a9.828 9.828 0 00-6.984-2.894" />
                  </svg>
                  <span>WhatsApp: +54 9 11 2722-2169</span>
                </div>
              </a>

              {/* Collaboration */}
              <div
                className={cn(
                  'p-4 rounded-xl',
                  'bg-[var(--bg-surface)]',
                  'border border-[var(--border-color)]'
                )}
              >
                <h3 className="font-mono font-semibold text-[var(--text-primary)] mb-2">
                  Te gustaria colaborar?
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Envia al WhatsApp fallas, soluciones o ideas para que la
                  lista crezca! Tambien si necesitas ayuda o tienes algun
                  inconveniente con la lista, te podemos ayudar ;)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};