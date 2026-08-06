import { useSharedState } from '../hooks/useSharedState'
import { LatamMap } from '../components/LatamMap'
import { legendSteps } from '../lib/colorScale'
import { SAMPLE_INDICATORS } from '../data/sampleIndicators'
import { countryById } from '../data/latamCountries'
import type { Category } from '../types/experience'

const CATEGORY_LABEL: Record<Category, string> = {
  deficit_cuantitativo: 'Déficit cuantitativo',
  deficit_cualitativo: 'Déficit cualitativo',
  acceso_financiamiento: 'Acceso al financiamiento',
}

const CATEGORY_SUBTITLE: Record<Category, string> = {
  deficit_cuantitativo: 'Hogares que necesitan una nueva vivienda',
  deficit_cualitativo: 'Viviendas que requieren mejoras',
  acceso_financiamiento: 'Brecha de acceso a soluciones de financiamiento habitacional',
}

export function TVView() {
  const { state, connected } = useSharedState()

  if (!state.category) {
    return (
      <main style={shellStyle}>
        <p style={{ opacity: 0.6 }}>{connected ? 'Conectado' : 'Conectando…'}</p>
        <h1 style={{ fontSize: 40 }}>Selecciona una categoría en la tablet</h1>
      </main>
    )
  }

  const category = state.category
  const values = SAMPLE_INDICATORS[category]
  const selectedCountry = state.countryCode ? countryById(state.countryCode) : null
  const selectedIndicator = state.countryCode ? values[state.countryCode] : null

  return (
    <main style={shellStyle}>
      <header style={{ marginBottom: 16 }}>
        <h1 style={{ margin: 0, fontSize: 32 }}>{CATEGORY_LABEL[category]}</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>({CATEGORY_SUBTITLE[category]})</p>
      </header>

      <div style={{ display: 'flex', gap: 32 }}>
        <LatamMap
          category={category}
          subregion={state.subregion}
          selectedCountryId={state.countryCode}
          values={values}
          width={800}
          height={560}
        />

        <aside style={{ minWidth: 220 }}>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>Leyenda</p>
          <p style={{ fontSize: 12, opacity: 0.6, marginTop: 0 }}>Menor déficit</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {legendSteps(category).map((color) => (
              <div key={color} style={{ background: color, height: 20, width: 60 }} />
            ))}
          </div>
          <p style={{ fontSize: 12, opacity: 0.6 }}>Mayor déficit</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{ background: '#4b4b4b', height: 14, width: 14 }} />
            <span style={{ fontSize: 12, opacity: 0.6 }}>Sin información</span>
          </div>

          {selectedCountry && selectedIndicator && (
            <div style={{ marginTop: 32, borderTop: '1px solid #333', paddingTop: 16 }}>
              <p style={{ fontSize: 12, opacity: 0.6, margin: 0 }}>{selectedCountry.name}</p>
              <p style={{ fontSize: 36, fontWeight: 700, margin: '4px 0' }}>
                {selectedIndicator.value.toLocaleString('es')}
                {selectedIndicator.unit === '%' ? '%' : ''}
              </p>
              {selectedIndicator.unit !== '%' && (
                <p style={{ margin: 0, opacity: 0.7 }}>{selectedIndicator.unit}</p>
              )}
              <dl style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>
                <div>Posición regional: {selectedIndicator.regionalRank}</div>
                <div>Año: {selectedIndicator.year}</div>
                <div>Fuente: {selectedIndicator.source}</div>
                <div>Estado del dato: {selectedIndicator.dataStatus}</div>
              </dl>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}

const shellStyle: React.CSSProperties = {
  padding: 40,
  fontFamily: 'sans-serif',
  background: '#0b0b0b',
  color: 'white',
  minHeight: '100vh',
}
