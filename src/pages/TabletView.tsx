import { useRef } from 'react'
import { useSharedState } from '../hooks/useSharedState'
import { SubregionFilters } from '../components/tablet/SubregionFilters'
import { CountrySelect } from '../components/tablet/CountrySelect'
import {
  IconHandCoin,
  IconHelpCircle,
  IconHome,
  IconHomeTool,
  IconInfo,
  IconMapPinArea,
  IconGlobeSearch,
  IconRotateCcw,
} from '../components/tablet/icons'
import { initialSharedState } from '../types/experience'
import type { Category } from '../types/experience'
import styles from './TabletView.module.css'

const CATEGORIES: {
  id: Category
  label: string
  description: string
  icon: typeof IconHome
  accent: 'orange' | 'blue' | 'green'
}[] = [
  {
    id: 'deficit_cuantitativo',
    label: 'Déficit cuantitativo',
    description: 'Hogares que necesitan una nueva vivienda.',
    icon: IconHome,
    accent: 'orange',
  },
  {
    id: 'deficit_cualitativo',
    label: 'Déficit cualitativo',
    description: 'Viviendas que requieren mejoras en materiales, estructura o servicios.',
    icon: IconHomeTool,
    accent: 'blue',
  },
  {
    id: 'acceso_financiamiento',
    label: 'Acceso al financiamiento',
    description: 'Cartera hipotecaria como porcentaje del PIB.',
    icon: IconHandCoin,
    accent: 'green',
  },
]

export function TabletView() {
  const { state, patch, connected } = useSharedState()
  const countrySelectRef = useRef<HTMLSelectElement>(null)

  const isRegionalView = state.view === 'mapa_regional'
  const isCountryView = state.view === 'pais'

  const handleExploreRegion = () => {
    patch({ view: 'mapa_regional', countryCode: null })
  }

  const handleFocusCountrySelect = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    countrySelectRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    })
    countrySelectRef.current?.focus()
  }

  const handleCountryChange = (countryCode: string) => {
    patch({ countryCode, view: 'pais' })
  }

  const handleCountryClear = () => {
    patch({ countryCode: null, view: 'mapa_regional' })
  }

  const handleReset = () => {
    patch({
      category: initialSharedState.category,
      view: initialSharedState.view,
      subregion: initialSharedState.subregion,
      countryCode: initialSharedState.countryCode,
    })
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.brand}>BID</div>

          <div className={styles.statusPill}>
            {connected ? (
              <>
                <IconInfo className={styles.statusIconConnected} />
                <div>
                  <p className={styles.statusTitle}>
                    Conectado <span className={styles.statusDot} aria-hidden="true" />
                  </p>
                  <p className={styles.statusSubtitle}>
                    Los cambios se reflejan automáticamente en la pantalla principal.
                  </p>
                </div>
              </>
            ) : (
              <>
                <IconInfo className={styles.statusIcon} />
                <div>
                  <p className={styles.statusTitle}>Control en tiempo real</p>
                  <p className={styles.statusSubtitle}>
                    Los cambios se reflejan automáticamente en la pantalla principal.
                  </p>
                </div>
              </>
            )}
          </div>

          <div className={styles.help}>
            <IconHelpCircle aria-hidden="true" />
            <span>Ayuda</span>
          </div>
        </header>

        <section className={styles.intro}>
          <h1 className={styles.title}>Medir para transformar</h1>
          <p className={styles.description}>
            Configura qué información deseas visualizar en la pantalla principal. Cada cambio se
            aplica automáticamente en el mapa.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="section-dimension">
          <h2 id="section-dimension" className={styles.sectionTitle}>
            1. Dimensión
          </h2>
          <p className={styles.sectionSubtitle}>Selecciona el indicador que deseas analizar.</p>

          <div className={styles.dimensionStack}>
            {CATEGORIES.map((c) => {
              const Icon = c.icon
              const isSelected = state.category === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  className={styles.dimensionCard}
                  data-accent={c.accent}
                  data-selected={isSelected}
                  aria-pressed={isSelected}
                  onClick={() => patch({ category: c.id })}
                >
                  <span className={styles.dimensionIcon}>
                    <Icon />
                  </span>
                  <span className={styles.dimensionText}>
                    <span className={styles.dimensionLabel}>{c.label}</span>
                    <span className={styles.dimensionDescription}>{c.description}</span>
                  </span>
                  <span className={styles.radioIndicator} aria-hidden="true" />
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-exploration">
          <h2 id="section-exploration" className={styles.sectionTitle}>
            2. Modo de exploración
          </h2>
          <p className={styles.sectionSubtitle}>
            Define el nivel de detalle que deseas mostrar en la pantalla principal.
          </p>

          <div className={styles.explorationGrid}>
            <button
              type="button"
              className={styles.explorationCard}
              data-selected={isRegionalView}
              aria-pressed={isRegionalView}
              onClick={handleExploreRegion}
            >
              <span className={styles.explorationIcon}>
                <IconMapPinArea />
              </span>
              <span className={styles.explorationLabel}>Explorar región</span>
              <span className={styles.explorationDescription}>
                Visualiza el panorama regional y aplica filtros por subregión.
              </span>
              <span className={styles.radioIndicator} aria-hidden="true" />
            </button>

            <button
              type="button"
              className={styles.explorationCard}
              data-selected={isCountryView}
              aria-pressed={isCountryView}
              onClick={handleFocusCountrySelect}
            >
              <span className={styles.explorationIcon}>
                <IconGlobeSearch />
              </span>
              <span className={styles.explorationLabel}>Seleccionar país</span>
              <span className={styles.explorationDescription}>
                Consulta el detalle de un país específico.
              </span>
              <span className={styles.radioIndicator} aria-hidden="true" />
            </button>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="section-subregion">
          <h2 id="section-subregion" className={styles.sectionTitle}>
            3. Filtrar por subregión
          </h2>
          <p className={styles.sectionSubtitle}>
            Limita la visualización regional a un grupo de países.
          </p>
          <SubregionFilters
            value={state.subregion}
            onChange={(subregion) => patch({ subregion })}
          />
        </section>

        <section className={styles.section} aria-labelledby="section-country">
          <h2 id="section-country" className={styles.sectionTitle}>
            4. Seleccionar país
          </h2>
          <p className={styles.sectionSubtitle}>
            Selecciona un país para mostrar su información detallada.
          </p>
          <CountrySelect
            ref={countrySelectRef}
            value={state.countryCode}
            onChange={handleCountryChange}
            onClear={handleCountryClear}
          />
        </section>

        <div className={styles.syncNotice}>
          <IconInfo className={styles.syncNoticeIcon} />
          <div>
            <p className={styles.syncNoticeTitle}>La pantalla principal siempre muestra el mapa.</p>
            <p className={styles.syncNoticeDescription}>
              Tus selecciones actualizan automáticamente la visualización en tiempo real.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.resetButton} onClick={handleReset}>
            <IconRotateCcw aria-hidden="true" />
            <span>Restablecer selección</span>
          </button>
        </div>
      </div>
    </main>
  )
}
