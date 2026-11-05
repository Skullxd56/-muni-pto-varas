# AGENTS.md

## Reglas del Proyecto
- Mantener código limpio y documentado.
- Seguir convenciones de nombres en español.
- No subir archivos sensibles al repositorio.
- Editar directamente los archivos existentes; no crear scripts auxiliares .cjs ni archivos JS de automatización.

## Proyecto
- Municipalidad de Puerto Varas.
- HTML5, CSS3 y JavaScript; Alpine.js y Font Awesome incluidos localmente en vendor/.
- Última actualización: 2026-11-05.

## Archivos y navegación
- index.html es la portada y contiene los accesos a servicios, 15 direcciones/departamentos y seis noticias. Todas sus tarjetas enlazan a páginas HTML existentes. Las vistas de noticias conservan los títulos e imágenes del contenido de portada.
- guia-tramites.html contiene exclusivamente los ocho trámites online.
- tramites-presenciales.html contiene exclusivamente las tres tarjetas de requisitos presenciales (circulación, rentas y patentes, y transparencia). La portada enlaza por separado a ambas páginas.
- patentes-comerciales.html es la página del trámite de patentes comerciales; no agregar un bloque de renovación de patentes de alcoholes.
- direccion-turismo.html reúne atractivos enlazados a Google Maps y cuatro restaurantes con imágenes referenciales; termina tras la sección gastronómica.
- Mantener las páginas de los ocho trámites y las 15 direcciones; Juzgado de Policía Local comparte página en ambos accesos.
- Las tarjetas de departamentos enlazan a sus páginas individuales. Las páginas departamentales tienen descripción y mapa de referencia, salvo Juzgado de Policía Local, que utiliza el diseño unificado de trámite digital sin mapa.

## Estilos e interactividad
- style.css es la única hoja de estilos propia vinculada en los HTML. Incluye las utilidades de Turismo acotadas a #pagina-turismo.
- script.js es el único JavaScript propio vinculado; conserva la preferencia de tema y el orden de Servicios en portada.
- Los HTML mantienen estilos base embebidos. No introducir otra copia global de CSS o JS.
- Paleta institucional morada/lila. Las tarjetas y títulos deben conservar contraste en modo oscuro.
- Tema oscuro: clase .dark-mode y atributo data-theme="oscuro"; preferencias locales dark-mode, theme y tema.
- Navegación común con desplegables Alpine.js para Trámites, Departamentos y Servicios; sus opciones enlazan a archivos HTML. Contacto mantiene el estilo normal del menú. Desde 768px se usa el menú de escritorio. En móvil se abre un panel modal con cierre por Escape, foco contenido, retorno al botón y bloqueo del fondo mediante el estado open del body.
- Los ocho trámites digitales usan la misma estructura: una columna en móvil y áreas principal/lateral 2:1 desde 1024px, alineadas arriba. La izquierda contiene título, descripción y una tarjeta de tres pasos (identificación RUT/ROL, verificación de monto/datos, pago o solicitud en plataforma oficial) con la acción al final. La derecha contiene exactamente dos tarjetas de texto plano: Canales de Atención e Información Útil / Plazos. No agregar mapas, una tarjeta adicional de requisitos, secciones extra ni enlaces complementarios.
- Las acciones principales usan exactamente los destinos indicados por el usuario para cada trámite: e-com (permiso, aseo onlinev4, derechos varios y multas), renovacion.ptovaras.cl/login, puertovaras.domdigital.cl/Account/Login, ptovaras.cl/oirs y filas.ptovaras.cl/tramites/login. Mantener las URLs completas y sus parámetros tal como están en los ocho HTML, sin reemplazarlas por rutas genéricas. Usar target="_blank", rel="noopener noreferrer", margen mt-6 y texto visible únicamente "Pagar" o "Solicitar", sin flechas. Mantener una etiqueta accesible que anuncie la apertura en otra pestaña. No agregar alertas o simulaciones.
- No publicar vencimientos o cuotas sin verificar; remitir a la liquidación o al portal oficial vigente.

## Recursos
- Mantener imágenes en images/ con nombres kebab-case ASCII (minúsculas, sin espacios ni tildes), actualizar todas las referencias al renombrar y respetar mayúsculas/minúsculas para servidores Linux. Mantener dependencias locales con sus licencias en vendor/.
- Cada HTML debe tener un único h1 y cada imagen un alt descriptivo. Los SVG decorativos usan aria-hidden y los gráficos informativos un nombre accesible.
- Todas las rutas internas deben apuntar a archivos existentes y a los nombres canónicos indicados arriba.
