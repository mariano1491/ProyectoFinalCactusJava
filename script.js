if (!localStorage.getItem('carrito')) {
  localStorage.setItem('carrito', JSON.stringify([]))
}

//DOM
let selectProductos = document.getElementById('selectProductos')
let productosSerranos = document.getElementById('productosSerranos')
let botonDelCarrito = document.getElementById('botonDelCarrito')
let cuerpoDelCarrito = document.getElementById('cuerpoDelCarrito')
let botonFinalizar = document.getElementById('botonFinalizar')
let precioFinal = document.getElementById('precioFinal')
let botonInput = document.getElementById('botonInput')
let formulario = document.getElementById('formulario')
let acumulador;

fetch('productos.json')
  .then(promise => promise.json())
  .then(data => {
    data.forEach((element, indice) => {
      productosSerranos.innerHTML += `

       <div class="card border-secondary mb-3" id="producto${indice}" style="width: 18rem; margin:10px;">
       <img src='https://www.filo.news/export/sites/claro/img/2017/04/27/-1071738764-interior.gif' class="loader">
  <img src="./img/${element.img}" class="card-img-top" alt="imagen">
  <div class="card-body">
    <h5 class="card-title">${element.nombre}</h5>
    <p class="card-text">${element.tipo}</p>
    <p class="card-text">${element.desc}</p>
    <p class="card-text">Precio:$${element.precio}</p>
    <p class="card-text">Stock:${element.stock}</p>


    <button id="botonSerrano${indice}" class="btn btn-secondary botonSerranos">Agregar <i class="fas fa-spa"></i></button>
  </div>
</div>
       
       
       `

    });
    //Uso de JQuery

    $('.card-img-top').on("load", function () {
      $(this).hide()

      setTimeout(() => {
        $(this).show()
        $(".loader").hide()
      }, 1500);
    })


    data.forEach((element, indice) => {
      document.getElementById(`botonSerrano${indice}`).addEventListener('click', () => {
        if (arrayProductosSerranos.find(producto => producto.id == element.id)) {
          let i = arrayProductosSerranos.findIndex(producto => producto.id == element.id)
          if (arrayProductosSerranos[i].cant < element.stock) {
            arrayProductosSerranos[i].cant++
            localStorage.setItem('carrito', JSON.stringify(arrayProductosSerranos))
            Toastify({
              text: "Tu producto ha sido agregado al carrito",
              className: "info",
              style: {
                background: "black",
              }
            }).showToast();
          }
          actualizarCarrito()
        } else {
          let productoAgregar = new Producto(element.id, element.nombre, element.tipo, element.desc, element.precio, element.stock, element.img)
          arrayProductosSerranos.push(productoAgregar)
          localStorage.setItem('carrito', JSON.stringify(arrayProductosSerranos))


          Toastify({
            text: "Tu producto ha sido agregado al carrito",
            className: "info",
            style: {
              background: "black",
            }
          }).showToast();
          actualizarCarrito()
        }
      })
    })
  })