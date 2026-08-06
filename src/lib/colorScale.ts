import type { Category } from '../types/experience'

// Escalas de 5 pasos (menor -> mayor), vibrantes para contrastar sobre el
// fondo oscuro de la TV: naranja para déficit cuantitativo, azul para
// cualitativo, verde para acceso a financiamiento.
const SCALES: Record<Category, string[]> = {
  deficit_cuantitativo: ['#ffd9a0', '#ffab40', '#ff8a00', '#ff5f1f', '#e63900'],
  deficit_cualitativo: ['#a9d6ff', '#5fb3ff', '#2196f3', '#1565c0', '#0d3fa3'],
  acceso_financiamiento: ['#b8f7d4', '#5eebac', '#1fd88f', '#00c176', '#009160'],
}

export const NO_DATA_COLOR = '#4b4b4b'

export function colorForValue(category: Category, value: number, min: number, max: number) {
  const scale = SCALES[category]
  if (max === min) return scale[0]
  const t = (value - min) / (max - min)
  const index = Math.min(scale.length - 1, Math.floor(t * scale.length))
  return scale[index]
}

export function legendSteps(category: Category) {
  return SCALES[category]
}
