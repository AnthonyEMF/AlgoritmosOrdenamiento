// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){
    // Eventos
    btnAgregar.addEventListener('click', () => agregarDato(8, 20));
    btnRandom.addEventListener('click', () => graficoAleatorio(8, 20));
    btnOrdenar.addEventListener('click', () => iniciarOrdenamiento(algoritmoInsercion));
    btnLimpiar.addEventListener('click', () => detenerOrdenamiento(containerSuperior, containerInferior));
    // Agregar dato cuando se presione la tecla "Enter"
    inputDatos.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            agregarDato(8, 20);
        }
    });
});

/* ----- Funciones Principales ----- */

// Funcion para renderizar el arreglo en forma de recuadros
function imprimirArreglo(indiceOrdenado){
    limpiarHTML(containerSuperior);
    limpiarHTML(containerInferior);
    // Contenedor Superior de la Visualizacion
    const recuadroActual = document.createElement('div');
    recuadroActual.classList.add('recuadro');
    recuadroActual.style.backgroundColor = 'red';
    recuadroActual.textContent = `${actual}`;
    containerSuperior.appendChild(recuadroActual);
    // Contenedor Inferior de la Visualizacion
    arreglo.forEach((dato, i) => {
        const recuadro = document.createElement('div');
        recuadro.classList.add('recuadro');
        recuadro.textContent = dato;
        if(i === indiceOrdenado){
            recuadro.style.backgroundColor = 'red';
        }else{
            recuadro.style.backgroundColor = 'dodgerblue';
        }
        containerInferior.appendChild(recuadro);
    });

}

// Funcion para implementar el algoritmo de insercion
async function algoritmoInsercion(){
    // El ciclo comienza desde el segundo elemento de la lista
    for(let i=1; i<arreglo.length; i++){
        // En cada iteracion se guarda el dato del elemento actual
        actual = arreglo[i];
        let j = i-1;
    
        while(j>=0 && arreglo[j]>actual){
            // Se mueve cada elemento que sea mayor que el actual hacia la derecha
            arreglo[j+1] = arreglo[j];
            j--;
            imprimirArreglo(j+1);
            await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 1000 ms

            if(detener) break; // flag para detener el ordenamiento
        }
        if(detener) break; // flag para detener el ordenamiento

        // Se coloca el dato actual en la parte ordenada del arreglo
        arreglo[j+1] = actual;
        imprimirArreglo(j+1);
        await new Promise(resolve => setTimeout(resolve, 500)); // Esperar 1000 ms

        if(detener) break; // flag para detener el ordenamiento
    }
}