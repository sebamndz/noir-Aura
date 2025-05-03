document.addEventListener("DOMContentLoaded", () => {
    const endpoint = "http://localhost/noir-aura/wordpress/graphql";
    const container = document.getElementById("featured-products");

    const query = `
    query {
        categoriaProductos {
            nodes {
                name
            }
        }
        productos {
            nodes {
                title
                slug
                featuredImage {
                    node {
                        sourceUrl
                        altText
                    }
                }
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
            }
        }
    }`;

    // Fetch para obtener productos
    fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    })
        .then((res) => res.json())
        .then((res) => {
            const productos = res?.data?.productos?.nodes;

            if (productos && productos.length > 0) {
                productos.forEach((p) => {
                    const campos = p.camposParaProducto || {};

                    const col = document.createElement("div");
                    col.className = "col-md-4 mb-4";

                    col.innerHTML = `
                        <div class="card bg-dark text-white border-secondary h-100">
                        ${
                            p.featuredImage && p.featuredImage.node && p.featuredImage.node.sourceUrl
                                ? `<img src="${p.featuredImage.node.sourceUrl}" class="card-img-top" alt="${p.featuredImage.node.altText || p.title}">`
                                : ""
                        }
                        <div class="card-body">
                            <h5 class="card-title">${p.title}</h5>
                            <p class="card-text">${campos.descripcion || "Sin descripción"}</p>
                            <p class="card-text fw-bold">$${campos.precio || "No disponible"}</p>
                            ${
                                campos.imagen?.node?.sourceUrl
                                    ? `<img src="${campos.imagen.node.sourceUrl}" alt="${campos.imagen.node.altText || p.title}" class="img-fluid mt-2">`
                                    : ""
                            }
                        </div>
                        </div>
                    `;
                    container.appendChild(col);
                });
            } else {
                container.innerHTML = `<p class="text-white">No hay productos disponibles.</p>`;
            }
        })
        .catch((err) => {
            console.error("Error al obtener productos:", err);
            container.innerHTML = `<p class="text-danger">Ocurrió un error al cargar los productos.</p>`;
        });

    // Integración de jQuery para obtener el token desde jwt.php
    jQuery(function ($) {
        $.ajax({
            url: "http://localhost/noir-aura/wordpress/wp-content/themes/noir-theme/assets/inc/jwt.php",
            method: "GET",
            dataType: "json",
            success: function (res) {
                if (res.token) {
                    console.log("Token recibido:", res.token);

                    // Ejemplo de uso del token para una solicitud protegida
                    fetch(endpoint, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${res.token}`,
                        },
                        body: JSON.stringify({ query }),
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log("Datos protegidos recibidos:", data);
                        })
                        .catch((err) => {
                            console.error("Error al realizar la solicitud protegida:", err);
                        });
                } else {
                    console.error("No se recibió token:", res);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error en la solicitud:", error);
            },
        });
    });
});
