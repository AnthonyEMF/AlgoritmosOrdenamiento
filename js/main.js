// Seleccionar elementos
const visualizacion = document.querySelector('#visualizacion');
const containerSuperior = document.querySelector('.container-superior');
const containerInferior = document.querySelector('.container-inferior');
const inputDatos = document.querySelector('#input-datos');
const btnAgregar = document.querySelector('#btn-agregar');
const btnRandom = document.querySelector('#btn-aleatorio');
const btnOrdenar = document.querySelector('#btn-ordenar');
const btnLimpiar = document.querySelector('#btn-limpiar');
const textCodigo = document.querySelector('#text-codigo');
const btnCopiar = document.querySelector('#btn-copiar');
// Variables de control
let arreglo = [];
let actual = 0;
let nDatos = 0;
let detener = false;

// Funcion para copiar el codigo de la demostracion en el HTML
btnCopiar.addEventListener('click', function(){
    navigator.clipboard.writeText(textCodigo.textContent);
    alert('Texto copiado en el portapapeles.');
});

/* ----- Funciones Globales ----- */

// Funcion para agregar datos al arreglo
function agregarDato(length, amount){ // length: tamaño de datos, amount: cantidad de datos
    let datos = parseFloat(inputDatos.value);
    while(datos<=0 || datos>amount || inputDatos.value === ''){
        alert(`Error: Ingresar numeros entre 1 y ${amount}.`);
        inputDatos.value = '';
        return;
    }
    
    desactivarBoton('aleatorio');
    activarBoton('limpiar');
    arreglo.push(datos);
    inputDatos.value = '';
    imprimirArreglo(arreglo);
    nDatos++;
    detener = false;

    if(nDatos === length){
        desactivarBoton('agregar');
    }else if(nDatos > 2){
        activarBoton('ordenar');
    }
}

// Funcion para generar un grafico a partir de un arreglo de numeros aleatorios
function graficoAleatorio(length, max){ // length: Tamaño del arreglo, max: cantidad de datos
    desactivarBoton('agregar');
    activarBoton('ordenar');
    activarBoton('limpiar');

    for(let i=0; i<length; i++){
        arreglo.push(Math.floor(Math.random() * (max-1+1) + 1));
    }

    imprimirArreglo(arreglo);
    desactivarBoton('aleatorio');
    detener = false;
}

// Funcion para ordenar el grafico
function iniciarOrdenamiento(algoritmo){ // algoritmo: algoritmo de ordenamiento a utilizar
    algoritmo(arreglo);
    desactivarBoton('agregar');
    desactivarBoton('ordenar');
}

// Funcion para detener el ordenamiento y limpiar la pantalla
function detenerOrdenamiento(container1, container2){ // container1, container2: contenedores a limpiar
    detener = true;
    limpiarHTML(container1);
    limpiarHTML(container2);

    desactivarBoton('ordenar');
    desactivarBoton('limpiar');
    activarBoton('agregar');
    activarBoton('aleatorio');
    arreglo = [];
    actual = 0;
    nDatos = 0;
}

// Funcion para borrar el contenido del HTMl
function limpiarHTML(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}

// Funcion para activar los botones agregar, aleatoio, ordenar y limpiar
function activarBoton(op){
    switch(op){
        case 'agregar':
            inputDatos.disabled = false;
            btnAgregar.disabled = false;
            inputDatos.classList.remove('input-disabled');
            btnAgregar.classList.remove('btn-disabled');
            inputDatos.placeholder = 'Ingresar numeros...';
            break;
        case 'aleatorio':
            btnRandom.disabled = false;
            btnRandom.classList.remove('btn-disabled');
            break;
        case 'ordenar':
            btnOrdenar.disabled = false;
            btnOrdenar.classList.remove('btn-disabled');
            break;
        case 'limpiar':
            btnLimpiar.disabled = false;
            btnLimpiar.classList.remove('btn-disabled');
            break;
        default:
            break;
    }
}
// Funcion para desactivar los botones agregar, aleatorio, ordenar y limpiar
function desactivarBoton(op){
    switch(op){
        case 'agregar':
            inputDatos.disabled = true;
            btnAgregar.disabled = true;
            inputDatos.classList.add('input-disabled');
            btnAgregar.classList.add('btn-disabled');
            inputDatos.placeholder = '...';
            break;
        case 'aleatorio':
            btnRandom.disabled = true;
            btnRandom.classList.add('btn-disabled');
            break;
        case 'ordenar':
            btnOrdenar.disabled = true;
            btnOrdenar.classList.add('btn-disabled');
            break;
        case 'limpiar':
            btnLimpiar.disabled = true;
            btnLimpiar.classList.add('btn-disabled');
            break;
        default:
            console.log('Error: Opcion no valida.');
            break;
    }
}