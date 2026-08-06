import type { Category } from '../types/experience'

// Escalas de 5 pasos (menor -> mayor) inspiradas en la paleta del mockup:
// naranja para déficit cuantitativo, azul para cualitativo, verde-azulado
// para acceso a financiamiento.
const SCALES: Record<Category, string[]> = {
  deficit_cuantitativo: ['#fde3c8', '#f7b370', '#f08c3e', '#e0601f', '#b8360f'],
  deficit_cualitativo: ['#d8e8f7', '#a9cced', '#6fa8dc', '#3d78bf', '#1f4e8c'],
  acceso_financiamiento: ['#d7f0e6', '#9ed9c4', '#5cbfa0', '#2e9b81', '#136b56'],
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
