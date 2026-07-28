/**
 * HELPERS.TS - FUNCIONES AUXILIARES
 * ================================
 *
 * Este archivo contiene funciones de utilidad que se usan en varios archivos.
 * "Helper" significa "ayudante" - funciones que facilitan tareas comunes.
 *
 * FUNCIONES EN ESTE ARCHIVO:
 * -------------------------
 * 1. cn() - Combina clases CSS
 * 2. sha256Hex() - Hashea contrasenas
 * 3. formatDate() - Formatea fechas
 * 4. debounce() - Retarda ejecucion de funciones
 * 5. capitalize() - Pone primera letra mayuscula
 * 6. truncate() - Corta texto largo
 * 7. generateId() - Crea IDs unicos
 * 8. storage - Guarda datos en localStorage
 * 9. session - Guarda datos en sessionStorage
 */

// ============================================
// IMPORTACION DE BIBLIOTECAS
// ============================================

// clsx: Biblioteca pequena para combinar clases CSS
// Ejemplo: cn('base', isActive && 'active') -> 'base active'
import { type ClassValue, clsx } from 'clsx';

// ============================================
// FUNCION: cn (class names)
// ============================================

/**
 * Combina multiples clases CSS en una sola cadena.
 *
 * POR QUE USAR ESTA FUNCION?
 * -------------------------
 * React maneja clases como strings. Si quieres clases condicionales,
 * se vuelve complicado:
 *   `base ${isActive ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`
 *
 * Con cn() es mas simple:
 *   cn('base', isActive && 'active', isDisabled && 'disabled')
 *
 * EJEMPLOS:
 * -------
 * cn('px-4', 'py-2') -> 'px-4 py-2'
 * cn('btn', true && 'active') -> 'btn active'
 * cn('btn', false && 'active') -> 'btn'
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ============================================
// FUNCION: sha256Hex
// ============================================

/**
 * Convierte un texto en un hash SHA-256 (cadena hexadecimal).
 *
 * QUE ES UN HASH?
 * --------------
 * Un hash es un codigo unico generado a partir de un texto.
 * - Mismo texto siempre produce el mismo hash
 * - No se puede revertir (no se puede obtener el texto del hash)
 * - Pequenos cambios en el texto cambian totalmente el hash
 *
 * EJEMPLO:
 * -------
 * sha256Hex('hola') -> '...'
 * sha256Hex('holb') -> '...' (completamente diferente)
 *
 * POR QUE USARLO?
 * --------------
 * Para guardar contrasenas de forma segura.
 * Nunca guardamos la contrasena real, solo su hash.
 * Asi, si alguien accede al codigo fuente, no ve la contrasena.
 *
 * SE USA EN: AuthContext.tsx para verificar la contrasena de 2FA.
 */
export async function sha256Hex(text: string): Promise<string> {
  // PASO 1: Convertir texto a bytes (codificacion UTF-8)
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // PASO 2: Calcular el hash con la API del navegador
  // crypto.subtle.digest algoritmo SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);

  // PASO 3: Convertir el buffer a un array de bytes
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // PASO 4: Convertir cada byte a hexadecimal (2 caracteres)
  // .padStart(2, '0') asegura que siempre tenga 2 digitos
  // Ejemplo: 10 -> '0a' (no 'a')
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// FUNCION: formatDate
// ============================================

/**
 * Formatea una fecha en formato argentino: DD/MM/YYYY
 *
 * EJEMPLO:
 * -------
 * formatDate(new Date(2024, 0, 15)) -> '15/01/2024'
 *
 * SE USA EN: Donde se muestren fechas (historial, logs, etc.)
 */
export function formatDate(date: Date): string {
  // Intl.DateTimeFormat usa la configuracion regional local
  // 'es-AR' = Espanol Argentina
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',   // Dia con 2 digitos (01, 02... 15, 31)
    month: '2-digit', // Mes con 2 digitos
    year: 'numeric',  // Ano completo (2024)
  }).format(date);
}

// ============================================
// FUNCION: debounce
// ============================================

/**
 * Retarda la ejecucion de una funcion hasta que pase un tiempo sin llamadas.
 *
 * PARA QUE SIRVE?
 * --------------
 * Imagina una barra de busqueda. Cada letra que escribes dispara un evento.
 * Sin debounce, se hace una busqueda POR CADA LETRA.
 * Con debounce, se espera a que el usuario deje de escribir.
 *
 * EJEMPLO:
 * -------
 * const debouncedSearch = debounce((text) => buscar(text), 300);
 *
 * Usuario escribe: 's' 'o' 'n' 'y'
 * Sin debounce: 4 busquedas ('s', 'so', 'son', 'sony')
 * Con debounce: 1 busqueda ('sony') despues de 300ms de pausa
 *
 * SE USA EN: SearchBar.tsx para no buscar en cada tecla.
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,           // La funcion a retardar
  wait: number       // Tiempo de espera en milisegundos
): (...args: Parameters<T>) => void {
  // Guardamos el timeout para poder cancelarlo
  let timeout: ReturnType<typeof setTimeout>;

  // Retornamos una nueva funcion que:
  // 1. Cancela el timeout anterior (si existe)
  // 2. Crea un nuevo timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout); // Cancela ejecucion pendiente
    timeout = setTimeout(() => func(...args), wait); // Nueva ejecucion
  };
}

// ============================================
// FUNCION: capitalize
// ============================================

/**
 * Pone la primera letra de un texto en mayuscula.
 *
 * EJEMPLO:
 * -------
 * capitalize('novacell') -> 'Novacell'
 *
 * SE USA EN: Para mostrar nombres formateados.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ============================================
// FUNCION: truncate
// ============================================

/**
 * Corta un texto si es muy largo y agrega '...' al final.
 *
 * EJEMPLO:
 * -------
 * truncate('Texto muy largo que no cabe', 10) -> 'Texto muy...'
 *
 * SE USA EN: Para mostrar descripciones cortas en listas.
 */
export function truncate(str: string, length: number): string {
  // Si el texto es mas corto que el limite, devolverlo igual
  if (str.length <= length) return str;

  // Cortar y agregar '...'
  return str.slice(0, length) + '...';
}

// ============================================
// FUNCION: generateId
// ============================================

/**
 * Genera un ID unico aleatorio.
 *
 * EJEMPLO:
 * -------
 * generateId() -> 'x7k9m2p'
 *
 * COMO FUNCIONA:
 * -------------
 * 1. Math.random() genera un numero aleatorio entre 0 y 1
 * 2. .toString(36) lo convierte a base 36 (numeros + letras)
 * 3. .substring(2, 9) toma solo 7 caracteres (sin el '0.')
 *
 * SE USA EN: Para crear IDs de elementos dinamicos.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// ============================================
// OBJETO: storage (localStorage)
// ============================================

/**
 * Objeto con funciones para guardar/leer datos en localStorage.
 *
 * QUE ES localStorage?
 * --------------------
 * Es un almacenamiento del navegador que PERSISTE al cerrar la app.
 * - Datos guardados siguen ahi al reiniciar el navegador
 * - Limite de ~5MB de datos
 * - Solo puede guardar strings (texto)
 *
 * POR QUE USAMOS ESTE OBJETO?
 * -------------------------
 * localStorage solo acepta strings.
 * Si queremos guardar un objeto, hay que convertirlo a JSON.
 * Este objeto hace la conversion automaticamente.
 *
 * DIFERENCIA CON sessionStorage:
 * -----------------------------
 * - localStorage: Persiste para siempre
 * - sessionStorage: Se borra al cerrar el navegador (o pestana)
 */
export const storage = {
  /**
   * Obtiene un valor de localStorage.
   *
   * @param key - La clave del valor
   * @param defaultValue - Valor por defecto si no existe
   *
   * @example
   * const nombre = storage.get('nombre', 'Anonimo');
   */
  get: <T>(key: string, defaultValue: T): T => {
    try {
      // Intentar obtener el valor
      const item = localStorage.getItem(key);
      // Si existe, convertir de JSON; si no, usar default
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      // Si hay error (JSON invalido, etc), devolver default
      return defaultValue;
    }
  },

  /**
   * Guarda un valor en localStorage.
   *
   * @param key - La clave del valor
   * @param value - El valor a guardar
   *
   * @example
   * storage.set('tema', 'oscuro');
   * storage.set('usuario', { nombre: 'Juan' });
   */
  set: <T>(key: string, value: T): void => {
    try {
      // Convertir a JSON string y guardar
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Error al guardar en localStorage');
    }
  },

  /**
   * Elimina un valor de localStorage.
   *
   * @param key - La clave del valor a eliminar
   */
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error('Error al eliminar de localStorage');
    }
  },
};

// ============================================
// OBJETO: session (sessionStorage)
// ============================================

/**
 * Objeto con funciones para guardar/leer datos en sessionStorage.
 *
 * QUE ES sessionStorage?
 * --------------------
 * Es un almacenamiento del navegador que se BORRA al cerrar la pestana.
 * - Datos se pierden al cerrar el navegador
 * - Limite de ~5MB de datos
 * - Solo puede guardar strings (texto)
 *
 * USO EN ESTE PROYECTO:
 * -------------------
 * Se usa para guardar la sesion del usuario.
 * Al cerrar el navegador, el usuario debe volver a loguearse.
 * Esto es una MEDIDA DE SEGURIDAD.
 */
export const session = {
  /**
   * Obtiene un valor de sessionStorage.
   *
   * @param key - La clave del valor
   * @param defaultValue - Valor por defecto si no existe
   */
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  /**
   * Guarda un valor en sessionStorage.
   *
   * @param key - La clave del valor
   * @param value - El valor a guardar
   */
  set: <T>(key: string, value: T): void => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Error al guardar en sessionStorage');
    }
  },

  /**
   * Elimina un valor de sessionStorage.
   *
   * @param key - La clave del valor a eliminar
   */
  remove: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch {
      console.error('Error al eliminar de sessionStorage');
    }
  },
};
