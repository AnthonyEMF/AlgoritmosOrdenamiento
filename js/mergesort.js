// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){
    // Eventos
    btnAgregar.addEventListener('click', () => agregarDato(20, 20));
    btnRandom.addEventListener('click', () => graficoAleatorio(20, 20));
    btnOrdenar.addEventListener('click', () => iniciarOrdenamiento(algoritmoMergeSort));
    btnLimpiar.addEventListener('click', () => detenerOrdenamiento(visualizacion, ''));
    // Agregar dato cuando se presione la tecla "Enter"
    inputDatos.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            agregarDato(20, 20);
        }
    });
});

/* ----- Funciones Principales ----- */

// Funcion para renderizar el arreglo en forma de barras
function imprimirArreglo(arreglo){
    limpiarHTML(visualizacion);

    arreglo.forEach((dato, i) => {
        const divBarra = document.createElement('div');
        divBarra.classList.add('bar');

        const sublistLength = arreglo.length/4;
        if(i < sublistLength){
            divBarra.style.backgroundColor = 'dodgerblue';
        }else if (i < sublistLength*2){
            divBarra.style.backgroundColor = 'green';
        }else if (i < sublistLength*3){
            divBarra.style.backgroundColor = 'orange';
        }else{
            divBarra.style.backgroundColor = 'red';
        }

        divBarra.style.height = dato * 10.5 + 'px';
        visualizacion.appendChild(divBarra);
    });
}

// Funcion que anima el proceso de ordenacion
function animar(arreglo){
    return new Promise(resolve => {
        setTimeout(() => {
            imprimirArreglo(arreglo); // Muestra el arreglo animado
            resolve();
        }, 250);
    });
}

// Funcion principal que inicia el proceso de Merge Sort
function algoritmoMergeSort(){
    mergeSort(arreglo, 0, 20-1);
}

// Funcion recursiva que divide y ordena el arreglo
async function mergeSort(arreglo, inicio, fin){
    if(inicio >= fin) return;
    const medio = Math.floor((inicio+fin)/2); // Calcula el punto medio
    await mergeSort(arreglo, inicio, medio); // Ordena la mitad izquierda
    await mergeSort(arreglo, medio+1, fin); // Ordena la mitad derecha
    await combinar(arreglo, inicio, medio, fin); // Combina las mitades ordenadas
}

// Funcion que combina dos sub-arreglos ordenados en uno solo
async function combinar(arreglo, inicio, medio, fin){
    const arregloIzquierdo = arreglo.slice(inicio, medio+1);
    const arregloDerecho = arreglo.slice(medio+1, fin+1);
    
    let i=0, j=0, k=inicio;
    // Combina los sub-arreglos ordenadamente
    while(i<arregloIzquierdo.length && j<arregloDerecho.length){
        if(detener) break; // flag para detener el ordenamiento

        if(arregloIzquierdo[i] <= arregloDerecho[j]){
            arreglo[k++] = arregloIzquierdo[i++];
        }else{
            arreglo[k++] = arregloDerecho[j++];
        }
        await animar(arreglo);
    }

    // Agrega los elementos restantes del sub-arreglo izquierdo
    while(i < arregloIzquierdo.length){
        if(detener) break; // flag para detener el ordenamiento

        arreglo[k++] = arregloIzquierdo[i++];
        await animar(arreglo);
    }

    // Agrega los elementos restantes del sub-arreglo derecho
    while(j < arregloDerecho.length){
        if(detener){ // flag para detener el ordenamiento
            limpiarHTML(visualizacion);
            break;
        }
        
        arreglo[k++] = arregloDerecho[j++];
        await animar(arreglo);
    }
}