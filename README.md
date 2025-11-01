# Elementor Slider Filter

Plugin de WordPress para crear sliders usando Slick Slider en contenedores de Elementor.

## Descripción

Este plugin permite convertir cualquier contenedor de Elementor en un slider funcional usando la biblioteca Slick Slider. Solo necesitas agregar la clase CSS `slider-filter-container` a tu contenedor de Elementor.

## Instalación

1. Sube la carpeta `elementor-slider-filter` al directorio `/wp-content/plugins/` de tu WordPress
2. Activa el plugin desde el menú "Plugins" en WordPress
3. ¡Listo para usar!

## Uso

### Configuración en Elementor

1. Crea una sección o contenedor en Elementor
2. Añade la clase CSS `slider-filter-container` al contenedor:
   - Selecciona el contenedor
   - Ve a la pestaña "Avanzado"
   - En "Clases CSS", añade: `slider-filter-container`

3. Dentro de este contenedor, añade los contenedores hijos que quieres que sean los slides
4. Cada contenedor hijo puede contener lo que quieras: filtros, imágenes, texto, etc.

### Ejemplo de estructura

```
Contenedor (slider-filter-container)
├── Contenedor hijo 1
│   └── Tu contenido (filtro, imagen, etc.)
├── Contenedor hijo 2
│   └── Tu contenido (filtro, imagen, etc.)
└── Contenedor hijo 3
    └── Tu contenido (filtro, imagen, etc.)
```

## Configuración del Slider

Por defecto, el slider viene con la siguiente configuración:

- **Slides visibles**: 3 en desktop, 2 en tablet, 1 en móvil
- **Flechas de navegación**: Sí
- **Puntos de navegación**: Sí
- **Reproducción automática**: No
- **Desplazamiento infinito**: Sí

### Personalizar configuración

Para personalizar la configuración, puedes modificar el archivo `elementor-slider-filter.php` en la línea donde se define `slickConfig`:

```php
'slickConfig' => array(
    'slidesToShow' => 3,        // Número de slides visibles
    'slidesToScroll' => 1,      // Número de slides al desplazar
    'dots' => true,             // Mostrar puntos
    'arrows' => true,           // Mostrar flechas
    'infinite' => true,         // Bucle infinito
    'autoplay' => false,        // Reproducción automática
    'autoplaySpeed' => 3000,    // Velocidad de autoplay (ms)
    // ... más opciones
)
```

### Opciones disponibles de Slick Slider

Puedes usar cualquier opción de Slick Slider. Consulta la documentación oficial: https://kenwheeler.github.io/slick/

Algunas opciones útiles:
- `speed`: Velocidad de transición
- `fade`: Usar efecto fade en lugar de slide
- `vertical`: Slider vertical
- `centerMode`: Centrar el slide activo
- `variableWidth`: Permitir anchos variables
- Y muchas más...

## Funciones JavaScript disponibles

El plugin expone algunas funciones útiles en el objeto `window`:

```javascript
// Destruir todos los sliders
window.destroySliderFilter();

// Reinicializar todos los sliders
window.reinitSliderFilter();
```

## Compatibilidad

- WordPress 5.0+
- Elementor 3.0+
- jQuery (incluido con WordPress)

## Personalización CSS

Puedes personalizar los estilos editando el archivo `assets/css/slider-filter.css` o añadiendo tus propios estilos CSS en:
- El personalizador de WordPress
- Tu tema hijo
- Elementor > Configuración > Personalizar CSS

### Clases CSS importantes

```css
.slider-filter-container              /* Contenedor principal */
.slider-filter-container .slick-slide /* Cada slide */
.slider-filter-container .slick-prev  /* Flecha anterior */
.slider-filter-container .slick-next  /* Flecha siguiente */
.slider-filter-container .slick-dots  /* Puntos de navegación */
```

## Soporte

Para reportar problemas o sugerencias, contacta al desarrollador.

## Licencia

GPL v2 o posterior

## Créditos

- Utiliza [Slick Slider](https://kenwheeler.github.io/slick/) de Ken Wheeler
