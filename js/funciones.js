window.addEventListener('DOMContentLoaded', function (e) {
	e.preventDefault()

	let seleccion = document.getElementById("trabajador")
	seleccion.addEventListener("change", function (e) {
		opcion = e.target.value;
		if (opcion.toLowerCase() == "true") {
			let fechaingreso = document.getElementById('ingreso')
			fechaingreso.removeAttribute("disabled")
			console.log("está en si")
		} else {
			fechaingreso = document.getElementById('ingreso')
			fechaingreso.setAttribute("disabled", "disabled")
			fechaingreso.value = ""
			console.log("está en no")
		}
	})


	// FECHA TOPE HOY EN FECHAS
	let date = new Date(),
		year = date.getFullYear(),
		month = date.getMonth(),
		day = date.getDate(),
		monthredefinido = month.toString,
		query = document.querySelector('#fechanacimiento'),
		query2 = document.querySelector('#ingreso');

	if (monthredefinido.length == 1) {
		fecha = (`${year}-0${month + 1}-${day}`);
	} else {
		fecha = (`${year}-${month + 1}-${day}`)
	}
	query.setAttribute('max', `${fecha}`)
	query2.setAttribute('max', `${fecha}`)
	console.log(fecha);

	//SI NO TIENE CARGAS, DESHABILITACIÓN DE INPUT CANTIDAD DE CARGAS
	let cargas = document.getElementById('carga')
	cargas.addEventListener("change", function (e) {
		opcion = e.target.value
		console.log(opcion)
		if (opcion.toLowerCase() == 'true') {
			let selectCargas = document.querySelector('#cantidadCargas').disabled = false
		} else {
			let removerCantidad = document.querySelector('#cantidadCargas').value = 0
			selectCargas = document.querySelector('#cantidadCargas').disabled = true
		}
	})

//Al tocar botón, recuperar información del localStorage
	let boton = document.getElementById('boton')
	boton.addEventListener("click", function () {
//recuperar información del nombre y mostrarlo
		escrituraJSON = document.getElementById('nombreForm')
		escrituraJSON.setAttribute('value', localStorage.getItem('nombre'))
//recuperar información del apellido y mostrarlo
		escrituraJSON = document.getElementById('apellidoForm')
		escrituraJSON.setAttribute('value', localStorage.getItem('apellido'))
//recuperar información del sueldo y mostrarlo
		escrituraJSON = document.getElementById('sueldoForm')
		escrituraJSON.setAttribute('value', localStorage.getItem('sueldo'))
	})
})

let guardarcambios = () => {
//buscar y guardar nombre
	let nombre = document.getElementById('nombre').value;
	console.log("El nombre es ->", nombre)
	localStorage.setItem('nombre', nombre)
	let JSON1 = console.log("El nombre sacado del localStorage ->", localStorage.getItem('nombre'));

// buscar y guardar apellido
	let apellido = document.getElementById('apellido').value;
	console.log("El nombre es ->", apellido)
	localStorage.setItem('apellido', apellido)
	let JSON2 = console.log("El apellido sacado del localStorage ->", localStorage.getItem('apellido'));
	
// buscar y guardar sueldo
	let sueldo = document.getElementById('sueldo').value;
	console.log("El nombre es ->", sueldo)
	localStorage.setItem('sueldo', sueldo)
	let JSON3 = console.log("El sueldo sacado del localStorage ->", localStorage.getItem('sueldo'));
}