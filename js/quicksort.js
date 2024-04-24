// Cargar todo el DOM
document.addEventListener('DOMContentLoaded', function(){
    // Eventos
    btnAgregar.addEventListener('click', () => agregarDato(20, 20));
    btnRandom.addEventListener('click', () => graficoAleatorio(20, 20));
    btnOrdenar.addEventListener('click', () => iniciarOrdenamiento(QuickSort));
    btnLimpiar.addEventListener('click', () => detenerOrdenamiento(visualizacion, ''));
    // Agregar dato cuando se presione la tecla "Enter"
    inputDatos.addEventListener('keypress', e => {
        if(e.key === "Enter"){
            agregarDato(20, 20);
        }
    });
});

/* ----- Funciones Principales ----- */

async function QuickSort(arreglo, izquierda = 0, derecha = arreglo.length - 1) {
    if (izquierda < derecha) {
      // Particionar el arreglo y obtener el índice del pivote
      const pivoteIdx = await particionar(arreglo, izquierda, derecha);
      
      // Recursión a la izquierda y derecha del pivote
      await QuickSort(arreglo, izquierda, pivoteIdx - 1);
      await QuickSort(arreglo, pivoteIdx + 1, derecha);
    }
    return arreglo;
  }

  async function particionar(arreglo, izquierda, derecha) {
    // Definir el pivote como el último elemento
    const pivote = arreglo[derecha];
    let i = izquierda - 1;

    // Loop de partición
    for (let j = izquierda; j < derecha; j++) {
        if (detener) return; // flag para detener el ordenamiento

        const barras = document.querySelectorAll('.bar');

        // Resalta el pivote y el elemento que se compara
        barras[j].style.backgroundColor = "red"; // Elemento actual
        barras[derecha].style.backgroundColor = "orange"; // Pivote
        await new Promise((resolve) => setTimeout(resolve, 250)); // Esperar 250 ms

        if (arreglo[j] <= pivote) {
            if (detener) return;
            i++;
            [arreglo[i], arreglo[j]] = [arreglo[j], arreglo[i]]; // Intercambiar elementos
            await imprimirArreglo(arreglo, i, j); // Actualizar visualización
        }

        // Restaura los colores después de la comparación
        barras[j].style.backgroundColor = "dodgerblue"; 
        barras[derecha].style.backgroundColor = "dodgerblue"; 
    }

    [arreglo[i + 1], arreglo[derecha]] = [arreglo[derecha], arreglo[i + 1]]; // Colocar el pivote en su lugar
    await imprimirArreglo(arreglo, i + 1); // Actualizar visualización

    return i + 1; // Retornar índice del pivote
}
  
  
  // Función para imprimir el arreglo con opción de resaltar
async function imprimirArreglo(arreglo, highlight1 = null, highlight2 = null) {
    limpiarHTML(visualizacion); // Limpiar visualización previa

    arreglo.forEach((dato, idx) => {
        const divBarra = document.createElement('div');
        divBarra.classList.add('bar');
        divBarra.style.height = dato * 10.5 + 'px';// Ajustar altura para que sea visible

        // Resalta las barras si se especifica
        if (idx === highlight1 || idx === highlight2) {
            divBarra.style.backgroundColor = "green"; // Color para elementos resaltados
        } else {
            divBarra.style.backgroundColor = "dodgerblue"; // Color estándar
        }

        visualizacion.appendChild(divBarra);
    });

    // Añadir un pequeño retraso para permitir que la interfaz gráfica se actualice
    await new Promise((resolve) => setTimeout(resolve, 200)); // Esperar 200 ms
}
