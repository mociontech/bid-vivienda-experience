import type { Category } from '../types/experience'
import { LATAM_COUNTRIES } from './latamCountries'

/**
 * Datos de relleno (placeholder) para poder construir y probar el mapa
 * antes de tener la data oficial del BID. Reemplazar por la fuente real
 * (CEPALSTAT / BID / fuentes nacionales) cuando esté disponible.
 */
export interface IndicatorValue {
  value: number
  unit: string
  year: number
  regionalRank: number
  source: string
  dataStatus: 'oficial' | 'proxy'
}

const UNIT_BY_CATEGORY: Record<Category, string> = {
  deficit_cuantitativo: 'hogares',
  deficit_cualitativo: 'hogares',
  acceso_financiamiento: '%',
}

function seededValue(seed: string, category: Category) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  const base = hash % 1000
  if (category === 'acceso_financiamiento') return Math.round((base % 60) + 5) // %
  return Math.round(base * 2500) // hogares
}

function buildCategoryData(category: Category): Record<string, IndicatorValue> {
  const entries = LATAM_COUNTRIES.map((c) => ({
    id: c.id,
    value: seededValue(c.iso3 + category, category),
  })).sort((a, b) => b.value - a.value)

  const byId: Record<string, IndicatorValue> = {}
  entries.forEach((e, index) => {
    byId[e.id] = {
      value: e.value,
      unit: UNIT_BY_CATEGORY[category],
      year: 2023,
      regionalRank: index + 1,
      source: 'CEPALSTAT / Fuentes nacionales (dato de ejemplo)',
      dataStatus: 'proxy',
    }
  })
  return byId
}

export const SAMPLE_INDICATORS: Record<Category, Record<string, IndicatorValue>> = {
  deficit_cuantitativo: buildCategoryData('deficit_cuantitativo'),
  deficit_cualitativo: buildCategoryData('deficit_cualitativo'),
  acceso_financiamiento: buildCategoryData('acceso_financiamiento'),
}
