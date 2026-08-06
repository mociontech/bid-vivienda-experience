import { forwardRef } from 'react'
import { LATAM_COUNTRIES } from '../../data/latamCountries'
import { IconChevronDown, IconSearch } from './icons'
import styles from '../../pages/TabletView.module.css'

const SORTED_COUNTRIES = [...LATAM_COUNTRIES].sort((a, b) => a.name.localeCompare(b.name, 'es'))

interface CountrySelectProps {
  value: string | null
  onChange: (countryCode: string) => void
  onClear: () => void
}

export const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(
  function CountrySelect({ value, onChange, onClear }, ref) {
    return (
      <div>
        <label htmlFor="tablet-country-select" className={styles.srOnlyLabel}>
          Seleccionar país
        </label>
        <div className={styles.selectWrapper}>
          <IconSearch className={styles.selectIcon} />
          <select
            id="tablet-country-select"
            ref={ref}
            className={styles.select}
            value={value ?? ''}
            onChange={(e) => {
              if (e.target.value) onChange(e.target.value)
              else onClear()
            }}
          >
            <option value="">Seleccionar un país</option>
            {SORTED_COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <IconChevronDown className={styles.selectChevron} />
        </div>
      </div>
    )
  },
)
