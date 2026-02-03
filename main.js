document.addEventListener("DOMContentLoaded", () => {
  // 🔁 En Vercel no existe localhost, por eso usamos fallback demo
  const endpoint = "http://localhost/noir-aura/wordpress/graphql"; // si lo tienes online cámbialo por https://tu-wp.com/graphql
  const fallbackURL = "./productos.json";

  const container = document.getElementById("featured-products");
  if (!container) return;

  function render(lista) {
    container.innerHTML = "";

    if (!lista.length) {
      container.innerHTML = `<p class="text-white">No hay productos disponibles.</p>`;
      return;
    }

    lista.forEach((p) => {
      const titulo = p.titulo || p.title || "Producto";
      const descripcion = p.descripcion || "Sin descripción";
      const precio = p.precio || "No disponible";
      const imgUrl = p.imagen || p.imgUrl || "";

      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";

      col.innerHTML = `
        <div class="card bg-dark text-white border-secondary h-100">
          ${imgUrl ? `<img src="${imgUrl}" class="card-img-top" alt="${titulo}">` : ""}
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text fw-bold">$${precio}</p>
          </div>
        </div>
      `;

      container.appendChild(col);
    });
  }

  function cargarDesdeJSON() {
    fetch(fallbackURL)
      .then((r) => r.json())
      .then((json) => render(json))
      .catch((err) => {
        console.error("Error cargando productos.json:", err);
        container.innerHTML = `<p class="text-danger">No se pudo cargar productos demo.</p>`;
      });
  }

  const query = `
    query {
      productos(first: 100) {
        nodes {
          title
          slug
          featuredImage { node { sourceUrl altText } }
          camposparaproducto {
            titulo
            descripcion
            precio
            imagen { node { sourceUrl altText } }
          }
        }
      }
    }
  `;

  // Intento GraphQL
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.errors?.length) {
        console.warn("GraphQL errors, usando demo:", res.errors);
        cargarDesdeJSON();
        return;
      }

      const productos = res?.data?.productos?.nodes || [];
      if (!productos.length) {
        // Si no hay productos reales, igual mostramos demo
        cargarDesdeJSON();
        return;
      }

      // Normaliza WP → formato simple
      const lista = productos.map((p) => {
        const campos = p?.camposparaproducto || {};
        return {
          titulo: campos.titulo || p.title,
          descripcion: campos.descripcion,
          precio: campos.precio,
          imagen:
            campos?.imagen?.node?.sourceUrl ||
            p?.featuredImage?.node?.sourceUrl ||
            "",
        };
      });

      render(lista);
    })
    .catch(() => {
      // Si endpoint no existe (Vercel), muestra demo
      cargarDesdeJSON();
    });
});
