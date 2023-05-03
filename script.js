class Cliente {
    constructor(nombre, correo, telefono, precio) {
        this.nombre = nombre
        this.correo = correo
        this.telefono = telefono
        this.precio = precio
    }
}

let contadorPaso = 1
let menu = true
let contenedorPasos = document.getElementById("paso1")
let botonSiguiente = document.getElementsByClassName("btn")
let botonAnterior = document.getElementsByClassName("btn-back")
let numero = document.getElementById("numero1")
let botonPlan = document.getElementById("duracion-btn")
let opcion = "mes"
let clientes = []
botonPlan.addEventListener("change", cambioPlan)

boton()

function boton() {
    for (const boton of botonSiguiente) {
        boton.addEventListener("click", pasarPaso)
    }
    for (const boton of botonAnterior) {
        boton.addEventListener("click", devolverPaso)
    }
}

function pasarPaso() {
    contenedorPasos.classList.add("quitar")
    contadorPaso = contadorPaso + 1
    contenedorPasos = document.getElementById(`paso${contadorPaso}`)
    contenedorPasos.classList.remove("quitar")
    if (contadorPaso !== 4) {
        numero.classList.remove("activado")
        numero = document.getElementById(`numero${contadorPaso}`)
        numero.classList.add("activado")
    }
    if (contadorPaso === 2) {
        let nombre = document.getElementById("nombre").value
        let email = document.getElementById("email").value
        let telefono = document.getElementById("telefono").value

        if(nombre === "" || email === "" || telefono === ""){
            Swal.fire({
                title: 'Error!',
                text: 'Por favor rellena los campos para continuar',
                icon: 'error',
                confirmButtonText: 'Volver'
            })
            devolverPaso()
        }
        let cliente = new Cliente(nombre, email, telefono, 0)
        let clienteJSON = JSON.stringify(cliente)
        sessionStorage.setItem('cliente', clienteJSON)
    }
    contadorPaso === 3 && recibo()

    contadorPaso === 4 && anadir()
}
function devolverPaso() {
    contenedorPasos.classList.add("quitar")
    contadorPaso = contadorPaso - 1
    contenedorPasos = document.getElementById(`paso${contadorPaso}`)
    contenedorPasos.classList.remove("quitar")
    numero.classList.remove("activado")
    numero = document.getElementById(`numero${contadorPaso}`)
    numero.classList.add("activado")
}

function cambioPlan() {
    let arcade = document.getElementById("arcade-precio")
    let avanzado = document.getElementById("avanzado-precio")
    let pro = document.getElementById("pro-precio")
    let anual = document.getElementById("anual")
    let mensual = document.getElementById("mensual")

    botonPlan.checked ? arcade.innerText = "$90/año" : arcade.innerText = "$9/mes"
    botonPlan.checked ? avanzado.innerText = "$120/año" : avanzado.innerText = "$12/mes"
    botonPlan.checked ? pro.innerText = "$150/año" : pro.innerText = "$15/mes"
    botonPlan.checked ? mensual.classList.remove("prendido") : anual.classList.remove("prendido")
    botonPlan.checked ? anual.classList.add("prendido") : mensual.classList.add("prendido")
}
function pasarAnual(precio) {
    if (botonPlan.checked) {
        opcion = "año"
        return precio * 10
    }
    else {
        opcion = "mes"
        return precio
    }
}

function recibo() {
    let planes = document.getElementsByName("plan")
    let tipo = document.getElementById("tipoRecibo")
    let precio = 0
    let reciboCliente = JSON.parse(sessionStorage.getItem("cliente"))
    for (const plan of planes) {
        if (plan.checked) {
            if (plan.id === "arcade") {
                precio = 9
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Arcade (${opcion}):`
            }
            if (plan.id === "advanced") {
                precio = 12
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Avanzado (${opcion}):`
            }
            if (plan.id === "pro") {
                precio = 15
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Pro (${opcion}):`
            }
        }
    }

    renderRecibo(reciboCliente)
    const clienteJSON = JSON.stringify(reciboCliente)
    sessionStorage.setItem("cliente", clienteJSON)
}

function renderRecibo(cliente) {
    let nombre = document.getElementById("reciboNombre")
    let correo = document.getElementById("reciboCorreo")
    let telefono = document.getElementById("reciboTelefono")
    let precioParrafo = document.getElementById("reciboPrecio")
    nombre.innerText = cliente.nombre
    correo.innerText = cliente.correo
    telefono.innerText = cliente.telefono
    precioParrafo.innerText = ` $${cliente.precio}/${opcion}`
}

function anadir() {
    const cliente = JSON.parse(sessionStorage.getItem('cliente'))
    clientes.push(cliente)
    console.log(clientes)
    const clientesJSON = JSON.stringify(clientes)
    localStorage.setItem('clientes', clientesJSON)
}