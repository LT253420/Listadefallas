/**
 * INDEX.TS - EXPORTACIONES DE COMPONENTES
 * ======================================
 *
 * Este archivo centraliza las exportaciones de todos los componentes.
 *
 * PARA QUE SIRVE?
 * -------------
 * Sin este archivo, tendrias que importar cada componente por separado:
 *
 * SIN INDEX.TS:
 * ------------
 * import { Button } from '../components/Button';
 * import { Input } from '../components/Input';
 * import { Card } from '../components/Card';
 * import { Preloader } from '../components/Preloader';
 * import { SearchBar } from '../components/SearchBar';
 *
 * CON INDEX.TS:
 * ------------
 * import { Button, Input, Card, Preloader, SearchBar } from '../components';
 *
 * Es mas limpio! Solo necesitas recordar la carpeta 'components'.
 *
 * COMO AGREGAR UN NUEVO COMPONENTE:
 * -------------------------------
 * 1. Crea tu componente en un archivo: MiComponente.tsx
 * 2. Agrega la exportacion en este archivo:
 *    export { MiComponente } from './MiComponente';
 * 3. Ahora puedes importarlo desde cualquier archivo:
 *    import { MiComponente } from '../components';
 */

// COMPONENTES BASICOS
// ===================

// Button - Boton reutilizable con variantes y efectos
export { Button } from './Button';

// Input - Campo de texto con label, error, iconos
export { Input } from './Input';

// COMPONENTES DE CONTENEDOR
// ========================

// Card y subcomponentes - Tarjeta contenedora
export { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';

// COMPONENTES ESPECIALES
// =====================

// Preloader - Pantalla de carga animada
export { Preloader } from './Preloader';

// SearchBar - Barra de busqueda con sugerencias
export { SearchBar } from './SearchBar';
