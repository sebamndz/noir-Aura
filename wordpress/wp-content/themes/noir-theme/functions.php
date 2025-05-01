<?php
require_once get_template_directory() . '/assets/inc/class-wp-bootstrap-navwalker.php';
require get_template_directory() . '/assets/inc/walker-menu.php';

function noir_aura_enqueue_assets() {
  // CSS local
  wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/assets/bootstrap-5.3.5-dist/css/bootstrap.min.css', [], '5.3.3');
  wp_enqueue_style('noir-aura-style', get_template_directory_uri() . '/assets/css/style.css', [], '1.0');

  // JS local
  wp_enqueue_script('bootstrap-js', get_template_directory_uri() . '/assets/bootstrap-5.3.5-dist/js/bootstrap.bundle.min.js', [], '5.3.3', true);
  wp_enqueue_script('noir-aura-main', get_template_directory_uri() . '/assets/js/main.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'noir_aura_enqueue_assets');

// Soporte adicional
add_theme_support('post-thumbnails');
add_theme_support('title-tag');

add_action('after_setup_theme', function () {
  if (class_exists('WPGraphQL')) {
    add_theme_support('graphql');
  }
});

register_nav_menus([
  'menu-principal' => __('Menú Principal', 'noir-aura')
]);

// Registrar Custom Post Type 'producto'
function noir_aura_register_product_post_type() {
    $args = array(
        'labels' => array(
            'name' => 'Productos',
            'singular_name' => 'Producto',
            'add_new' => 'Añadir Producto',
            'add_new_item' => 'Añadir nuevo producto',
            'edit_item' => 'Editar Producto',
            'new_item' => 'Nuevo Producto',
            'view_item' => 'Ver Producto',
            'search_items' => 'Buscar Productos',
            'not_found' => 'No se han encontrado productos',
            'not_found_in_trash' => 'No se han encontrado productos en la papelera',
            'menu_name' => 'Productos',
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-cart',
        'show_in_rest' => true,
        'taxonomies' => ['categoriaProductos'],
        'show_in_graphql' => true,
        'graphql_single_name' => 'producto',      // minúscula, consistente con query
        'graphql_plural_name' => 'productos',
    );
    register_post_type('producto', $args);
}

add_action('init', 'noir_aura_register_product_post_type');

// Registrar taxonomía 'categoria_producto'
function noir_aura_register_product_category_taxonomy() {
    $args = array(
        'labels' => array(
            'name' => 'Categorías de Productos',
            'singular_name' => 'Categoría de Producto',
            'search_items' => 'Buscar Categorías',
            'all_items' => 'Todas las Categorías',
            'parent_item' => 'Categoría Padre',
            'parent_item_colon' => 'Categoría Padre:',
            'edit_item' => 'Editar Categoría',
            'update_item' => 'Actualizar Categoría',
            'add_new_item' => 'Añadir Nueva Categoría',
            'new_item_name' => 'Nombre de la Nueva Categoría',
            'menu_name' => 'Categorías de Productos',
        ),
        'hierarchical' => true,
        'public' => true,
        'show_in_rest' => true, // Habilitar soporte para REST API (GraphQL)
        'show_admin_column' => true,
        'query_var' => true,
        'capability_type' => 'post',
        'show_in_graphql' => true, // Habilitar soporte para GraphQL
        'graphql_single_name' => 'CategoriaProducto', // Nombre singular para GraphQL
        'graphql_plural_name' => 'CategoriaProductos', // Nombre plural para GraphQL
    );
    register_taxonomy('categoria_producto', array('producto'), $args);
}
add_action('init', 'noir_aura_register_product_category_taxonomy');

// Registrar Menú
function noir_aura_register_menus() {
    register_nav_menus([
      'menu_principal' => __('Menú Principal', 'noir-aura'),
    ]);
}
add_action('after_setup_theme', 'noir_aura_register_menus');
?>
