//FUNCIONES
function CompraFinal(serranosStorage) {
  acumulador = 0;
  serranosStorage.forEach((element) => {
    acumulador += element.precio * element.cant
  })
  if (acumulador == 0) {
    precioFinal.innerHTML = " "
    cuerpoDelCarrito.innerHTML = "<p>Ups! No has agregado nada aun.</p>"

  } else {
    precioFinal.innerHTML = `Total $${(acumulador)}`
  }

}

function EventosModal(serranosStorage) {

  serranosStorage.forEach((element, indice) => {
    document.getElementById(`btnDelete${indice}`).addEventListener('click', () => {
      console.log(`Producto ${element.nombre} eliminado`)
      Toastify({
        text: "Tu producto ha sido eliminado",
        className: "info",
        style: {
          background: "red",
        }
      }).showToast();
      arrayProductosSerranos.splice(indice, 1)
      localStorage.setItem('carrito', JSON.stringify(arrayProductosSerranos))
      AgregarAlCarrito(JSON.parse(localStorage.getItem('carrito')))
    })
    actualizarCarrito()
  })
  serranosStorage.forEach((element, indice) => {
    document.getElementById(`sumar${indice}`).addEventListener('click', () => {
      if (arrayProductosSerranos[indice].cant < arrayProductosSerranos[indice].stock) {
        arrayProductosSerranos[indice].cant++
        localStorage.setItem('carrito', JSON.stringify(arrayProductosSerranos))
        AgregarAlCarrito(JSON.parse(localStorage.getItem('carrito')))

      }
    })
  })
  serranosStorage.forEach((element, indice) => {
    document.getElementById(`restar${indice}`).addEventListener('click', () => {
      if (arrayProductosSerranos[indice].cant > 1) {
        arrayProductosSerranos[indice].cant--
        localStorage.setItem('carrito', JSON.stringify(arrayProductosSerranos))
        AgregarAlCarrito(JSON.parse(localStorage.getItem('carrito')))

      }
    })
  })

}


function AgregarAlCarrito(serranosStorage) {
  cuerpoDelCarrito.innerHTML = ''
  serranosStorage.forEach((element, indice) => {
    cuerpoDelCarrito.innerHTML += `
        <div class="card border-warning mb-3" id="serranosCarrito${indice.id} style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./img/${element.img}" class="img-fluid rounded-start"  alt="imagen">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.nombre}</h5>
        <p class="card-text">Cantidad:${element.cant} </p>
        
        <button class= "btn btn-outline-secondary" id="sumar${indice}"><i class="fas fa-plus"></i></button>
                    <button class= "btn btn-outline-secondary" id="restar${indice}"><i class="fas fa-minus"></i></button>
                    <p class="card-text">$${new Intl.NumberFormat("de-DE").format(element.precio * element.cant)}</p> 
                    <button class= "btn btn-danger" id="btnDelete${indice}"><i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
  </div>
</div>
        `

  })

  CompraFinal(serranosStorage)
  EventosModal(serranosStorage)
  actualizarCarrito()
}

function actualizarCarrito() {
  $('#contadorCarrito').text(arrayProductosSerranos.reduce((acc, el) => acc + el.cant, 0))
  precioTotal.innerText = arrayProductosSerranos.reduce((acc, el) => acc + (el.precio * el.cant), 0)

}



//EVENTOS

botonDelCarrito.addEventListener('click', () => {
  let serranoStorage = JSON.parse(localStorage.getItem('carrito'))
  AgregarAlCarrito(serranoStorage)
  actualizarCarrito()
})


botonFinalizar.addEventListener('click', () => {
  if (arrayProductosSerranos == 0) {
    swal({
      title: "¡Ups no has agregado nada al carrito!",
      text: "Reintente nuevamente",
      icon: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif"

    });

  } else {
    localStorage.setItem('carrito', JSON.stringify([]))
    arrayProductosSerranos = []
    actualizarCarrito()
    swal({
      title: "¡Gracias por realizar tu compra!",
      text: "Te enviaremos un correo para coordinar la entrega",
      icon: "https://cdn.dribbble.com/users/4358240/screenshots/14825308/media/84f51703b2bfc69f7e8bb066897e26e0.gif"

    });


  }

})

//Boton-arriba

$(document).ready(function () {
  $('.ir-arriba').click(function () {
    $('body, html').animate({
      scrollTop: '0px'
    }, 300);
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.ir-arriba').slideDown(300)
    } else {
      $('.ir-arriba').slideUp(300)
    }
  })
})

//EVENTO FORMULARIO
class Cliente {
  constructor (nombre, apellido, email, direccion, consulta){
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.direccion = direccion;
      this.consulta = consulta;
  }
}

let clientes;

if (localStorage.getItem('clientes')) {
  clientes = JSON.parse(localStorage.getItem('clientes'))
} else {
  clientes = []
}


formulario.addEventListener('submit', (e) => {
  e.preventDefault()
  let inputNombre = document.getElementById('inputNombre').value
  let inputApellido = document.getElementById('inputApellido').value
  let inputEmail = document.getElementById('inputEmail').value
  let inputAdress = document.getElementById('inputAdress').value
  let validationTextarea = document.getElementById('validationTextarea').value

  let objetoCliente = new Cliente(inputNombre, inputApellido, inputEmail, inputAdress, validationTextarea)
  clientes.push(objetoCliente)

  localStorage.setItem('clientes', JSON.stringify(clientes))

  formulario.reset()
})