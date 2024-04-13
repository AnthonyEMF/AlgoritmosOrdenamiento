// Seleccionar elementos del HTML
const visualizacion = document.querySelector('#visualizacion');
const inputDatos = document.querySelector('#input-datos');
const btnAgregar = document.querySelector('#btn-agregar');
const btnOrdenar = document.querySelector('#btn-ordenar');
const btnLimpiar = document.querySelector('#btn-detener');
// Variables de control
let array = [];
let nDatos = 0;
let detener = false;

document.addEventListener('DOMContentLoaded', function(){
    cargarEventos();

    function cargarEventos(){
        btnAgregar.addEventListener('click', agregarDato);
        btnOrdenar.addEventListener('click', ordenarGrafico);
        btnLimpiar.addEventListener('click', detenerOrdenamiento);
        // Agregar dato cuando se presione la tecla "Enter"
        inputDatos.addEventListener('keypress', e => {
            if(e.key === "Enter"){
                agregarDato();
            }
        });
    }

    /* ----- Funciones Principales ----- */

    // Funcion para agregar datos al arreglo
    function agregarDato(){
        let datos = parseFloat(inputDatos.value);
        while(datos<=0 || datos>20 || inputDatos.value === ''){
            alert('Error: Ingresar numeros entre 1 y 20.');
            inputDatos.value = '';
            return;
        }

        array.push(datos);
        inputDatos.value = '';
        imprimirArreglo(array);
        nDatos++;

        if(nDatos === 10){
            inputDatos.disabled = true;
            btnAgregar.disabled = true;
            inputDatos.classList.add('input-disabled');
            btnAgregar.classList.add('btn-disabled');
            inputDatos.placeholder = '...';
        }else if(nDatos > 2){
            detener = false;
            btnOrdenar.disabled = false;
            btnLimpiar.disabled = false;
            btnOrdenar.classList.remove('btn-disabled');
            btnLimpiar.classList.remove('btn-disabled');
        }
    }

    // Funcion para ordenar el grafico
    function ordenarGrafico(){
        algoritmoBurbuja(array);
        btnOrdenar.disabled = true;
        btnOrdenar.classList.add('btn-disabled');

        inputDatos.disabled = true;
        btnAgregar.disabled = true;
        inputDatos.classList.add('input-disabled');
        btnAgregar.classList.add('btn-disabled');
        inputDatos.placeholder = '...';
    }

    // Funcion para detener el ordenamiento
    function detenerOrdenamiento(){
        detener = true;
        limpiarVisualizacion();
        btnLimpiar.disabled = true;
        btnOrdenar.disabled = true;
        btnLimpiar.classList.add('btn-disabled');
        btnOrdenar.classList.add('btn-disabled');

        inputDatos.disabled = false;
        btnAgregar.disabled = false;
        inputDatos.classList.remove('input-disabled');
        btnAgregar.classList.remove('btn-disabled');
        inputDatos.placeholder = 'Ingresar numeros a ordenar (1-20)...';
        array = [];
        nDatos = 0;
    }

    // Funcion para limpiar el HTML
    function limpiarVisualizacion(){
        while(visualizacion.firstChild){
            visualizacion.removeChild(visualizacion.firstChild);
        }
    }

    // Funcion para renderizar el arreglo en forma de barras
    function imprimirArreglo(arreglo){
        limpiarVisualizacion();

        for(let i=0; i<arreglo.length; i++){
            let bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = arreglo[i] * 10.5 + 'px';
            visualizacion.appendChild(bar);
        }
    }

    // Funcion para implementar el algoritmo de burbuja
    async function algoritmoBurbuja(arreglo){
        for(let i=0; i<arreglo.length; i++){
            for(let j=0; j<arreglo.length-1; j++){
                if(detener){ // flag para detener el ordenamiento
                    break;
                }

                // Visualizar comparaciones
                let barras = document.querySelectorAll('.bar');
                barras[j].style.backgroundColor = 'red';
                barras[j+1].style.backgroundColor = 'red';
                await new Promise(resolve => setTimeout(resolve, 250)); // Esperar 250 ms

                if(arreglo[j] > arreglo[j+1]){
                    // Intercambiar elementos
                    let temp = arreglo[j];
                    arreglo[j] = arreglo[j+1];
                    arreglo[j+1] = temp;
                    // Actualizar visualizacion
                    imprimirArreglo(arreglo);
                }

                // Restaurar color original
                barras[j].style.backgroundColor = "dodgerblue";
                barras[j+1].style.backgroundColor = "dodgerblue";
            }

            if(detener){ // flag detener y limpiar el grafico
                limpiarVisualizacion();
                break;
            }
        }
    }
});