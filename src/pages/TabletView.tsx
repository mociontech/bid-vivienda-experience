import { useSharedState } from '../hooks/useSharedState'
import { LATAM_COUNTRIES } from '../data/latamCountries'
import type { Category, Subregion } from '../types/experience'

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'deficit_cuantitativo', label: 'Déficit cuantitativo' },
  { id: 'deficit_cualitativo', label: 'Déficit cualitativo' },
  { id: 'acceso_financiamiento', label: 'Acceso al financiamiento' },
]

const SUBREGIONS: { id: Subregion; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'suramerica', label: 'Suramérica' },
  { id: 'centroamerica', label: 'Centroamérica' },
  { id: 'caribe', label: 'Caribe' },
]

const SORTED_COUNTRIES = [...LATAM_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, 'es'))

export function TabletView() {
  const { state, patch, connected } = useSharedState()

  return (
    <main style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Medir para transformar</h1>
      <p>{connected ? 'Conectado' : 'Conectando…'}</p>

      <h2>1. Selecciona una dimensión</h2>
      <div style={{ display: 'flex', gap: 8 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => patch({ category: c.id })}
            style={{ fontWeight: state.category === c.id ? 'bold' : 'normal' }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <h2>2. Explorar región</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => patch({ view: 'mapa_regional', countryCode: null })}>
          Ver mapa regional
        </button>
        {SUBREGIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => patch({ subregion: s.id })}
            style={{ fontWeight: state.subregion === s.id ? 'bold' : 'normal' }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <h2>3. Seleccionar país</h2>
      <select
        value={state.countryCode ?? ''}
        onChange={(e) =>
          patch({
            countryCode: e.target.value || null,
            view: e.target.value ? 'pais' : 'mapa_regional',
          })
        }
      >
        <option value="">Ver mapa regional</option>
        {SORTED_COUNTRIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </main>
  )
}
