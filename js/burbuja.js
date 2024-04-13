// Seleccionar elementos del HTML
const visualizacion = document.querySelector('#visualizacion');
const btnGrafico = document.querySelector('#btn-grafico');
const btnOrdenar = document.querySelector('#btn-ordenar');
const btnDetener = document.querySelector('#btn-detener');
// Variables de control
let array;
let grafico = 0;
let ordenando = false;
let detener = false;

// Generar el grafico de barras
btnGrafico.addEventListener('click', function(){
    array = generarArreglo(20, 5, 100);
    imprimirArreglo(array);

    btnOrdenar.classList.remove('btn-disabled');
    detener = false;
    grafico++;
});

// Empezar el ordenamiento
btnOrdenar.addEventListener('click', function(){
    if(grafico>0){
        algoritmoBurbuja(array);

        btnGrafico.classList.add('btn-disabled',);
        btnOrdenar.classList.add('btn-disabled',);
        btnDetener.classList.remove('btn-disabled');
        btnGrafico.disabled = true;
        btnOrdenar.disabled = true;
        ordenando = true;

        return;
    }
});

// Detener el ordenamiento
btnDetener.addEventListener('click', function(){
    if(ordenando){
        detener = true;
        ordenando = false;
        grafico = 0;
        limpiarVisualizacion();

        btnGrafico.classList.remove('btn-disabled');
        btnDetener.classList.add('btn-disabled');
        btnGrafico.disabled = false;
        btnOrdenar.disabled = false;

        return;
    }
});

/* ----- Funciones Principales ----- */
// Funcion para limpiar el grafico
function limpiarVisualizacion(){
    while(visualizacion.firstChild){
        visualizacion.removeChild(visualizacion.firstChild);
    }
}

// Funcion para generar arreglo de numeros aleatorios
function generarArreglo(length, min, max){
    let arreglo = [];
    for(let i=0; i<length; i++){
        arreglo.push(Math.floor(Math.random() * (max-min+1) + min));
    }
    return arreglo;
}

// Funcion para renderizar el arreglo en forma de barras
function imprimirArreglo(arreglo){
    limpiarVisualizacion();

    for(let i=0; i<arreglo.length; i++){
        let bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = arreglo[i] * 2.4 + 'px';
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