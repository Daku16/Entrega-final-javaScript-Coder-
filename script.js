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
botonPlan.addEventListener("change", cambioPlan)

boton()

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
        let cliente = new Cliente(nombre, email, telefono, 0)
        let clienteJSON = JSON.stringify(cliente)
        localStorage.setItem('cliente', clienteJSON)
    }
    if (contadorPaso === 3) {
        recibo()
    }
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

function boton() {
    for (const boton of botonSiguiente) {
        boton.addEventListener("click", pasarPaso)
    }
    for (const boton of botonAnterior) {
        boton.addEventListener("click", devolverPaso)
    }
}

function cambioPlan() {
    let arcade = document.getElementById("arcade-precio")
    let avanzado = document.getElementById("avanzado-precio")
    let pro = document.getElementById("pro-precio")
    let anual = document.getElementById("anual")
    let mensual = document.getElementById("mensual")

    if (botonPlan.checked) {
        arcade.innerText = "$90/año"
        avanzado.innerText = "$120/año"
        pro.innerText = "$150/año"
        mensual.classList.remove("prendido")
        anual.classList.add("prendido")
    }
    else {
        arcade.innerText = "$9/mes"
        avanzado.innerText = "$12/mes"
        pro.innerText = "$15/mes"
        anual.classList.remove("prendido")
        mensual.classList.add("prendido")
    }
}
function pasarAnual(precio){
    if(botonPlan.checked){
        opcion = "año"
        return precio * 10
    }
    else{
        return precio
    } 
}

function recibo() {
    let planes = document.getElementsByName("plan")
    let tipo = document.getElementById("tipoRecibo")
    let precio = 0
    let reciboCliente = JSON.parse(localStorage.getItem("cliente"))
    for (const plan of planes) {
        if (plan.checked) {
            if(plan.id === "arcade"){
                precio = 9
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Arcade (${opcion}):`
            }
            if(plan.id === "advanced"){
                precio = 12
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Avanzado (${opcion}):`
            }
            if(plan.id === "pro"){
                precio = 15
                reciboCliente.precio = pasarAnual(precio)
                tipo.innerText = `Pro (${opcion}):`
            }
        }
    }
    
    renderRecibo(reciboCliente)
    let clienteJSON = JSON.stringify(reciboCliente)
    localStorage.setItem("cliente", clienteJSON)
}
function renderRecibo(cliente) {
    let nombre = document.getElementById("reciboNombre")
    let correo = document.getElementById("reciboCorreo")
    let telefono = document.getElementById("reciboTelefono")
    let precioParrafo = document.getElementById("reciboPrecio")
    nombre.innerText = cliente.nombre
    correo.innerText = cliente.correo
    telefono.innerText = cliente.telefono
    precioParrafo.innerText =` $${cliente.precio}/${opcion}`
}