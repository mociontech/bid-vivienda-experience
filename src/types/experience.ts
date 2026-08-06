export type Category =
  | 'deficit_cuantitativo'
  | 'deficit_cualitativo'
  | 'acceso_financiamiento'

export type Subregion = 'todos' | 'suramerica' | 'centroamerica' | 'caribe'

export type View = 'mapa_regional' | 'pais'

export interface SharedState {
  category: Category | null
  view: View
  subregion: Subregion
  countryCode: string | null
  updatedAt: number
}

export const initialSharedState: SharedState = {
  category: null,
  view: 'mapa_regional',
  subregion: 'todos',
  countryCode: null,
  updatedAt: Date.now(),
}
