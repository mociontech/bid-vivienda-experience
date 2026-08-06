import type { Subregion } from '../types/experience'

export interface CountryMeta {
  /** ISO 3166-1 numeric code, matches the `id` field in the topojson features. */
  id: string
  /** ISO 3166-1 alpha-3, useful as a stable app-level country code. */
  iso3: string
  name: string
  subregion: Exclude<Subregion, 'todos'>
}

export const LATAM_COUNTRIES: CountryMeta[] = [
  { id: '032', iso3: 'ARG', name: 'Argentina', subregion: 'suramerica' },
  { id: '068', iso3: 'BOL', name: 'Bolivia', subregion: 'suramerica' },
  { id: '076', iso3: 'BRA', name: 'Brasil', subregion: 'suramerica' },
  { id: '152', iso3: 'CHL', name: 'Chile', subregion: 'suramerica' },
  { id: '170', iso3: 'COL', name: 'Colombia', subregion: 'suramerica' },
  { id: '218', iso3: 'ECU', name: 'Ecuador', subregion: 'suramerica' },
  { id: '328', iso3: 'GUY', name: 'Guyana', subregion: 'suramerica' },
  { id: '600', iso3: 'PRY', name: 'Paraguay', subregion: 'suramerica' },
  { id: '604', iso3: 'PER', name: 'Perú', subregion: 'suramerica' },
  { id: '740', iso3: 'SUR', name: 'Surinam', subregion: 'suramerica' },
  { id: '858', iso3: 'URY', name: 'Uruguay', subregion: 'suramerica' },
  { id: '862', iso3: 'VEN', name: 'Venezuela', subregion: 'suramerica' },

  { id: '084', iso3: 'BLZ', name: 'Belice', subregion: 'centroamerica' },
  { id: '188', iso3: 'CRI', name: 'Costa Rica', subregion: 'centroamerica' },
  { id: '222', iso3: 'SLV', name: 'El Salvador', subregion: 'centroamerica' },
  { id: '320', iso3: 'GTM', name: 'Guatemala', subregion: 'centroamerica' },
  { id: '340', iso3: 'HND', name: 'Honduras', subregion: 'centroamerica' },
  { id: '484', iso3: 'MEX', name: 'México', subregion: 'centroamerica' },
  { id: '558', iso3: 'NIC', name: 'Nicaragua', subregion: 'centroamerica' },
  { id: '591', iso3: 'PAN', name: 'Panamá', subregion: 'centroamerica' },

  { id: '028', iso3: 'ATG', name: 'Antigua y Barbuda', subregion: 'caribe' },
  { id: '044', iso3: 'BHS', name: 'Bahamas', subregion: 'caribe' },
  { id: '052', iso3: 'BRB', name: 'Barbados', subregion: 'caribe' },
  { id: '192', iso3: 'CUB', name: 'Cuba', subregion: 'caribe' },
  { id: '212', iso3: 'DMA', name: 'Dominica', subregion: 'caribe' },
  { id: '214', iso3: 'DOM', name: 'República Dominicana', subregion: 'caribe' },
  { id: '308', iso3: 'GRD', name: 'Granada', subregion: 'caribe' },
  { id: '332', iso3: 'HTI', name: 'Haití', subregion: 'caribe' },
  { id: '388', iso3: 'JAM', name: 'Jamaica', subregion: 'caribe' },
  { id: '659', iso3: 'KNA', name: 'San Cristóbal y Nieves', subregion: 'caribe' },
  { id: '662', iso3: 'LCA', name: 'Santa Lucía', subregion: 'caribe' },
  { id: '670', iso3: 'VCT', name: 'San Vicente y las Granadinas', subregion: 'caribe' },
  { id: '780', iso3: 'TTO', name: 'Trinidad y Tobago', subregion: 'caribe' },
]

export const LATAM_IDS = new Set(LATAM_COUNTRIES.map((c) => c.id))

export const countryById = (id: string): CountryMeta | undefined =>
  LATAM_COUNTRIES.find((c) => c.id === id)
