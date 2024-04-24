// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){
    // Eventos
    btnAgregar.addEventListener('click', () => agregarDato(20, 20));
    btnRandom.addEventListener('click', () => graficoAleatorio(20, 20));
    btnOrdenar.addEventListener('click', () => iniciarOrdenamiento(algoritmoSeleccion));
    btnLimpiar.addEventListener('click', () => detenerOrdenamiento(visualizacion, ''));
    // Agregar dato cuando se presione la tecla "Enter"
    inputDatos.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            agregarDato(20, 20);
        }
    });
});

/* ----- Funciones Principales ----- */

// Funcion para implementar el algoritmo de seleccion
async function algoritmoSeleccion() {
    for (let i = 0; i < arreglo.length - 1; i++) {
      // Encuentra el índice del elemento más pequeño en la sección no ordenada
      let minimo = i;
      for (let j = i + 1; j < arreglo.length; j++) {
        if (detener) return; // Si se detiene el proceso, salir de la función
  
        // Visualizar comparaciones
        const barras = document.querySelectorAll(".bar");
        barras[j].style.backgroundColor = "red";
        barras[minimo].style.backgroundColor = "green";
        await new Promise((resolve) => setTimeout(resolve, 250)); // Esperar 250 ms
  
        if (arreglo[j] < arreglo[minimo]) {
          minimo = j; // Actualiza el índice del elemento más pequeño
        }
  
        // Restaurar el color original de las barras después de la comparación
        barras[j].style.backgroundColor = "dodgerblue";
        barras[minimo].style.backgroundColor = "dodgerblue";
      }
  
      // Intercambia el elemento mínimo con el elemento actual
      if (i !== minimo) {
        [arreglo[i], arreglo[minimo]] = [arreglo[minimo], arreglo[i]]; // Intercambia elementos
        imprimirArreglo(arreglo); // Actualiza la visualización
      }
    }
  }

  // Funcion para renderizar el arreglo en forma de barras
function imprimirArreglo(arreglo){
    limpiarHTML(visualizacion);

    arreglo.forEach(dato => {
        const divBarra = document.createElement('div');
        divBarra.classList.add('bar');
        divBarra.style.height = dato * 10.5 + 'px';
        visualizacion.appendChild(divBarra);
    });
}