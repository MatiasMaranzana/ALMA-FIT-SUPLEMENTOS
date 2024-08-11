fetch("json/suplementos.json")
.then(response => response.json())
.then(data => {
    console.log(data);
    let contenidoHtml = "";

    data.forEach(suplemento => {
        contenidoHtml += `<div class= "col-md-4">
        <div class="card border-0">
        <img src="${suplemento.imagen}" class="card-img-top" alt="${suplemento.nombre}">
            <div class="card-body text-center">
                <p class="card-text">${suplemento.nombre} <br> ${suplemento.marca} <br>Sabor: ${suplemento.sabor} <br> $ ${suplemento.precio} </p>
                <p class="card-text"><button class="btn btn-primary" onclick= "agregarProducto(${suplemento.codigo})">Agregar (+)</button></p>
            </div>
        </div>
    </div>`;
        
    });
    document.getElementById("contenido").innerHTML = contenidoHtml;
});

let suplementos = [];

async function cargarSuplementos() {
    try {
        const response = await fetch("../json/suplementos.json"); 
        suplementos = await response.json();
        console.log("Suplementos cargados correctamente.");
        renderSuplementos();
    } catch (error) {
        console.error('Error al obtener el archivo JSON:', error);
    }
}

function renderSuplementos() {
    let contenidoHtml = "";

    suplementos.forEach(suplemento => {
        contenidoHtml += `
        <div class="col-md-4">
            <div class="card border-0">
                <img src="${suplemento.imagen}" class="card-img-top" alt="${suplemento.nombre}">
                <div class="card-body text-center">
                    <p class="card-text">${suplemento.nombre} <br> ${suplemento.marca} <br>Sabor: ${suplemento.sabor} <br> $ ${suplemento.precio} </p>
                    <p class="card-text"><button class="btn btn-primary" onclick="agregarProducto(${suplemento.codigo})">Agregar (+)</button></p>
                </div>
            </div>
        </div>`;
    });

    document.getElementById("contenido").innerHTML = contenidoHtml;
}

function agregarProducto(codigo, cantidad = 1) {
    if (suplementos.length === 0) {
        console.error("Los suplementos aún no han sido cargados.");
        return;
    }
    
    const suplemento = suplementos.find(item => item.codigo === codigo);
    

    if (!suplemento) {
        console.error("El producto con el código dado no existe.");
        return;
    }

    let carrito = cargarCarritoLS();
    
    const productoEnCarrito = carrito.find(item => item.codigo === codigo);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({
            ...suplemento,
            cantidad
        });
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();
    

    Swal.fire({
        title: "Producto agregado",
        text: "El producto se agregó correctamente",
        icon: "success"
    });
    
    renderCarrito();

    console.log(`Se agregaron ${cantidad} unidades del producto al carrito.`);
}

function eliminarProducto(codigo, cantidad = 1) {
    const carrito = cargarCarritoLS();
    const carritoActualizado = carrito.map(item => {
        if (item.codigo === codigo) {
            item.cantidad -= cantidad;
            if (item.cantidad <= 0) {
                return null;
            }
        }
        return item;
    }).filter(item => item !== null);

    guardarCarritoLS(carritoActualizado);
    renderCarrito();

    Swal.fire({
        title: "Producto eliminado",
        text: "El producto se elimino correctamente",
        icon: "error"
    });

    renderBotonCarrito();

    console.log("El producto se eliminó correctamente o se redujo la cantidad.");
}

function renderBotonCarrito() {
    let total = totalProductos();
    document.getElementById("totalCarrito").innerText = `Total: ${total}`;
}

function totalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function cargarCarritoLS() {
    const carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    renderCarrito();

    Swal.fire({
        title: "Carrito vacío",
        text: "Vaciaste tu carrito!!",
        icon: "error"
    });

    renderBotonCarrito();
}

cargarSuplementos();
renderBotonCarrito();