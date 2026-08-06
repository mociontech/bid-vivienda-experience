import type { Category } from '../types/experience'

/**
 * Datos reales extraídos de src/data/raw/Datos_hoja_M1_para_Claude.txt
 * (Maqueta 1 complemento.xlsx, hoja M1, filas 7-37, BID-CEPAL).
 *
 * Países marcados "ND" en el Excel, o que no aparecen en la hoja en absoluto
 * (Cuba y Haití no tienen fila), quedan deliberadamente fuera de estos
 * diccionarios: al no tener entrada, el mapa los pinta en gris
 * ("Sin información") en vez de inventar un valor.
 */
export interface IndicatorValue {
  value: number
  unit: string
  year: number
  regionalRank: number
  source: string
  dataStatus: 'oficial' | 'proxy'
}

const SOURCE_DEFICIT = 'CEPAL-BID — Nueva metodología de cálculo de déficit habitacional'
const SOURCE_FINANCIAMIENTO = 'BID — Cartera Hipotecaria como % del PIB'

// id (ISO numérico) -> [cuantitativo (viviendas), cualitativo (viviendas), año]
const DEFICIT_RAW: Record<string, [number, number, number]> = {
  '032': [747676, 2934839, 2024], // Argentina
  '068': [784977, 2126817, 2023], // Bolivia
  '076': [4019702, 34691814, 2023], // Brasil
  '152': [283463, 2876903, 2025], // Chile
  '170': [2632901, 7239326, 2024], // Colombia
  '188': [77027, 956699, 2024], // Costa Rica
  '214': [509226, 1289729, 2023], // República Dominicana
  '218': [990248, 2057455, 2023], // Ecuador
  '222': [508009, 1402242, 2024], // El Salvador
  '320': [1446317, 2134177, 2023], // Guatemala
  '340': [684001, 1568275, 2023], // Honduras
  '484': [5070916, 20958839, 2023], // México
  '591': [163452, 447344, 2024], // Panamá
  '600': [151868, 1004153, 2023], // Paraguay
  '604': [3196813, 4060413, 2023], // Perú
  '858': [45764, 481639, 2023], // Uruguay
}

// id (ISO numérico) -> [cartera hipotecaria % PIB, año]
const FINANCIAMIENTO_RAW: Record<string, [number, number]> = {
  '028': [15.87, 2023], // Antigua y Barbuda
  '032': [0.36, 2024], // Argentina
  '044': [18.77, 2023], // Bahamas
  '052': [21.74, 2023], // Barbados
  '084': [11.99, 2023], // Belice
  '068': [17.99, 2023], // Bolivia
  '076': [10.04, 2023], // Brasil
  '152': [26.31, 2025], // Chile
  '170': [6.47, 2024], // Colombia
  '188': [12.75, 2024], // Costa Rica
  '212': [12.76, 2023], // Dominica
  '214': [5.25, 2023], // República Dominicana
  '218': [2.2, 2023], // Ecuador
  '222': [8.56, 2024], // El Salvador
  '308': [29.28, 2023], // Granada
  '320': [2.02, 2023], // Guatemala
  '340': [16.26, 2023], // Honduras
  '388': [13.61, 2023], // Jamaica
  '484': [9.66, 2023], // México
  '591': [24.4, 2024], // Panamá
  '600': [2.14, 2023], // Paraguay
  '604': [6.61, 2023], // Perú
  '659': [21.43, 2023], // San Cristóbal y Nieves
  '662': [14.46, 2023], // Santa Lucía
  '670': [14, 2023], // San Vicente y las Granadinas
  '780': [15.67, 2023], // Trinidad y Tobago
  '858': [4.71, 2023], // Uruguay
}

function withRank(entries: [string, number][]): Record<string, { value: number; rank: number }> {
  const sorted = [...entries].sort((a, b) => b[1] - a[1])
  const result: Record<string, { value: number; rank: number }> = {}
  sorted.forEach(([id, value], index) => {
    result[id] = { value, rank: index + 1 }
  })
  return result
}

function buildDeficitCategory(pick: (v: [number, number, number]) => number): Record<string, IndicatorValue> {
  const entries = Object.entries(DEFICIT_RAW).map(([id, v]) => [id, pick(v)] as [string, number])
  const ranked = withRank(entries)
  const byId: Record<string, IndicatorValue> = {}
  for (const [id, raw] of Object.entries(DEFICIT_RAW)) {
    const { value, rank } = ranked[id]
    byId[id] = {
      value,
      unit: 'hogares',
      year: raw[2],
      regionalRank: rank,
      source: SOURCE_DEFICIT,
      dataStatus: 'oficial',
    }
  }
  return byId
}

function buildFinanciamiento(): Record<string, IndicatorValue> {
  const entries = Object.entries(FINANCIAMIENTO_RAW).map(([id, v]) => [id, v[0]] as [string, number])
  const ranked = withRank(entries)
  const byId: Record<string, IndicatorValue> = {}
  for (const [id, raw] of Object.entries(FINANCIAMIENTO_RAW)) {
    const { value, rank } = ranked[id]
    byId[id] = {
      value,
      unit: '% del PIB',
      year: raw[1],
      regionalRank: rank,
      source: SOURCE_FINANCIAMIENTO,
      dataStatus: 'oficial',
    }
  }
  return byId
}

export const INDICATORS: Record<Category, Record<string, IndicatorValue>> = {
  deficit_cuantitativo: buildDeficitCategory((v) => v[0]),
  deficit_cualitativo: buildDeficitCategory((v) => v[1]),
  acceso_financiamiento: buildFinanciamiento(),
}
