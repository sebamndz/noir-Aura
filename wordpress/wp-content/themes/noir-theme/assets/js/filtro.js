document.addEventListener('DOMContentLoaded', () => {
    const graphqlURL = `http://localhost/noir-aura/wordpress/graphql`;
  
    const categoriaSelect = document.getElementById('categoriaFiltro');
    const productosContainer = document.getElementById('productos');
    let todosLosProductos = [];
  
    async function cargarCategorias() {
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
  
      try {
        const res = await fetch(graphqlURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
  
        const data = await res.json();
        const categorias = data.data.categoriaProductos.nodes;
  
        // Agregar opción por defecto
        const optionDefault = document.createElement('option');
        optionDefault.value = '';
        optionDefault.textContent = 'Todas las categorías';
        categoriaSelect.appendChild(optionDefault);
  
        categorias.forEach(categoria => {
          const option = document.createElement('option');
          option.value = categoria.slug;
          option.textContent = categoria.name;
          categoriaSelect.appendChild(option);
        });
      } catch (error) {
        productosContainer.innerHTML = '<p class="text-danger">Error al cargar categorías.</p>';
        console.error(error);
      }
    }
  
    async function cargarProductos() {
      productosContainer.innerHTML = '<p class="text-center">Cargando productos...</p>';
  
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
  
      try {
        const res = await fetch(graphqlURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query })
        });
  
        const data = await res.json();
        todosLosProductos = data?.data?.productos?.nodes || [];
        mostrarProductosFiltrados();
      } catch (error) {
        productosContainer.innerHTML = '<p class="text-danger">Error al cargar productos.</p>';
        console.error(error);
      }
    }
  
    function mostrarProductosFiltrados() {
      const categoriaSeleccionada = categoriaSelect.value;
      productosContainer.innerHTML = '';
  
      const productosFiltrados = categoriaSeleccionada
        ? todosLosProductos.filter(producto =>
            producto.categoriaProductos?.nodes.some(cat => cat.slug === categoriaSeleccionada)
          )
        : todosLosProductos;
  
      if (productosFiltrados.length === 0) {
        productosContainer.innerHTML = '<p class="text-center">No hay productos para esta categoría.</p>';
        return;
      }
  
      productosFiltrados.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
  
        const campos = producto.camposParaProducto;
        if (!campos || !campos.titulo) return;
  
        const sanitizeHTML = (str) => {
          const tempDiv = document.createElement('div');
          tempDiv.textContent = str;
          return tempDiv.innerHTML;
        };
  
        card.innerHTML = `
          <div class="card bg-dark text-white border-secondary h-100">
            ${
              campos.imagen?.node?.sourceUrl
                ? `<img src="${sanitizeHTML(campos.imagen.node.sourceUrl)}" class="card-img-top" alt="${sanitizeHTML(campos.imagen.node.altText || producto.title)}" />`
                : ''
            }
            <div class="card-body">
              <h5 class="card-title">${sanitizeHTML(campos.titulo)}</h5>
              <p class="card-text">${sanitizeHTML(campos.descripcion || '')}</p>
              <p class="card-text fw-bold">$${sanitizeHTML(campos.precio || '0')}</p>
            </div>
          </div>
        `;
  
        productosContainer.appendChild(card);
      });
    }
  
    categoriaSelect.addEventListener('change', mostrarProductosFiltrados);
  
    // Inicializar
    cargarCategorias();
    cargarProductos();
  });
  
  