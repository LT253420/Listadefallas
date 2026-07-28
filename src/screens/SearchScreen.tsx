import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Zap, AlertTriangle, Settings } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { SearchBar } from '../components/SearchBar';
import { Header, Footer, HomeButton } from '../components/Layout';
import { fallasData, getFallaNames, type Falla, type Solucion } from '../data/fallas';
import { cn } from '../utils/helpers.ts';

interface SearchScreenProps {
  onBack: () => void;
  onSelectFalla?: (falla: Falla) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, onSelectFalla }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFalla, setSelectedFalla] = useState<Falla | null>(null);
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  // Scroll al inicio cuando se monta el componente o cambia la seleccion
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedFalla]);

  const fallaNames = useMemo(() => getFallaNames(), []);

  const filteredFallas = useMemo(() => {
    if (!searchQuery.trim()) return fallasData;
    const query = searchQuery.toLowerCase();
    return fallasData.filter((f) =>
      f.nombre.toLowerCase().includes(query) ||
      f.soluciones.some((s) =>
        s.titulo.toLowerCase().includes(query) ||
        s.descripcion.toLowerCase().includes(query)
      )
    );
  }, [searchQuery]);

  const handleSelectFalla = useCallback((falla: Falla) => {
    setSelectedFalla(falla);
    setExpandedSolution(null);
    onSelectFalla?.(falla);
  }, [onSelectFalla]);

  const handleBackToList = useCallback(() => {
    setSelectedFalla(null);
    setExpandedSolution(null);
  }, []);

  const handleGoHome = useCallback(() => {
    setSelectedFalla(null);
    setSearchQuery('');
    onBack();
  }, [onBack]);

  if (selectedFalla) {
    return (
      <FallaDetailScreen
        falla={selectedFalla}
        expandedSolution={expandedSolution}
        onToggleSolution={setExpandedSolution}
        onBack={handleBackToList}
        onHome={handleGoHome}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-4">
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

          {/* Search bar */}
          <div className="animate-fadeInUp stagger-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar falla..."
              suggestions={fallaNames}
              autoFocus
              fullWidth
            />
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between text-sm animate-fadeInUp stagger-2">
            <span className="text-[var(--text-muted)]">
              {filteredFallas.length} falla{filteredFallas.length !== 1 ? 's' : ''} encontrada{filteredFallas.length !== 1 ? 's' : ''}
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[var(--color-primary)] hover:underline"
              >
                Limpiar busqueda
              </button>
            )}
          </div>

          {/* Results list */}
          <div className="space-y-2">
            {filteredFallas.map((falla, index) => (
              <FallaListItem
                key={falla.id}
                falla={falla}
                index={index}
                onClick={() => handleSelectFalla(falla)}
              />
            ))}

            {filteredFallas.length === 0 && (
              <div className="text-center py-12 text-[var(--text-muted)]">
                <p>No se encontraron fallas</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[var(--color-primary)] hover:underline mt-2"
                >
                  Limpiar busqueda
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <HomeButton onClick={handleGoHome} />
      <Footer />
    </div>
  );
};

// Individual falla list item
interface FallaListItemProps {
  falla: Falla;
  index: number;
  onClick: () => void;
}

const FallaListItem: React.FC<FallaListItemProps> = ({ falla, index, onClick }) => {
  return (
    <Card
      variant="bordered"
      padding="md"
      clickable
      hoverable
      onClick={onClick}
      className={cn('animate-fadeInUp', `stagger-${Math.min((index % 8) + 3, 8)}`)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-8 h-8 min-w-[2rem] rounded-lg flex items-center justify-center',
              'bg-[var(--color-primary-subtle)]',
              'border border-[var(--border-color)]',
              'text-[var(--color-primary)] text-xs font-mono font-bold'
            )}
          >
            <span className="tabular-nums">{index + 1}</span>
          </div>
          <div>
            <h3 className="font-mono text-[var(--text-primary)] font-medium">
              {falla.nombre}
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              {falla.soluciones.length} solucion{falla.soluciones.length !== 1 ? 'es' : ''}
            </p>
          </div>
        </div>
        <ChevronDown size={20} className="text-[var(--text-muted)]" />
      </div>
    </Card>
  );
};

// Falla detail screen with expandable solutions
interface FallaDetailScreenProps {
  falla: Falla;
  expandedSolution: string | null;
  onToggleSolution: (id: string | null) => void;
  onBack: () => void;
  onHome: () => void;
}

const FallaDetailScreen: React.FC<FallaDetailScreenProps> = ({
  falla,
  expandedSolution,
  onToggleSolution,
  onBack,
  onHome,
}) => {
  const categorizeSolution = (titulo: string): 'component' | 'warning' | 'settings' => {
    const warningKeywords = ['sulfato', 'suciedad', 'software', 'viru'];
    const settingsKeywords = ['placa', 'circuito', 'pmic', 'reballing'];

    const lower = titulo.toLowerCase();

    if (warningKeywords.some(k => lower.includes(k))) return 'warning';
    if (settingsKeywords.some(k => lower.includes(k))) return 'settings';
    return 'component';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'warning':
        return <AlertTriangle size={20} className="text-[var(--color-warning)]" />;
      case 'settings':
        return <Settings size={20} className="text-[var(--color-info)]" />;
      default:
        return <Zap size={20} className="text-[var(--color-primary)]" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'warning':
        return 'border-[var(--color-warning)] bg-[rgba(255,170,0,0.05)]';
      case 'settings':
        return 'border-[var(--color-info)] bg-[rgba(0,170,255,0.05)]';
      default:
        return 'border-[var(--color-primary)] bg-[var(--color-primary-subtle)]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header showLogout={false} />

      <main className="flex-1 pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto w-full space-y-4">
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
            Volver a la lista
          </Button>

          {/* Falla title card */}
          <Card variant="glow" padding="lg" className="animate-fadeInUp">
            <h2 className="text-xl font-mono font-bold text-center mb-2">
              {falla.nombre}
            </h2>
            <p className="text-center text-sm text-[var(--text-muted)]">
              Selecciona una solucion para ver los detalles
            </p>
          </Card>

          {/* Solutions list */}
          <div className="space-y-3">
            {falla.soluciones.map((solucion, index) => {
              const category = categorizeSolution(solucion.titulo);
              const isExpanded = expandedSolution === solucion.titulo;

              return (
                <Card
                  key={solucion.titulo}
                  variant="bordered"
                  padding="none"
                  hoverable
                  clickable
                  onClick={() => onToggleSolution(isExpanded ? null : solucion.titulo)}
                  className={cn(
                    'animate-fadeInUp overflow-hidden transition-all duration-300',
                    `stagger-${index + 1}`,
                    isExpanded && getCategoryColor(category),
                    isExpanded && 'border-2'
                  )}
                >
                  {/* Solution header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-lg flex items-center justify-center',
                          'bg-[var(--bg-elevated)]',
                          'border border-[var(--border-color)]'
                        )}
                      >
                        {getCategoryIcon(category)}
                      </div>
                      <span className="font-mono font-medium text-[var(--text-primary)]">
                        {solucion.titulo}
                      </span>
                    </div>
                    <div className="text-[var(--text-muted)]">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    className={cn(
                      'transition-all duration-300 ease-out overflow-hidden',
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-4 pb-4">
                      <div
                        className={cn(
                          'p-4 rounded-lg',
                          'bg-[var(--bg-surface)]',
                          'border border-[var(--border-color)]'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              'w-1 h-full rounded-full',
                              'bg-[var(--color-primary)]'
                            )}
                          />
                          <p className="text-[var(--text-secondary)] leading-relaxed">
                            {solucion.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </main>

      <HomeButton onClick={onHome} />
      <Footer />
    </div>
  );
};