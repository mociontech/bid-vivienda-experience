import { useEffect, useMemo, useState } from 'react'
import { geoMercator } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { LATAM_IDS, countryById } from '../data/latamCountries'
import { colorForValue, NO_DATA_COLOR } from '../lib/colorScale'
import type { Category, Subregion } from '../types/experience'
import type { IndicatorValue } from '../data/sampleIndicators'

const GEO_URL = '/data/countries-50m.json'

interface LatamMapProps {
  category: Category
  subregion: Subregion
  selectedCountryId: string | null
  values: Record<string, IndicatorValue>
  onSelectCountry?: (id: string) => void
  width?: number
  height?: number
}

export function LatamMap({
  category,
  subregion,
  selectedCountryId,
  values,
  onSelectCountry,
  width = 900,
  height = 620,
}: LatamMapProps) {
  const [topology, setTopology] = useState<Topology | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((data: Topology) => {
        if (!cancelled) setTopology(data)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const { min, max } = useMemo(() => {
    const nums = Object.values(values).map((v) => v.value)
    return { min: Math.min(...nums), max: Math.max(...nums) }
  }, [values])

  const visibleIds = useMemo(() => {
    if (subregion === 'todos') return LATAM_IDS
    const ids = new Set<string>()
    LATAM_IDS.forEach((id) => {
      const meta = countryById(id)
      if (meta?.subregion === subregion) ids.add(id)
    })
    return ids
  }, [subregion])

  const projectionConfig = useMemo(() => {
    if (!topology || !selectedCountryId) {
      return { center: [-70, -15] as [number, number], scale: 260 }
    }
    const geoJson = feature(
      topology,
      topology.objects.countries as GeometryCollection,
    ) as unknown as { features: Array<{ id?: string; geometry: unknown }> }
    const selected = geoJson.features.find((f) => f.id === selectedCountryId)
    if (!selected) return { center: [-70, -15] as [number, number], scale: 260 }

    const projection = geoMercator().fitSize([width, height], selected as GeoJSON.Feature)
    const [lon, lat] = projection.invert?.([width / 2, height / 2]) ?? [-70, -15]
    // fitSize gives us the right scale for this feature at full canvas size;
    // reuse it directly instead of recomputing.
    return { center: [lon, lat] as [number, number], scale: projection.scale() }
  }, [topology, selectedCountryId, width, height])

  if (!topology) {
    return (
      <div style={{ width, height, display: 'grid', placeItems: 'center', color: '#999' }}>
        Cargando mapa…
      </div>
    )
  }

  return (
    <ComposableMap
      width={width}
      height={height}
      projection="geoMercator"
      projectionConfig={projectionConfig}
    >
      <Geographies geography={topology}>
        {({ geographies }) => {
          const filtered = geographies.filter((geo) => visibleIds.has(geo.id as string))
          return filtered.map((geo) => {
              const id = geo.id as string
              const indicator = values[id]
              const fill = indicator
                ? colorForValue(category, indicator.value, min, max)
                : NO_DATA_COLOR
              const isSelected = id === selectedCountryId
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => onSelectCountry?.(id)}
                  style={{
                    default: {
                      fill,
                      stroke: isSelected ? '#ffffff' : '#1a1a1a',
                      strokeWidth: isSelected ? 1.5 : 0.5,
                      outline: 'none',
                      cursor: onSelectCountry ? 'pointer' : 'default',
                    },
                    hover: { fill, stroke: '#ffffff', strokeWidth: 1, outline: 'none' },
                    pressed: { fill, outline: 'none' },
                  }}
                />
              )
            })
        }}
      </Geographies>
    </ComposableMap>
  )
}
