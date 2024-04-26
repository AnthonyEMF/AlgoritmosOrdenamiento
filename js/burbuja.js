// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){
    // Eventos
    btnAgregar.addEventListener('click', () => agregarDato(10, 10));
    btnRandom.addEventListener('click', () => graficoAleatorio(10, 10));
    btnOrdenar.addEventListener('click', () => iniciarOrdenamiento(algoritmoBurbuja));
    btnLimpiar.addEventListener('click', () => detenerOrdenamiento(visualizacion, ''));
    // Agregar dato cuando se presione la tecla "Enter"
    inputDatos.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            agregarDato(10, 10);
        }
    });
});

/* ----- Funciones Principales ----- */

// Funcion para implementar el algoritmo de burbuja
async function algoritmoBurbuja(){
    for(let i=0; i<arreglo.length; i++){
        for(let j=0; j<arreglo.length-1; j++){
            if(detener) break; // flag para detener el ordenamiento

            // Visualizar comparaciones
            let barras = document.querySelectorAll('.bar');
            barras[j].style.backgroundColor = 'red';
            barras[j+1].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 300)); // Esperar 250 ms

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
            limpiarHTML(visualizacion);
            break;
        }
    }
}

// Funcion para renderizar el arreglo en forma de barras
function imprimirArreglo(arreglo){
    limpiarHTML(visualizacion);

    arreglo.forEach(dato => {
        const divBarra = document.createElement('div');
        divBarra.classList.add('bar');
        divBarra.style.height = dato * 30 + 'px';
        divBarra.textContent = `${dato}`;
        visualizacion.appendChild(divBarra);
    });
}