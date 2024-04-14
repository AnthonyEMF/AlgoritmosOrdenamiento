// Seleccionar elementos del HTML
const visualizacion = document.querySelector('#visualizacion');
const inputDatos = document.querySelector('#input-datos');
const btnAgregar = document.querySelector('#btn-agregar');
const btnRandom = document.querySelector('#btn-aleatorio');
const btnOrdenar = document.querySelector('#btn-ordenar');
const btnLimpiar = document.querySelector('#btn-detener');
// Variables de control
let array = [];
let nDatos = 0;
let detener = false;

// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){

    cargarEventos();

    function cargarEventos(){
        btnAgregar.addEventListener('click', agregarDato);
        btnRandom.addEventListener('click', graficoAleatorio);
        btnOrdenar.addEventListener('click', ordenarGrafico);
        btnLimpiar.addEventListener('click', detenerOrdenamiento);
        // Agregar dato cuando se presione la tecla "Enter"
        inputDatos.addEventListener('keypress', e => {
            if(e.key === "Enter"){
                agregarDato();
            }
        });
    }

    /* ----- Funciones para los botones ----- */

    // Funcion para agregar datos al arreglo
    function agregarDato(){
        let datos = parseFloat(inputDatos.value);
        while(datos<=0 || datos>20 || inputDatos.value === ''){
            alert('Error: Ingresar numeros entre 1 y 20.');
            inputDatos.value = '';
            return;
        }
        
        desactivarBoton('aleatorio');
        array.push(datos);
        inputDatos.value = '';
        imprimirArreglo(array);
        nDatos++;

        if(nDatos === 10){
            desactivarBoton('agregar');
        }else if(nDatos > 2){
            detener = false;
            activarBoton('ordenar');
            activarBoton('limpiar');
        }
    }

    // Funcion para generar un grafico a partir de una arreglo de numeros aleatorios
    function graficoAleatorio(){
        desactivarBoton('agregar');
        activarBoton('ordenar');
        activarBoton('limpiar');

        array = arregloAleatorio(10, 1, 20);

        imprimirArreglo(array);
        desactivarBoton('aleatorio');
        detener = false;
    }

    // Funcion para ordenar el grafico
    btnOrdenar.disabled = true;
    function ordenarGrafico(){
        algoritmoBurbuja(array);
        desactivarBoton('agregar');
        desactivarBoton('ordenar');
    }

    // Funcion para detener el ordenamiento y limpiar la pantalla
    btnLimpiar.disabled = true;
    function detenerOrdenamiento(){
        detener = true;
        limpiarHTML();

        desactivarBoton('ordenar');
        desactivarBoton('limpiar');
        activarBoton('agregar');
        activarBoton('aleatorio');
        array = [];
        nDatos = 0;
    }

    /* ----- Funciones Principales ----- */

    // Funcion para renderizar el arreglo en forma de barras
    function imprimirArreglo(arreglo){
        limpiarHTML();

        arreglo.forEach(barra => {
            const divBarra = document.createElement('div');
            divBarra.classList.add('bar');
            divBarra.style.height = barra * 10.5 + 'px';
            visualizacion.appendChild(divBarra);
        });
    }

    // Funcion para limpiar el HTML
    function limpiarHTML(){
        while(visualizacion.firstChild){
            visualizacion.removeChild(visualizacion.firstChild);
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
                limpiarHTML();
                break;
            }
        }
    }
});