import type { Subregion } from '../../types/experience'
import styles from '../../pages/TabletView.module.css'

const SUBREGIONS: { id: Subregion; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'suramerica', label: 'Suramérica' },
  { id: 'centroamerica', label: 'Centroamérica' },
  { id: 'caribe', label: 'Caribe' },
]

interface SubregionFiltersProps {
  value: Subregion
  onChange: (subregion: Subregion) => void
}

export function SubregionFilters({ value, onChange }: SubregionFiltersProps) {
  return (
    <div className={styles.subregionGrid} role="group" aria-label="Filtrar por subregión">
      {SUBREGIONS.map((s) => {
        const isActive = value === s.id
        return (
          <button
            key={s.id}
            type="button"
            className={styles.pill}
            data-active={isActive}
            aria-pressed={isActive}
            onClick={() => onChange(s.id)}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
