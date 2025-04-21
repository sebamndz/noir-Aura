<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php bloginfo('name'); ?></title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">

  <?php wp_head(); ?>
</head>
<body class="bg-black text-white">
<header class="bg-dark text-white">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container flex-column">
      
      <!-- TÍTULO CENTRADO -->
      <a class="navbar-brand mx-auto fs-3" href="<?php echo home_url(); ?>">NOIR AURA</a>

      <!-- Botón hamburguesa centrado -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menú -->
      <div class="collapse navbar-collapse justify-content-center" id="menuPrincipal">
        <?php
        wp_nav_menu([
          'theme_location' => 'menu_principal',
          'container' => false,
          'menu_class' => 'navbar-nav text-center',
          'walker' => new NoirAura_Walker_Nav_Menu()
        ]);
        ?>
      </div>
      
    </div>
  </nav>
</header>

