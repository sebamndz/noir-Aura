<?php get_header(); ?>

<!-- Hero Section -->
<section class="text-center py-5" style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/img/hero.png'); background-size: auto;background-position:center;background-repeat: no-repeat;background-color: #bcbcbc;">
  <div class="container py-5">
    <h2 class="display-4 fw-bold">Estilo Oscuro. Esencia Única.</h2>
    <p class="lead">Descubre la nueva colección de NOIR AURA</p>
    <a href="#" class="btn btn-outline-light mt-3">Ver Colección</a>
  </div>
</section>

<!-- Featured Products -->
<section class="py-5">
  <div class="container">
    <h3 class="mb-4 text-center">Colección Destacada</h3>
    <div class="row" id="featured-products">
      <!-- Aquí JS inyectará productos via GraphQL -->
    </div>
  </div>
</section>

<!-- About -->
<section class="py-5 border-top border-secondary">
  <div class="container text-center">
    <h3 class="mb-3">Sobre la Marca</h3>
    <p class="mx-auto" style="max-width: 600px;">NOIR AURA nace de la fusión entre moda urbana y lujo minimalista. Nos inspira lo oculto, lo elegante, lo eterno.</p>
    <a href="#" class="btn btn-outline-light mt-3">Conócenos</a>
  </div>
</section>

<?php get_footer(); ?>
