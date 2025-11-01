<?php
/**
 * Plugin Name: Elementor Slider Filter
 * Plugin URI: https://example.com/elementor-slider-filter
 * Description: Plugin para crear sliders usando Slick Slider en contenedores de Elementor con la clase slider-filter-container
 * Version: 1.1.0
 * Author: Tu Nombre
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: elementor-slider-filter
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

class Elementor_Slider_Filter {

    /**
     * Constructor
     */
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }

    /**
     * Encolar scripts y estilos
     */
    public function enqueue_scripts() {
        // Slick Slider CSS
        wp_enqueue_style(
            'slick-slider-css',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
            array(),
            '1.8.1'
        );

        // Slick Slider Theme CSS
        wp_enqueue_style(
            'slick-slider-theme-css',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
            array(),
            '1.8.1'
        );

        // Slick Slider JS (requiere jQuery)
        wp_enqueue_script(
            'slick-slider-js',
            'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
            array('jquery'),
            '1.8.1',
            true
        );

        // Nuestro CSS personalizado
        wp_enqueue_style(
            'elementor-slider-filter-css',
            plugin_dir_url(__FILE__) . 'assets/css/slider-filter.css',
            array(),
            '1.1.0'
        );

        // Nuestro JS de inicialización
        wp_enqueue_script(
            'elementor-slider-filter-js',
            plugin_dir_url(__FILE__) . 'assets/js/slider-filter.js',
            array('jquery', 'slick-slider-js'),
            '1.1.0',
            true
        );

        // Pasar configuración al script
        wp_localize_script('elementor-slider-filter-js', 'sliderFilterConfig', array(
            'containerClass' => 'slider-filter-container',
            'slickConfig' => array(
                'slidesToShow' => 3,
                'slidesToScroll' => 1,
                'dots' => true,
                'arrows' => true,
                'infinite' => true,
                'autoplay' => false,
                'autoplaySpeed' => 3000,
                'responsive' => array(
                    array(
                        'breakpoint' => 1024,
                        'settings' => array(
                            'slidesToShow' => 2,
                            'slidesToScroll' => 1
                        )
                    ),
                    array(
                        'breakpoint' => 768,
                        'settings' => array(
                            'slidesToShow' => 1,
                            'slidesToScroll' => 1
                        )
                    )
                )
            )
        ));
    }
}

// Inicializar el plugin
new Elementor_Slider_Filter();
