// Seleccionar elementos del HTML
const visualizacion = document.querySelector('#visualizacion');
const containerRecuadroActual = document.querySelector('.container-actual');
const containerRecuadros = document.querySelector('.container-recuadros');
const inputDatos = document.querySelector('#input-datos');
const btnAgregar = document.querySelector('#btn-agregar');
const btnRandom = document.querySelector('#btn-aleatorio');
const btnOrdenar = document.querySelector('#btn-ordenar');
const btnLimpiar = document.querySelector('#btn-limpiar');
// Variables de control
let arreglo = [];
let actual = 0;
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
        arreglo.push(datos);
        inputDatos.value = '';
        imprimirArreglo(arreglo);
        nDatos++;
        detener = false;

        if(nDatos === 8){
            desactivarBoton('agregar');
        }else if(nDatos > 2){
            activarBoton('ordenar');
            activarBoton('limpiar');
        }
    }

    // Funcion para generar un grafico a partir de una arreglo de numeros aleatorios
    function graficoAleatorio(){
        desactivarBoton('agregar');
        activarBoton('ordenar');
        activarBoton('limpiar');

        arreglo = arregloAleatorio(8, 1, 20);

        imprimirArreglo(arreglo);
        desactivarBoton('aleatorio');
        detener = false;
    }

    // Funcion para ordenar el grafico
    btnOrdenar.disabled = true;
    function ordenarGrafico(){
        algoritmoInsercion(arreglo);
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
        arreglo = [];
        actual = 0;
        nDatos = 0;
    }
    
    /* ----- Funciones Principales ----- */
    
    // Funcion para renderizar el arreglo en forma de recuadros
    function imprimirArreglo(indiceOrdenado){
        limpiarHTML();
        
        containerRecuadroActual.innerHTML = `<div class="recuadro-actual">${actual}</div>`;

        arreglo.forEach((valor, i) => {
            const recuadro = document.createElement('div');
            recuadro.classList.add('recuadro');
            recuadro.textContent = valor;

            if(i === indiceOrdenado){
                recuadro.style.backgroundColor = 'red';
            }else{
                recuadro.style.backgroundColor = 'dodgerblue';
            }

            containerRecuadros.appendChild(recuadro);
        });
    }
    
    // Funcion para borrar el contenido del HTML
    function limpiarHTML(){
        containerRecuadroActual.innerHTML = '';
        containerRecuadros.innerHTML = '';
    }

    // Funcion para implementar el algoritmo de insercion
    async function algoritmoInsercion(){
        // El ciclo comienza desde el segundo elemento de la lista
        for(let i=1; i<arreglo.length; i++){
            // En cada iteracion se guarda el valor del elemento actual
            actual = arreglo[i];
            let j = i-1;
        
            while(j>=0 && arreglo[j]>actual){
                // Se mueve cada elemento que sea mayor que el actual hacia la derecha
                arreglo[j+1] = arreglo[j];
                j--;
                imprimirArreglo(j+1);
                await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 1000 ms

                if(detener){ // flag para detener el ordenamiento
                    break;
                }
            }
            if(detener){ // flag para detener el ordenamiento
                break;
            }

            // Se coloca el valor actual en la parte ordenada del arreglo
            arreglo[j+1] = actual;
            imprimirArreglo(j+1);
            await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 1000 ms

            if(detener){ // flag para detener el ordenamiento
                break;
            }
        }
    }
});