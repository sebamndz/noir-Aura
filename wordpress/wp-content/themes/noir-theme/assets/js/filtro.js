jQuery(function ($) {
  const graphqlURL = "http://localhost/noir-aura/wordpress/graphql";
  const jwtURL ="http://localhost/noir-aura/wordpress/wp-content/themes/noir-theme/assets/inc/jwt.php";

  const categoriaSelect = $("#categoriaFiltro");
  const productosContainer = $("#productos");

  // Si no estás en la página que tiene el filtro, sal sin romper nada
  if (!categoriaSelect.length || !productosContainer.length) return;

  let todosLosProductos = [];
  let jwtToken = null;

  function sanitizeHTML(str) {
    return $("<div>").text(str ?? "").html();
  }

  function graphqlRequest(query) {
    return $.ajax({
      url: graphqlURL,
      method: "POST",
      contentType: "application/json",
      headers: jwtToken ? { Authorization: "Bearer " + jwtToken } : {},
      data: JSON.stringify({ query }),
    });
  }

  function cargarCategorias() {
    const query = `
      query {
        categoriaProductos {
          nodes {
            name
            slug
          }
        }
      }
    `;

    graphqlRequest(query)
      .done((res) => {
        const categorias = res?.data?.categoriaProductos?.nodes || [];

        // Limpia opciones excepto la primera (por si tienes "Todas")
        categoriaSelect.find("option:not(:first)").remove();

        categorias.forEach((categoria) => {
          categoriaSelect.append(
            $("<option>").val(categoria.slug).text(categoria.name)
          );
        });
      })
      .fail((xhr, status, error) => {
        console.error("Error al cargar categorías:", error, xhr?.responseText);
        productosContainer.html(
          "<p class='text-danger'>Error al cargar categorías.</p>"
        );
      });
  }

  function cargarProductos() {
    productosContainer.html("<p class='text-center'>Cargando productos...</p>");

    const query = `
      query {
        productos(first: 100) {
          nodes {
            title
            slug
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
            categoriaProductos {
              nodes {
                slug
              }
            }
          }
        }
      }
    `;

    graphqlRequest(query)
      .done((res) => {
        todosLosProductos = res?.data?.productos?.nodes || [];
        mostrarProductosFiltrados();
      })
      .fail((xhr, status, error) => {
        console.error("Error al cargar productos:", error, xhr?.responseText);
        productosContainer.html(
          "<p class='text-danger'>Error al cargar productos.</p>"
        );
      });
  }

  function mostrarProductosFiltrados() {
    const categoriaSeleccionada = categoriaSelect.val();
    productosContainer.empty();

    const productosFiltrados = categoriaSeleccionada
      ? todosLosProductos.filter((p) =>
          (p?.categoriaProductos?.nodes || []).some(
            (cat) => cat.slug === categoriaSeleccionada
          )
        )
      : todosLosProductos;

    if (!productosFiltrados.length) {
      productosContainer.html(
        "<p class='text-center'>No hay productos para esta categoría.</p>"
      );
      return;
    }

    productosFiltrados.forEach((producto) => {
      const campos = producto?.camposparaproducto || {};

      if (!campos) return;

      const titulo = campos.titulo || producto.title || "Producto";
      const descripcion = campos.descripcion || "";
      const precio = campos.precio || "0";
      const img = campos?.imagen?.node;

      const card = $(`
        <div class="col-md-4 mb-4">
          <div class="card bg-dark text-white border-secondary h-100">
            ${
              img?.sourceUrl
                ? `<img src="${sanitizeHTML(
                    img.sourceUrl
                  )}" class="card-img-top" alt="${sanitizeHTML(
                    img.altText || titulo
                  )}" />`
                : ""
            }
            <a class="card-body text-decoration-none" href="/noir-aura/wordpress/producto/${sanitizeHTML(producto.slug)}">
              <h5 class="card-title">${sanitizeHTML(titulo)}</h5>
              <p class="card-text">${sanitizeHTML(descripcion)}</p>
              <p class="card-text fw-bold">$${sanitizeHTML(precio)}</p>
            </div>
          </div>
        </a>
      `);

      productosContainer.append(card);
    });
  }

  function obtenerTokenJWT() {
    return $.ajax({
      url: jwtURL,
      method: "GET",
      dataType: "json",
    })
      .done((res) => {
        if (res?.token) jwtToken = res.token;
        else console.warn("No se recibió token JWT. Continuando sin token.");
      })
      .fail((xhr, status, error) => {
        console.warn(
          "No se pudo obtener JWT. Continuando sin token:",
          error,
          xhr?.responseText
        );
      });
  }

  function init() {
    categoriaSelect.on("change", mostrarProductosFiltrados);
    cargarCategorias();
    cargarProductos();
  }

  // Flujo: primero token (si existe), luego init.
  obtenerTokenJWT().always(init);
});
  