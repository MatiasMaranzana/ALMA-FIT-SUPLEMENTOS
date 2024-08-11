function renderCarrito() {
    const carrito = cargarCarritoLS();
    let contenidoHtml = "";

    if (carrito.length > 0) {
        contenidoHtml = `
        <table class="table">
            <thead>
                <tr>
                    <th></th>
                    <th class="text-center">Nombre</th>
                    <th class="text-center">Sabor</th>
                    <th class="text-center">Marca</th>
                    <th class="text-center">Precio</th>
                    <th class="text-center">Cantidad</th>
                    <th class="text-end">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="text-end" colspan="7">
                        <button class="btn btn-danger btn-sm" onclick="vaciarCarrito();">
                            Vaciar Carrito <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`;
        
        let totalCantidad = 0;
        let totalPrecio = 0;

        for (const suplemento of carrito) {
            totalCantidad += suplemento.cantidad;
            totalPrecio += suplemento.precio * suplemento.cantidad;

            contenidoHtml += `
            <tr>
                <td><img src="${suplemento.imagen}" alt="${suplemento.nombre}" width="50"></td>
                <td class="text-center align-middle">${suplemento.nombre}</td>
                <td class="text-center align-middle">${suplemento.sabor}</td>
                <td class="text-center align-middle">${suplemento.marca}</td>
                <td class="text-center align-middle">$${suplemento.precio.toFixed(2)}</td>
                <td class="text-center align-middle">${suplemento.cantidad}</td>
                <td class="text-end align-middle">
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${suplemento.codigo});">
                        Eliminar <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        }

        contenidoHtml += `
            <tr>
                <td colspan="5" class="text-end"><strong>Total:</strong></td>
                <td class="text-center"><strong>${totalCantidad}</strong></td>
                <td class="text-end"><strong>$${totalPrecio.toFixed(2)}</strong></td>
            </tr>
            </tbody>
        </table>`;
    } else {
        contenidoHtml = `
        <div class="alert alert-dark my-5 text-center" role="alert">
            <p>No se encontraron productos en el carrito!</p>
        </div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHtml;
}

renderCarrito();
