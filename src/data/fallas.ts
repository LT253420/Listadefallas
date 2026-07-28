/**
 * FALLAS.TS - BASE DE DATOS DE FALLAS Y SOLUCIONES
 * ===============================================
 *
 * Este archivo contiene TODAS las fallas y sus soluciones.
 * Es el corazon del sistema de diagnostico.
 *
 * COMO ESTA ORGANIZADO:
 * --------------------
 * 1. Interfaces (tipos de datos)
 * 2. Array de fallas (fallasData)
 * 3. Funciones de busqueda
 *
 * COMO AGREGAR UNA NUEVA FALLA:
 * -----------------------------
 * 1. Ve al array fallasData
 * 2. Copia una falla existente como plantilla
 * 3. Cambia el id, nombre y soluciones
 * 4. Guarda el archivo
 *
 * EJEMPLO DE UNA FALLA:
 * --------------------
 * {
 *   id: 'no-enciende',           // Identificador unico
 *   nombre: 'No enciende',        // Texto que ve el usuario
 *   soluciones: [                // Lista de soluciones posibles
 *     {
 *       titulo: 'Revisar bateria',
 *       descripcion: 'Medir bateria para saber si funciona.'
 *     }
 *   ]
 * }
 */

// ============================================
// INTERFACES (TIPOS DE DATOS)
// ============================================

/**
 * INTERFACE: Solucion
 * ===================
 *
 * Define como se ve UNA solucion para una falla.
 *
 * titulo: El nombre corto de la solucion
 * descripcion: La explicacion detallada de que hacer
 */
export interface Solucion {
  titulo: string;       // Ej: 'Revisar bateria'
  descripcion: string;  // Ej: 'Medir bateria con multimetro...'
}

/**
 * INTERFACE: Falla
 * ================
 *
 * Define como se ve UNA falla en el sistema.
 *
 * id: Identificador unico (usado internamente, no visible)
 * nombre: Lo que ve el usuario en la lista
 * soluciones: Array de posibles soluciones para esa falla
 */
export interface Falla {
  id: string;           // Ej: 'no-enciende'
  nombre: string;       // Ej: 'No enciende'
  soluciones: Solucion[]; // Lista de soluciones
}

// ============================================
// DATOS DE FALLAS
// ============================================

/**
 * fallasData: Array con TODAS las fallas
 * ======================================
 *
 * Este es el array principal con todas las fallas del sistema.
 * CADA FALLA tiene:
 * - ID unico (sin espacios, minusculas, con guiones)
 * - Nombre descriptivo (lo que ve el usuario)
 * - Array de soluciones (puede ser 1 o varias)
 *
 * COMO AGREGAR UNA FALLA NUEVA:
 * -----------------------------
 * Copia este formato y agregalo al final del array:
 *
 * {
 *   id: 'id-de-tu-falla',       // Sin espacios, minusculas
 *   nombre: 'Nombre de la falla', // Texto visible
 *   soluciones: [
 *     {
 *       titulo: 'Titulo de solucion',
 *       descripcion: 'Descripcion detallada...'
 *     }
 *   ]
 * },
 */
export const fallasData: Falla[] = [
  {
    id: 'no-enciende',
    nombre: 'No enciende',
    soluciones: [
      { titulo: 'Revisar bateria', descripcion: 'Medir bateria para saber si funciona.' },
      { titulo: 'Boton de encendido', descripcion: 'Verificar si el boton funciona correctamente.' },
      { titulo: 'Placa base', descripcion: 'Posible falla de alimentacion o cortocircuito.' },
    ],
  },
  {
    id: 'no-tiene-sonido',
    nombre: 'No tiene sonido',
    soluciones: [
      { titulo: 'Altavoz', descripcion: 'Probar el parlante con otro equipo.' },
      { titulo: 'Conectores', descripcion: 'Verificar si estan sulfatados o desconectados.' },
      { titulo: 'Placa base', descripcion: 'Fallo en circuito de audio.' },
    ],
  },
  {
    id: 'no-puedo-hacer-llamadas',
    nombre: 'No puedo hacer llamadas',
    soluciones: [
      { titulo: 'Estado del IMEI', descripcion: 'Verificar si el equipo fue dado de baja.' },
      { titulo: 'Chip', descripcion: 'Probar con otro chip o limpiar la bandeja.' },
      { titulo: 'Senal', descripcion: 'Revisar si toma senal correctamente.' },
    ],
  },
  {
    id: 'telefono-se-calienta',
    nombre: 'El telefono se calienta',
    soluciones: [
      { titulo: 'Bateria', descripcion: 'Puede estar defectuosa o vieja.' },
      { titulo: 'Apps en segundo plano', descripcion: 'Cerrar procesos que usen muchos recursos.' },
      { titulo: 'Mantenimiento', descripcion: 'Limpiar placa, cambiar pasta termica.' },
    ],
  },
  {
    id: 'celular-se-apaga-solo',
    nombre: 'Mi celular se apaga solo',
    soluciones: [
      { titulo: 'Boton de encendido', descripcion: 'Puede estar en corto o danado.' },
      { titulo: 'Bateria', descripcion: 'Conector de bateria danado o bateria en mal estado.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada.' },
    ],
  },
  {
    id: 'celular-se-reinicia-solo',
    nombre: 'Mi celular se reinicia solo',
    soluciones: [
      { titulo: 'Boton de encendido', descripcion: 'Puede estar en corto o danado.' },
      { titulo: 'Bateria', descripcion: 'Conector de bateria danado o bateria en mal estado.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada.' },
    ],
  },
  {
    id: 'pantalla-no-prende-celular-funciona',
    nombre: 'La pantalla no prende pero el celular funciona',
    soluciones: [
      { titulo: 'Modulo / display / pantalla', descripcion: 'Puede tener la pantalla danada.' },
      { titulo: 'Conector del Modulo', descripcion: 'Conector de modulo danado, mal conectado o desconectado.' },
      { titulo: 'Placa Madre', descripcion: 'Danos internos en la placa.' },
    ],
  },
  {
    id: 'pantalla-blanco-interferencia',
    nombre: 'La pantalla queda en blanco / tiene interferencia',
    soluciones: [
      { titulo: 'Modulo / display / pantalla', descripcion: 'Puede estar en corto o danado.' },
      { titulo: 'Bateria', descripcion: 'Conector de bateria danado o bateria en mal estado.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada.' },
    ],
  },
  {
    id: 'pantalla-parpadea',
    nombre: 'La pantalla parpadea',
    soluciones: [
      { titulo: 'Modulo / display / pantalla', descripcion: 'Puede tener la pantalla danada.' },
      { titulo: 'Fallas de Software', descripcion: 'Fallas en el sistema que producen ese error.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Danos internos en la placa.' },
    ],
  },
  {
    id: 'celular-se-apaga-cuando-llaman',
    nombre: 'Mi celular se apaga cuando llaman',
    soluciones: [
      { titulo: 'Antena coaxial', descripcion: 'Puede estar en corto o danada.' },
      { titulo: 'Software', descripcion: 'Fallas en el sistema que producen ese error.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada.' },
    ],
  },
  {
    id: 'pantalla-se-apaga-audio-llamadas',
    nombre: 'La pantalla se apaga cuando escucho un audio o me llaman',
    soluciones: [
      { titulo: 'Sensores', descripcion: 'Pueden estar en corto o danado.' },
      { titulo: 'Mal cambio de pantalla', descripcion: 'Una pantalla o modulo mal colocado puede tapar los sensores.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada.' },
    ],
  },
  {
    id: 'manchas-liquido-negro-burbujas',
    nombre: 'Manchas de liquido negro, suciedad o burbujas',
    soluciones: [
      { titulo: 'Fallas de pantalla (modulo)', descripcion: 'Puede estar mal trabajada, sucia, mal colocada. Requiere cambio de modulo.' },
    ],
  },
  {
    id: 'no-escucho-cuando-me-hablan',
    nombre: 'No escucho cuando me hablan ni puedo escuchar los audios',
    soluciones: [
      { titulo: 'Speakers / parlantes', descripcion: 'Pueden estar danados, desconectados o faltantes.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada en modulo de audio.' },
    ],
  },
  {
    id: 'no-escuchan-mi-voz',
    nombre: 'No escuchan mi voz en llamada ni audios',
    soluciones: [
      { titulo: 'Microfono / microfonos', descripcion: 'Pueden estar danados, desconectados o faltantes.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada en modulo de audio.' },
    ],
  },
  {
    id: 'no-puedo-desbloquear',
    nombre: 'No puedo desbloquear el celular (patron, contrasena o huella)',
    soluciones: [
      { titulo: 'Sensores de huella', descripcion: 'Pueden estar danado, desconectado o faltante.' },
      { titulo: 'Fallas en tactil', descripcion: 'Una pantalla de mala calidad o danada puede generar fallas en tactil.' },
      { titulo: 'Equipo tildado', descripcion: 'Reinicio requerido. Posible falla de memoria o sistema.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito en componentes relacionados al tactil.' },
    ],
  },
  {
    id: 'no-carga-bateria',
    nombre: 'No carga la bateria',
    soluciones: [
      { titulo: 'Bateria', descripcion: 'Fallas en bateria danada o mal conectada.' },
      { titulo: 'Pin / puerto de carga', descripcion: 'Un pin o puerto de carga danado, sucio o mal trabajado.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por sulfato o suciedad en el pin.' },
      { titulo: 'Placa Madre', descripcion: 'Cortocircuito o placa danada en sector de carga.' },
    ],
  },
  {
    id: 'no-mantiene-carga',
    nombre: 'El celular no mantiene carga / se desgasta la bateria',
    soluciones: [
      { titulo: 'Bateria', descripcion: 'Bateria danada o desgastada.' },
      { titulo: 'Cargador no indicado', descripcion: 'Cargador de mala calidad / no original o danado.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa madre', descripcion: 'Fallas, cortocircuito o fuga en placa. Fallas en circuito de carga.' },
    ],
  },
  {
    id: 'no-reconocido-pc',
    nombre: 'Mi celular no es reconocido por la PC',
    soluciones: [
      { titulo: 'Pin / puerto de carga', descripcion: 'Pin o puerto de carga danado, sucio o faltante.' },
      { titulo: 'Puerto USB de la PC', descripcion: 'Puerto USB de la PC danado, sucio o faltante.' },
      { titulo: 'Cable USB', descripcion: 'Un cable USB danado o que solo sirve para cargar.' },
      { titulo: 'Drivers en PC', descripcion: 'Controladores del dispositivo de la computadora no instalados.' },
      { titulo: 'Placa madre', descripcion: 'Fallas en placa. Revisar Circuito de conexion de datos.' },
    ],
  },
  {
    id: 'camara-no-funciona',
    nombre: 'La camara no funciona (la app se cierra o no saca fotos)',
    soluciones: [
      { titulo: 'Camara', descripcion: 'Camara desconectada, danada o faltante. Cambio de camara recomendado.' },
      { titulo: 'Conectores', descripcion: 'Conectores FPC de placa o de camara danados.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de camaras.' },
      { titulo: 'Software', descripcion: 'Problemas en software danado. Se recomienda formateo o Flasheo.' },
    ],
  },
  {
    id: 'memoria-llena',
    nombre: 'La memoria esta llena (sin archivos, ni apps instaladas)',
    soluciones: [
      { titulo: 'Problemas en software', descripcion: 'Posible virus almacenado en el sistema. Se recomienda formateo.' },
      { titulo: 'Archivos residuales', descripcion: 'El equipo acumula datos innecesarios. Se recomienda formateo.' },
    ],
  },
  {
    id: 'celular-lento-calienta',
    nombre: 'El celular esta lento y se calienta',
    soluciones: [
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Sobrecarga en memorias', descripcion: 'Sobrecarga de archivos y datos en RAM o ROM.' },
      { titulo: 'Software', descripcion: 'Sistema operativo danado o con fallas. Se recomienda formateo.' },
      { titulo: 'Antiguedad', descripcion: 'El equipo es demasiado viejo o tiene desgaste notable en componentes.' },
    ],
  },
  {
    id: 'solo-llamadas-emergencia',
    nombre: 'Solo llamadas de emergencia',
    soluciones: [
      { titulo: 'Bandeja PortaSIM', descripcion: 'Bandeja danada, sucia o faltante.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'SIM / Chip', descripcion: 'Un chip / SIM danado o dado de baja.' },
      { titulo: 'Antenas coaxiales / flex', descripcion: 'Antenas danadas, desconectadas o faltantes.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de RF.' },
      { titulo: 'Equipo importado', descripcion: 'El equipo proviene fuera del pais y no esta liberado.' },
      { titulo: 'Software', descripcion: 'Problemas en software danado. Se recomienda formateo o Flasheo.' },
      { titulo: 'IMEI', descripcion: 'IMEI en blacklist. Reportado como equipo con robo, hurto o extravio.' },
    ],
  },
  {
    id: 'wifi-no-activa',
    nombre: 'Wifi No se activa',
    soluciones: [
      { titulo: 'Antenas coaxiales / flex', descripcion: 'Antenas danadas, desconectadas o faltantes.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de WIFI.' },
      { titulo: 'Software', descripcion: 'Problemas en software danado. Se recomienda formateo o Flasheo.' },
    ],
  },
  {
    id: 'no-detecta-botones',
    nombre: 'No detecta teclas o botones',
    soluciones: [
      { titulo: 'Botones / flex', descripcion: 'Botones o flex desconectados, sulfatados, danados o faltantes.' },
      { titulo: 'Touch / tactil', descripcion: 'Tactil mal conectado, sucio, danado o faltante.' },
      { titulo: 'Modulo de imagen', descripcion: 'Modulo danado, mal conectado, sucio o faltante.' },
    ],
  },
  {
    id: 'vibra-al-conectar-bateria',
    nombre: 'Vibra al conectar bateria / solo vibra',
    soluciones: [
      { titulo: 'Modulo de imagen', descripcion: 'Modulo danado, mal conectado, sucio o faltante.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Conectores', descripcion: 'Conectores FPC de placa o del modulo danados.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de Encendido.' },
    ],
  },
  {
    id: 'no-lee-microsd',
    nombre: 'No lee la memoria extraible (MicroSD)',
    soluciones: [
      { titulo: 'Bandeja PortaSD', descripcion: 'Bandeja danada, sucia o faltante.' },
      { titulo: 'Memoria SD', descripcion: 'Memoria danada, con virus o en formato inadecuado.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de lectora.' },
    ],
  },
  {
    id: 'auricular-cable-intermitente',
    nombre: 'Auricular (cable) Funciona a veces',
    soluciones: [
      { titulo: 'Conector', descripcion: 'Conector Jack de 3.5mm danado, sucio o faltante.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito del jack.' },
    ],
  },
  {
    id: 'auricular-bluetooth-intermitente',
    nombre: 'Auricular (inalambrico / bluetooth) Funciona a veces',
    soluciones: [
      { titulo: 'Auricular', descripcion: 'El auricular esta danado.' },
      { titulo: 'Software', descripcion: 'Problemas en software. Se recomienda restablecimiento o formateo.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla en circuito de conectividad Bluetooth.' },
    ],
  },
  {
    id: 'codigo-desbloqueo-sim',
    nombre: 'Ingrese codigo de desbloqueo al insertar SIM',
    soluciones: [
      { titulo: 'Equipo importado', descripcion: 'El equipo proviene fuera del pais y no esta liberado.' },
      { titulo: 'Equipo NO liberado', descripcion: 'Necesita liberacion por codigo para utilizar SIMs de otras empresas.' },
    ],
  },
  {
    id: 'patron-clave-cuenta-google',
    nombre: 'El equipo tiene patron, clave de usuario o cuenta de Google',
    soluciones: [
      { titulo: 'No se acuerda la contrasena', descripcion: 'En la cuenta de Google, activar la recuperacion de cuenta.' },
      { titulo: 'Equipo cuestionable', descripcion: 'Equipo de procedencia ilegitima. Se recomienda rechazar.' },
      { titulo: 'Software', descripcion: 'Se debe eliminar toda la informacion del equipo. Formateo requerido.' },
    ],
  },
  {
    id: 'calienta-junto-bateria',
    nombre: 'El celular calienta junto a la bateria',
    soluciones: [
      { titulo: 'Bateria', descripcion: 'Bateria danada o desgastada. Se recomienda cambio de bateria.' },
      { titulo: 'Software', descripcion: 'Problemas en software danado. Se recomienda formateo o Flasheo.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa.' },
    ],
  },
  {
    id: 'pantalla-rayas-interferencia',
    nombre: 'La pantalla hace rayas como de interferencia, lluvia o lineas de colores',
    soluciones: [
      { titulo: 'Modulo de imagen', descripcion: 'Modulo danado, mal conectado, sucio o faltante.' },
      { titulo: 'Conectores', descripcion: 'Conectores FPC de placa o del modulo danados, sucios o desconectados.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de imagen.' },
    ],
  },
  {
    id: 'sonido-solo-acerca-oreja',
    nombre: 'Solo se escucha el sonido cuando lo acerco a la oreja',
    soluciones: [
      { titulo: 'Parlantes', descripcion: 'Parlante altavoz danado, mal conectado, sucio, desconectado o faltante.' },
      { titulo: 'Conectores', descripcion: 'Conectores de presion de placa o del parlante danados.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de Audio.' },
    ],
  },
  {
    id: 'sonido-solo-altavoz',
    nombre: 'Solo se escucha el sonido en altavoz (en llamada o en audios)',
    soluciones: [
      { titulo: 'Parlantes', descripcion: 'Parlante auricular danado, mal conectado, sucio o desconectado.' },
      { titulo: 'Conectores', descripcion: 'Conectores de presion de placa o del parlante danados.' },
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuito de Audio.' },
    ],
  },
  {
    id: 'triangulo-amarillo',
    nombre: 'Aparece un triangulo amarillo al encender o cargar',
    soluciones: [
      { titulo: 'Sulfato / suciedad', descripcion: 'Danos o fallas producidos por presencia de sulfato o suciedad.' },
      { titulo: 'Placa Madre', descripcion: 'Falla, cortocircuito o fuga en placa. Revisar Circuitos de carga, encendido o termistores.' },
    ],
  },
];

// ============================================
// FUNCIONES DE BUSQUEDA
// ============================================

/**
 * getFallaNames: Obtiene todos los nombres de fallas
 * ===================================================
 *
 * Retorna un array con solo los nombres, usado en el buscador
 * para mostrar sugerencias mientras el usuario escribe.
 *
 * @returns Array de strings con los nombres
 */
export const getFallaNames = (): string[] => {
  // .map() extrae solo el campo 'nombre' de cada falla
  return fallasData.map((f) => f.nombre);
};

/**
 * getFallaById: Busca una falla por su ID
 * ======================================
 *
 * @param id - El ID de la falla a buscar
 * @returns La falla encontrada o undefined si no existe
 */
export const getFallaById = (id: string): Falla | undefined => {
  // .find() retorna el primer elemento que cumple la condicion
  return fallasData.find((f) => f.id === id);
};

/**
 * getFallaByName: Busca una falla por su nombre
 * =============================================
 *
 * @param nombre - El nombre de la falla a buscar (case insensitive)
 * @returns La falla encontrada o undefined si no existe
 */
export const getFallaByName = (nombre: string): Falla | undefined => {
  // Convertimos ambos a minusculas para buscar sin importar mayusculas
  return fallasData.find(
    (f) => f.nombre.toLowerCase() === nombre.toLowerCase()
  );
};

/**
 * searchFallas: Busca fallas que coincidan con un termino
 * =======================================================
 *
 * Busca en el nombre de la falla Y en sus soluciones.
 *
 * @param query - Termino de busqueda
 * @returns Array de fallas que coinciden
 */
export const searchFallas = (query: string): Falla[] => {
  // Convertimos a minusculas para buscar sin importar mayusculas
  const lowerQuery = query.toLowerCase();

  return fallasData.filter((f) =>
    // Buscar en el nombre de la falla
    f.nombre.toLowerCase().includes(lowerQuery) ||
    // O buscar en alguna solucion
    f.soluciones.some((s) =>
      s.titulo.toLowerCase().includes(lowerQuery) ||
      s.descripcion.toLowerCase().includes(lowerQuery)
    )
  );
};
