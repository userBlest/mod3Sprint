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
		monthredefinido = month.toString(),
		query = document.querySelector('#fechanacimiento'),
		query2 = document.querySelector('#ingreso');

	let mes;
	if (monthredefinido.length == 1) {
		fecha = (`${year}-0${month + 1}-${day}`);
		mes = `0${month + 1}`
	} else {
		fecha = (`${year}-${month + 1}-${day}`);
		mes = `${month + 1}`
	}

	if (day.toString().length == 1) {
		fecha = (`${year}-${mes}-0${day}`);
	} else {
		fecha = (`${year}-${mes}-${day}`);
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

	// buscar y guardar sueldo semestre anterior
	let sueldoAnt = document.getElementById('semestreSem').value;
	localStorage.setItem('sueldoAnt', sueldoAnt)
	let JSON4 = console.log("El sueldo del semestre anterior es ->", localStorage.getItem('sueldoAnt'));

	// buscar y guardar verificacion cargas
	let carga = document.getElementById('carga').value;
	console.log("Corresponde asignacion ->", carga)
	localStorage.setItem('carga', carga)
	let JSON5 = console.log("Corresponde carga ->", localStorage.getItem('carga'));

	// buscar y guardar cantidad de cargas
	let cantCargas = document.getElementById('cantidadCargas').value
	localStorage.setItem('cantCargas', cantCargas)
	let JSON6 = console.log("Cantidad de cargas ->", localStorage.getItem('cantCargas'));

	// buscar y guardar la fecha de ingreso a la organización
	let fechaIng = document.getElementById('ingreso').value
	localStorage.setItem('fechaIng', fechaIng)
	let JSON7 = console.log("Fecha de ingreso org ->", localStorage.getItem('fechaIng'))


	const formatter = new Intl.NumberFormat('es-CL', {
		style: 'currency',
		currency: 'CLP',
		minimumFractionDigits: 0,
		localeMatcher: 'lookup',
	});

	// operación para saber si corresponde asignación y la cantidad
	let resultado = {}
	if (localStorage.getItem('cantCargas') == 0 || localStorage.getItem('carga') == false) {
		resultado.boolean = false
		resultado.mensaje = 0
	}
	else if (localStorage.getItem('sueldoAnt') <= 429899) {
		resultado.boolean = true
		resultado.mensaje = `Asignación de $16.828 por ${localStorage.getItem('cantCargas')} cargas, en total recibes ${formatter.format(16828 * localStorage.getItem('cantCargas'))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 429899 && localStorage.getItem('sueldoAnt') <= 627913) {
		resultado.boolean = true
		resultado.mensaje = `Asignación de $10.327 por ${localStorage.getItem('cantCargas')} cargas, en total recibes ${formatter.format(10327 * localStorage.getItem('cantCargas'))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 627913 && localStorage.getItem('sueldoAnt') <= 979330) {
		resultado.boolean = true
		resultado.mensaje = `Asignación de $3.264 por ${localStorage.getItem('cantCargas')} cargas, en total recibes ${formatter.format(3264 * localStorage.getItem('cantCargas'))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 979330) {
		resultado.boolean = false
		resultado.mensaje = 0
	}
	console.log(resultado.boolean)
	console.log(resultado.mensaje)

	//Rellenar campo de si corresponde información
	if (resultado.boolean == false) {
		correspondeAsig = document.getElementById('corrAsig')
		correspondeAsig.setAttribute('value', 'No corresponde asignación familiar')
	} else {
		correspondeAsig = document.getElementById('corrAsig')
		correspondeAsig.setAttribute('value', 'Sí corresponde asignación familiar')
	}

	//Rellenar campo con el sueldo de la asignación
	sueldoAsig = document.getElementById('MontoAsig')
	sueldoAsig.setAttribute('value', resultado.mensaje)

	//Operación para saber el sueldo final
	let sueldofinal;
	if (localStorage.getItem('cantCargas') == 0 || localStorage.getItem('carga') == false) {
		sueldofinal = `Su sueldo final es ${formatter.format(localStorage.getItem('sueldo'))}`
	}
	else if (localStorage.getItem('sueldoAnt') <= 429899) {
		sueldofinal = `Su sueldo final es ${formatter.format(localStorage.getItem('sueldo') + (16828 * localStorage.getItem('cantCargas')))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 429899 && localStorage.getItem('sueldoAnt') <= 627913) {
		sueldofinal = `Su sueldo final es ${formatter.format(localStorage.getItem('sueldo') + (10327 * localStorage.getItem('cantCargas')))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 627913 && localStorage.getItem('sueldoAnt') <= 979330) {
		sueldofinal = `Su sueldo final es ${formatter.format(parseInt(localStorage.getItem('sueldo')) + parseInt((3264 * localStorage.getItem('cantCargas'))))}`
	}
	else if (localStorage.getItem('sueldoAnt') > 979330) {
		sueldofinal = `Su sueldo final es ${formatter.format(localStorage.getItem('sueldo'))}`
	}

	documentSueldoFinal = document.getElementById('sueldoFin')
	documentSueldoFinal.setAttribute('value', sueldofinal)

	//Operación para saber la permanencia del usuario en la empresa

	//fecha seleccionada
	const fechaselect = new Date(localStorage.getItem('fechaIng'));

	//obtener fecha actual
	const now = new Date();

	//obtener distancias entre ambas fechas
	let distance = now.getTime() - fechaselect;

	//calculo de años
	const years = now.getFullYear() - fechaselect.getFullYear();

	// Calcular la diferencia en milisegundos entre las dos fechas
	var diferencia = now.getTime() - fechaselect;

	// Convertir la diferencia a días
	var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

	// Calcular la cantidad de años completos
	var anos = Math.floor(dias / 365);

	// Calcular la cantidad de meses completos
	var meses = Math.floor(((dias % 365) / 30));

	// Calcular los días restantes
	var diasRestantes = dias - (anos * 365) - (meses * 30);

	const ress = `${localStorage.getItem('nombre')} lleva una permanencia de days años ${anos}, ${meses} meses y ${diasRestantes} días`;

	//Escribir tiempo de permanencia de acuerdo a operación
	let tiempoPerm = document.getElementById('tiempoPermanencia')
	tiempoPerm.setAttribute('value', ress)
}