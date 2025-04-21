<?php
/* Template Name: Tienda */
get_header(); ?>

<div class="container py-5">
  <h1 class="text-center mb-4">Tienda</h1>

  <!-- Filtro de categorías -->
  <div class="row mb-4">
    <div class="col-md-6 offset-md-3">
      <select id="categoriaFiltro" class="form-select">
        <option value="">Todas las categorías</option>
        <!-- Opciones agregadas con JS -->
      </select>
    </div>
  </div>

  <!-- Productos cargados dinámicamente -->
  <div class="row" id="productos">
    <p class="text-center">Cargando productos...</p>
  </div>
</div>

<!-- Script para GraphQL -->
<script src="<?php echo get_template_directory_uri(); ?>/assets/js/filtro.js"></script>

<?php get_footer(); ?>
