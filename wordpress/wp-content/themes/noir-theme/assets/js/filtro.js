jQuery(document).ready(function ($) {
    const graphqlURL = "http://localhost/noir-aura/wordpress/graphql";
    const categoriaSelect = $("#categoriaFiltro");
    const productosContainer = $("#productos");
    let todosLosProductos = [];
    const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0L25vaXItYXVyYS93b3JkcHJlc3MiLCJpYXQiOjE3NDYxMzczNDEsIm5iZiI6MTc0NjEzNzM0MSwiZXhwIjoxNzQ2NzQyMTQxLCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.IcGaJ__AnK7rpQN7pFZfkUtFdTK19HRovkfc23m36AQ"; // Replace with your actual JWT token

    // Verificar si los elementos del DOM existen
    if (categoriaSelect.length === 0) {
        console.error("Error: No se encontró el elemento con el ID 'categoriaFiltro'.");
        return;
    }
    if (productosContainer.length === 0) {
        console.error("Error: No se encontró el elemento con el ID 'productos'.");
        return;
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

        $.ajax({
            url: graphqlURL,
            method: "POST",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + jwtToken,
            },
            data: JSON.stringify({ query }),
            success: function (res) {
                const categorias = res?.data?.categoriaProductos?.nodes || [];
                if (categorias.length === 0) {
                    console.warn("No se encontraron categorías.");
                }
                categorias.forEach((categoria) => {
                    categoriaSelect.append(
                        $("<option>").val(categoria.slug).text(categoria.name)
                    );
                });
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar categorías:", error);
                productosContainer.html("<p class='text-danger'>Error al cargar categorías.</p>");
            },
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
              camposParaProducto {
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

        $.ajax({
            url: graphqlURL,
            method: "POST",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + jwtToken,
            },
            data: JSON.stringify({ query }),
            success: function (res) {
                todosLosProductos = res?.data?.productos?.nodes || [];
                if (todosLosProductos.length === 0) {
                    console.warn("No se encontraron productos.");
                }
                mostrarProductosFiltrados();
            },
            error: function (xhr, status, error) {
                console.error("Error al cargar productos:", error);
                productosContainer.html("<p class='text-danger'>Error al cargar productos.</p>");
            },
        });
    }

    function sanitizeHTML(str) {
        return $("<div>").text(str).html();
    }

    function mostrarProductosFiltrados() {
        const categoriaSeleccionada = categoriaSelect.val();
        productosContainer.empty();

        const productosFiltrados = categoriaSeleccionada
            ? todosLosProductos.filter((p) =>
                  p.categoriaProductos.nodes.some((cat) => cat.slug === categoriaSeleccionada)
              )
            : todosLosProductos;

        if (productosFiltrados.length === 0) {
            productosContainer.html("<p class='text-center'>No hay productos para esta categoría.</p>");
            return;
        }

        productosFiltrados.forEach((producto) => {
            const campos = producto.camposParaProducto;
            if (!campos || !campos.titulo) return;

            const card = $(`
          <div class="col-md-4 mb-4">
            <div class="card bg-dark text-white border-secondary h-100">
              ${
                  campos.imagen?.node?.sourceUrl
                      ? `<img src="${sanitizeHTML(campos.imagen.node.sourceUrl)}" class="card-img-top" alt="${sanitizeHTML(campos.imagen.node.altText || producto.title)}" />`
                      : ""
              }
              <div class="card-body">
                <h5 class="card-title">${sanitizeHTML(campos.titulo)}</h5>
                <p class="card-text">${sanitizeHTML(campos.descripcion || "")}</p>
                <p class="card-text fw-bold">$${sanitizeHTML(campos.precio || "0")}</p>
              </div>
            </div>
          </div>
        `);

            productosContainer.append(card);
        });
    }

    categoriaSelect.on("change", mostrarProductosFiltrados);

    // Inicializar
    cargarCategorias();
    cargarProductos();
});
