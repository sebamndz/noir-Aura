jQuery(function ($) {
  const graphqlURL = "https://TU-WORDPRESS.com/graphql"; // si existe
  const fallbackURL = "./productos.json";

  const categoriaSelect = $("#categoriaFiltro");
  const productosContainer = $("#productos");

  if (!categoriaSelect.length || !productosContainer.length) return;

  let todosLosProductos = [];

  function renderProductos(lista) {
    productosContainer.empty();

    if (!lista.length) {
      productosContainer.html("<p class='text-center'>No hay productos.</p>");
      return;
    }

    lista.forEach((p) => {
      const card = $(`
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
      productosContainer.append(card);
    });
  }

  function cargarCategorias() {
    const categorias = [...new Set(todosLosProductos.map(p => p.categoria))];
    categoriaSelect.find("option:not(:first)").remove();
    categorias.forEach(cat => {
      categoriaSelect.append(`<option value="${cat}">${cat}</option>`);
    });
  }

  function mostrarProductosFiltrados() {
    const cat = categoriaSelect.val();
    const filtrados = cat
      ? todosLosProductos.filter(p => p.categoria === cat)
      : todosLosProductos;
    renderProductos(filtrados);
  }

  // INTENTA GRAPHQL
  fetch(graphqlURL, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      query: `query { productos(first: 10){ nodes{ title } } }`
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data?.data?.productos?.nodes?.length) {
      console.log("GraphQL activo (pero demo usa JSON igual)");
      throw new Error("Usando demo"); // fuerza fallback
    }
  })
  .catch(() => {
    // FALLBACK DEMO
    fetch(fallbackURL)
      .then(r => r.json())
      .then(json => {
        todosLosProductos = json;
        cargarCategorias();
        mostrarProductosFiltrados();
      });
  });

  categoriaSelect.on("change", mostrarProductosFiltrados);
});
