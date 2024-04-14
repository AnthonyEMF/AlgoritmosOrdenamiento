/* ----- Funciones Globales ----- */

// Funcion para generar un arreglo de numeros aleatorios
function arregloAleatorio(length, min, max){
    let arreglo = [];
    for(let i=0; i<length; i++){
        arreglo.push(Math.floor(Math.random() * (max-min+1) + min));
    }
    return arreglo;
}

// Funcion para activar los botones agregar, aleatoio, ordenar y limpiar
function activarBoton(op){
    switch(op){
        case 'agregar':
            inputDatos.disabled = false;
            btnAgregar.disabled = false;
            inputDatos.classList.remove('input-disabled');
            btnAgregar.classList.remove('btn-disabled');
            inputDatos.placeholder = 'Ingresar numeros a ordenar (1-20)...';
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