document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("featured-products");

  if (!container) {
    console.error("No existe el contenedor #featured-products");
    return;
  }

  const JSON_URL = "./productos.json"; // debe estar en la misma carpeta

  function render(productos) {
    container.innerHTML = "";

    if (!productos.length) {
      container.innerHTML = "<p>No hay productos.</p>";
      return;
    }

    productos.forEach((p) => {
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

      container.appendChild(col);
    });
  }

  // 🔥 CARGA FORZADA DESDE JSON
  fetch(JSON_URL)
    .then((res) => {
      console.log("Intentando cargar:", JSON_URL, res.status);
      if (!res.ok) throw new Error("No se pudo cargar productos.json");
      return res.json();
    })
    .then((json) => {
      console.log("PRODUCTOS CARGADOS:", json);
      render(json);
    })
    .catch((err) => {
      console.error("ERROR cargando productos.json:", err);
      container.innerHTML = `
        <div class="text-danger">
          <p>Error cargando productos.json</p>
          <p>Prueba abrir directamente:</p>
          <code>${location.origin}/productos.json</code>
        </div>
      `;
    });
});
