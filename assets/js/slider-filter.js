(function($) {
    'use strict';

    /**
     * Inicializar Slick Slider cuando el documento esté listo
     */
    $(document).ready(function() {
        initSliderFilter();
    });

    /**
     * Reinicializar después de cargar contenido con Elementor
     */
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/widget', function() {
            initSliderFilter();
        });
    });

    /**
     * Función para inicializar el slider
     */
    function initSliderFilter() {
        const containerClass = sliderFilterConfig.containerClass || 'slider-filter-container';
        const slickConfig = sliderFilterConfig.slickConfig || {};

        // Buscar todos los contenedores que no han sido inicializados
        $('.' + containerClass).each(function() {
            const $container = $(this);

            // Verificar si ya fue inicializado
            if ($container.hasClass('slick-initialized')) {
                return;
            }

            // Contar los hijos directos
            const slideCount = $container.children().length;

            // Solo inicializar si hay elementos
            if (slideCount > 0) {
                // Ajustar configuración si hay menos slides que slidesToShow
                let config = $.extend(true, {}, slickConfig);

                if (slideCount <= config.slidesToShow) {
                    config.slidesToShow = slideCount;
                    config.infinite = false;
                }

                // Inicializar Slick Slider
                try {
                    $container.slick(config);
                    console.log('Slick Slider inicializado en:', $container);
                } catch (error) {
                    console.error('Error al inicializar Slick Slider:', error);
                }
            }
        });
    }

    /**
     * Función para destruir sliders (útil para actualización dinámica)
     */
    window.destroySliderFilter = function() {
        const containerClass = sliderFilterConfig.containerClass || 'slider-filter-container';

        $('.' + containerClass).each(function() {
            if ($(this).hasClass('slick-initialized')) {
                $(this).slick('unslick');
            }
        });
    };

    /**
     * Función para reinicializar sliders
     */
    window.reinitSliderFilter = function() {
        destroySliderFilter();
        initSliderFilter();
    };

})(jQuery);
