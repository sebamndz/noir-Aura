<?php
class NoirAura_Walker_Nav_Menu extends Walker_Nav_Menu {
  public function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ) {
    $output .= '<li class="nav-item">';

    $icon_class = '';
    switch (strtolower($item->title)) {
      case 'inicio': $icon_class = 'bi-house-door'; break;
      case 'tienda': $icon_class = 'bi-bag'; break;
      case 'categorías': $icon_class = 'bi-tags'; break;
      case 'contacto': $icon_class = 'bi-envelope'; break;
      case 'blog': $icon_class = 'bi-journal-text'; break;
      default: $icon_class = 'bi-circle'; break;
    }

    $attributes = ' class="nav-link"';
    $attributes .= !empty( $item->url ) ? ' href="' . esc_attr( $item->url ) . '"' : '';

    $output .= '<a' . $attributes . '>';
    $output .= '<i class="bi ' . esc_attr($icon_class) . ' me-2"></i>';
    $output .= esc_html( $item->title );
    $output .= '</a></li>';
  }
}
