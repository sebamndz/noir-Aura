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
      </select>
    </div>
  </div>

  <!-- Productos cargados dinámicamente -->
  <div class="row" id="productosContainer">
    <p class="text-center">Cargando productos...</p>
  </div>
</div>

<?php get_footer(); ?>
