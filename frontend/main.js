document.addEventListener("DOMContentLoaded", () => {
  
  const container = document.getElementById("featured-products");

  // Si no existe el contenedor en esta página, sal sin error
  if (!container) return;

  const query = `
    query {
      productos(first: 100) {
        nodes {
          title
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          camposparaproducto {
            titulo
            descripcion
            precio
            imagen {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `;

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.errors?.length) {
        console.error("GraphQL errors:", res.errors);
      }

      const productos = res?.data?.productos?.nodes || [];

      if (!productos.length) {
        container.innerHTML = `<p class="text-white">No hay productos disponibles.</p>`;
        return;
      }

      productos.forEach((p) => {
        // ✅ Aquí está la clave: leer el MISMO nombre que en el query
        const campos = p?.camposparaproducto || {};

        const titulo = campos.titulo || p.title || "Producto";
        const descripcion = campos.descripcion || "Sin descripción";
        const precio = campos.precio || "No disponible";

        // Prioriza imagen ACF; si no, usa featuredImage
        const imgUrl =
          campos?.imagen?.node?.sourceUrl || p?.featuredImage?.node?.sourceUrl || "";
        const imgAlt =
          campos?.imagen?.node?.altText ||
          p?.featuredImage?.node?.altText ||
          titulo;

        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
          <div class="card bg-dark text-white border-secondary h-100">
            ${imgUrl ? `<img src="${imgUrl}" class="card-img-top" alt="${imgAlt}">` : ""}
            <div class="card-body">
              <h5 class="card-title">${titulo}</h5>
              <p class="card-text">${descripcion}</p>
              <p class="card-text fw-bold">$${precio}</p>
            </div>
          </div>
        `;

        container.appendChild(col);
      });
    })
    .catch((err) => {
      console.error("Error al obtener productos:", err);
      container.innerHTML = `<p class="text-danger">Ocurrió un error al cargar los productos.</p>`;
    });
});
