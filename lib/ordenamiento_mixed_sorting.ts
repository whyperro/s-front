// Función de ordenamiento personalizada para manejar columnas con valores mixtos (números y strings)
// Esta función detecta automáticamente si los valores son números o strings y los ordena adecuadamente

export function mixedSortingFn(rowA: any, rowB: any, columnId: string): number {
    // Obtener los valores a comparar
    const valueA = rowA.getValue(columnId)
    const valueB = rowB.getValue(columnId)
  
    // Si ambos valores son undefined o null, considerarlos iguales
    if ((valueA == null && valueB == null) || (valueA === "" && valueB === "")) {
      return 0
    }
  
    // Valores nulos o vacíos siempre van al final
    if (valueA == null || valueA === "") return 1
    if (valueB == null || valueB === "") return -1
  
    // Convertir a string para análisis
    const strA = String(valueA)
    const strB = String(valueB)
  
    // Verificar si ambos valores comienzan con números
    const numRegex = /^[0-9]+/
    const numA = strA.match(numRegex)
    const numB = strB.match(numRegex)
  
    // Si ambos comienzan con números, ordenar numéricamente primero
    if (numA && numB) {
      const numValA = Number.parseInt(numA[0], 10)
      const numValB = Number.parseInt(numB[0], 10)
  
      if (numValA !== numValB) {
        return numValA - numValB
      }
  
      // Si los números son iguales, ordenar alfabéticamente el resto
      const restA = strA.substring(numA[0].length)
      const restB = strB.substring(numB[0].length)
      return restA.localeCompare(restB)
    }
  
    // Si solo uno comienza con número, poner los números primero
    if (numA) return -1
    if (numB) return 1
  
    // Si ambos son números completos, ordenar numéricamente
    if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
      return Number(valueA) - Number(valueB)
    }
  
    // En cualquier otro caso, ordenar alfabéticamente
    return strA.localeCompare(strB, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  }
  