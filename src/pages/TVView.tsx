import { useSharedState } from '../hooks/useSharedState'
import { useElementSize } from '../hooks/useElementSize'
import { LatamMap } from '../components/LatamMap'
import { legendSteps } from '../lib/colorScale'
import { INDICATORS } from '../data/indicators'
import { countryById } from '../data/latamCountries'
import { IconHandCoin, IconHome, IconHomeTool, IconMapPinArea } from '../components/tablet/icons'
import type { Category, Subregion } from '../types/experience'
import styles from './TVView.module.css'

const CATEGORY_LABEL: Record<Category, string> = {
  deficit_cuantitativo: 'Déficit cuantitativo',
  deficit_cualitativo: 'Déficit cualitativo',
  acceso_financiamiento: 'Acceso al financiamiento',
}

const CATEGORY_SUBTITLE: Record<Category, string> = {
  deficit_cuantitativo: 'Hogares que necesitan una nueva vivienda',
  deficit_cualitativo: 'Viviendas que requieren mejoras',
  acceso_financiamiento: 'Cartera hipotecaria como porcentaje del PIB',
}

const CATEGORY_ICON: Record<Category, typeof IconHome> = {
  deficit_cuantitativo: IconHome,
  deficit_cualitativo: IconHomeTool,
  acceso_financiamiento: IconHandCoin,
}

const CATEGORY_ACCENT: Record<Category, string> = {
  deficit_cuantitativo: '#ff8a00',
  deficit_cualitativo: '#2196f3',
  acceso_financiamiento: '#1fd88f',
}

const LEGEND_LABELS: Record<Category, { min: string; max: string }> = {
  deficit_cuantitativo: { min: 'Menor déficit', max: 'Mayor déficit' },
  deficit_cualitativo: { min: 'Menor déficit', max: 'Mayor déficit' },
  acceso_financiamiento: { min: 'Mercado menos desarrollado', max: 'Mercado más desarrollado' },
}

const SUBREGION_LABEL: Record<Subregion, string> = {
  todos: 'América Latina y el Caribe',
  suramerica: 'Suramérica',
  centroamerica: 'Centroamérica',
  caribe: 'Caribe',
}

export function TVView() {
  const { state, connected } = useSharedState()
  const mapContainer = useElementSize<HTMLDivElement>()

  if (!state.category) {
    return (
      <main className={styles.stage}>
        <div className={styles.emptyStage}>
          <IconMapPinArea className={styles.emptyIcon} />
          <h1 className={styles.emptyTitle}>Medir para transformar</h1>
          <p className={styles.emptyText}>
            Selecciona una dimensión desde la tablet para comenzar a explorar los indicadores de
            vivienda de América Latina y el Caribe.
          </p>
          <span className={styles.connectionBadge}>
            <span
              className={styles.connectionDot}
              style={{ opacity: connected ? 1 : 0.25 }}
              aria-hidden="true"
            />
            {connected ? 'Conectado' : 'Conectando…'}
          </span>
        </div>
      </main>
    )
  }

  const category = state.category
  const values = INDICATORS[category]
  const selectedCountry = state.countryCode ? countryById(state.countryCode) : null
  const selectedIndicator = state.countryCode ? values[state.countryCode] : null
  const legend = LEGEND_LABELS[category]
  const Icon = CATEGORY_ICON[category]
  const accent = CATEGORY_ACCENT[category]

  return (
    <main className={styles.stage} style={{ '--accent': accent } as React.CSSProperties}>
      <div
        className={`${styles.mapLayer} ${state.countryCode ? styles.mapAreaZoomed : ''}`}
        ref={mapContainer.ref}
      >
        <LatamMap
          category={category}
          subregion={state.subregion}
          selectedCountryId={state.countryCode}
          values={values}
          width={mapContainer.width || 980}
          height={mapContainer.height || 660}
          className={styles.mapSvg}
        />
      </div>

      <header className={styles.header}>
        <div className={styles.headerScrim} aria-hidden="true" />
        <div className={styles.categoryHeading}>
          <span className={styles.categoryIcon}>
            <Icon />
          </span>
          <div>
            <div className={styles.headerBrand}>
              <span className={styles.brandMark}>BID</span>
            </div>
            <h1 className={styles.categoryTitle}>{CATEGORY_LABEL[category]}</h1>
            <p className={styles.categorySubtitle}>{CATEGORY_SUBTITLE[category]}</p>
          </div>
        </div>

        <div className={styles.subregionBadge}>
          <IconMapPinArea aria-hidden="true" style={{ width: 18, height: 18 }} />
          <span>
            Explorando <strong>{SUBREGION_LABEL[state.subregion]}</strong>
          </span>
        </div>
      </header>

      <div className={styles.main}>
        <aside className={styles.sidebar}>
          <div className={styles.panel}>
            <p className={styles.legendTitle}>Leyenda</p>
            <div className={styles.legendBar}>
              {legendSteps(category).map((color) => (
                <span key={color} style={{ background: color }} />
              ))}
            </div>
            <div className={styles.legendLabels}>
              <span>{legend.min}</span>
              <span>{legend.max}</span>
            </div>
            <div className={styles.legendNoData}>
              <span className={styles.legendNoDataSwatch} aria-hidden="true" />
              <span>Sin información disponible</span>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.countryCard}`}>
            {selectedCountry && selectedIndicator && (
              <>
                <p className={styles.countryEyebrow}>País seleccionado</p>
                <h2 className={styles.countryName}>{selectedCountry.name}</h2>
                <p className={styles.countryValue}>
                  {category === 'acceso_financiamiento'
                    ? `${selectedIndicator.value.toLocaleString('es', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`
                    : selectedIndicator.value.toLocaleString('es')}
                </p>
                {category !== 'acceso_financiamiento' && (
                  <p className={styles.countryUnit}>{selectedIndicator.unit}</p>
                )}
                <span className={styles.statusPill} data-status={selectedIndicator.dataStatus}>
                  {selectedIndicator.dataStatus === 'oficial' ? 'Dato oficial' : 'Dato proxy'}
                </span>
                <dl className={styles.countryMeta}>
                  <div className={styles.countryMetaRow}>
                    <dt className={styles.countryMetaLabel}>Posición regional</dt>
                    <dd className={styles.countryMetaValue}>{selectedIndicator.regionalRank}</dd>
                  </div>
                  <div className={styles.countryMetaRow}>
                    <dt className={styles.countryMetaLabel}>Año</dt>
                    <dd className={styles.countryMetaValue}>{selectedIndicator.year}</dd>
                  </div>
                  <div className={styles.countryMetaRow}>
                    <dt className={styles.countryMetaLabel}>Fuente</dt>
                    <dd className={styles.countryMetaValue}>{selectedIndicator.source}</dd>
                  </div>
                </dl>
              </>
            )}

            {selectedCountry && !selectedIndicator && (
              <>
                <p className={styles.countryEyebrow}>País seleccionado</p>
                <h2 className={styles.countryName}>{selectedCountry.name}</h2>
                <p className={styles.noDataMessage}>
                  Sin información disponible para este indicador.
                </p>
              </>
            )}

            {!selectedCountry && (
              <div className={styles.regionalPrompt}>
                <IconMapPinArea className={styles.regionalPromptIcon} aria-hidden="true" />
                <p className={styles.regionalPromptTitle}>Panorama regional</p>
                <p className={styles.regionalPromptText}>
                  Selecciona un país desde la tablet para consultar su información detallada.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  )
}
