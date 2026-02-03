document.addEventListener("DOMContentLoaded", () => {
  const categoriaSelect = document.getElementById("categoriaFiltro");
  const productosContainer = document.getElementById("productos");

  if (!categoriaSelect || !productosContainer) {
    console.error("No existen #categoriaFiltro o #productos en el HTML");
    return;
  }

  const JSON_URL = "./productos.json"; // debe estar en la misma carpeta

  let productos = [];

  function render(lista) {
    productosContainer.innerHTML = "";

    if (!lista.length) {
      productosContainer.innerHTML = "<p>No hay productos.</p>";
      return;
    }

    lista.forEach((p) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card bg-dark text-white border-secondary h-100">
          <img src="${p.imagen}" class="card-img-top" alt="${p.titulo}">
          <div class="card-body">
            <h5 class="card-title">${p.titulo}</h5>
            <p class="card-text">${p.descripcion}</p>
            <p class="card-text fw-bold">$${p.precio}</p>
          </div>
        </div>
      `;

      productosContainer.appendChild(col);
    });
  }

  function cargarCategorias() {
    const categorias = [...new Set(productos.map(p => p.categoria))];
    categoriaSelect.innerHTML = `<option value="">Todas</option>`;
    categorias.forEach(cat => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categoriaSelect.appendChild(opt);
    });
  }

  function filtrar() {
    const cat = categoriaSelect.value;
    const lista = cat ? productos.filter(p => p.categoria === cat) : productos;
    render(lista);
  }

  // 🔥 CARGA FORZADA
  fetch(JSON_URL)
    .then(res => {
      console.log("Intentando cargar:", JSON_URL, res.status);
      if (!res.ok) throw new Error("No se pudo cargar productos.json");
      return res.json();
    })
    .then(json => {
      console.log("PRODUCTOS JSON CARGADOS:", json);
      productos = json;
      cargarCategorias();
      filtrar();
    })
    .catch(err => {
      console.error("ERROR JSON:", err);
      productosContainer.innerHTML = `
        <div class="text-danger">
          <p>Error cargando productos.json</p>
          <p>Revisa en el navegador:</p>
          <code>${location.origin}/productos.json</code>
        </div>
      `;
    });

  categoriaSelect.addEventListener("change", filtrar);
});
