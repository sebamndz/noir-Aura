jQuery(function ($) {
  const categoriaSelect = $("#categoriaFiltro");
  const productosContainer = $("#productos");

  if (!categoriaSelect.length || !productosContainer.length) return;

  const fallbackURL = "./productos.json";
  let productos = [];

  function render(lista) {
    productosContainer.empty();

    if (!lista.length) {
      productosContainer.html("<p class='text-center'>No hay productos.</p>");
      return;
    }

    lista.forEach((p) => {
      productosContainer.append(`
        <div class="col-md-4 mb-4">
          <div class="card bg-dark text-white border-secondary h-100">
            <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
            <div class="card-body">
              <h5 class="card-title">${p.titulo}</h5>
              <p class="card-text">${p.descripcion}</p>
              <p class="card-text fw-bold">$${p.precio}</p>
            </div>
          </div>
        </div>
      `);
    });
  }

  function cargarCategorias() {
    const cats = [...new Set(productos.map(p => p.categoria))];
    categoriaSelect.find("option:not(:first)").remove();
    cats.forEach(c => categoriaSelect.append(`<option value="${c}">${c}</option>`));
  }

  function filtrar() {
    const cat = categoriaSelect.val();
    const lista = cat ? productos.filter(p => p.categoria === cat) : productos;
    render(lista);
  }

  fetch(fallbackURL)
    .then(r => {
      if (!r.ok) throw new Error(`No se pudo cargar ${fallbackURL} (${r.status})`);
      return r.json();
    })
    .then(json => {
      productos = json;
      console.log("JSON cargado OK:", productos.length, productos);
      cargarCategorias();
      filtrar();
    })
    .catch(err => {
      console.error("Fallo cargando productos.json:", err);
      productosContainer.html("<p class='text-danger'>No se pudo cargar productos.json</p>");
    });

  categoriaSelect.on("change", filtrar);
});
