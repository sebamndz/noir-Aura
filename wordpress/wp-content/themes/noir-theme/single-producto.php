<?php
/**
 * Template Name: Detalle Producto
 */

get_header();

if (have_posts()) :
    while (have_posts()) : the_post(); ?>
        <div class="container py-5">
            <h1 class="text-center mb-4"><?php the_title(); ?></h1>
            <div class="row">
                <div class="col-md-6">
                    <?php if (has_post_thumbnail()) : ?>
                        <img src="<?php the_post_thumbnail_url('large'); ?>" class="img-fluid" alt="<?php the_title(); ?>">
                    <?php endif; ?>
                </div>
                <div class="col-md-6">
                    <h2>Descripción</h2>
                    <p><?php the_content(); ?></p>
                    <h3 class="mt-4">Precio: $<?php echo get_field('precio'); ?></h3>
                </div>
            </div>
        </div>
    <?php endwhile;
else :
    echo '<p class="text-center">No se encontró el producto.</p>';
endif;

get_footer();