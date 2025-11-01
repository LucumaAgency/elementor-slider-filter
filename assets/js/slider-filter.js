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

                    // Reinicializar dropdowns de JetSmartFilters después de Slick
                    setTimeout(function() {
                        initDropdowns($container);
                    }, 100);

                    // Cerrar dropdowns al cambiar de slide
                    $container.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                        $container.find('.jet-filter-items-dropdown').removeClass('jet-dropdown-open');
                    });
                } catch (error) {
                    console.error('Error al inicializar Slick Slider:', error);
                }
            }
        });
    }

    /**
     * Función para inicializar dropdowns de JetSmartFilters
     */
    function initDropdowns($container) {
        // Encontrar todos los dropdowns (excluyendo slides clonados)
        const $allDropdowns = $container.find('.slick-slide:not(.slick-cloned) .jet-filter-items-dropdown');

        console.log('Total dropdowns encontrados:', $allDropdowns.length);

        $allDropdowns.each(function(index) {
            const $dropdown = $(this);
            const $label = $dropdown.find('.jet-filter-items-dropdown__label');

            // Remover event listeners anteriores
            $label.off('click.sliderFilter');

            // Agregar nuevo event listener
            $label.on('click.sliderFilter', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Toggle dropdown
                $dropdown.toggleClass('jet-dropdown-open');

                // Cerrar otros dropdowns de TODOS los slides
                $container.find('.jet-filter-items-dropdown').not($dropdown).removeClass('jet-dropdown-open');

                console.log('Dropdown', index, 'toggled:', $dropdown.hasClass('jet-dropdown-open'));
            });

            console.log('Event listener agregado al dropdown', index);
        });

        // Cerrar dropdowns al hacer click fuera
        $(document).off('click.sliderFilterDropdown').on('click.sliderFilterDropdown', function(e) {
            if (!$(e.target).closest('.jet-filter-items-dropdown').length) {
                $container.find('.jet-filter-items-dropdown').removeClass('jet-dropdown-open');
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
