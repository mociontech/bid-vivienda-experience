import { useEffect, useMemo, useState } from 'react'
import { geoMercator } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { LATAM_IDS, countryById } from '../data/latamCountries'
import { colorForValue, NO_DATA_COLOR } from '../lib/colorScale'
import type { Category, Subregion } from '../types/experience'
import type { IndicatorValue } from '../data/indicators'

const GEO_URL = '/data/countries-50m.json'
const FALLBACK_PROJECTION = { center: [-70, -15] as [number, number], scale: 260 }

interface LatamMapProps {
  category: Category
  subregion: Subregion
  selectedCountryId: string | null
  values: Record<string, IndicatorValue>
  onSelectCountry?: (id: string) => void
  width?: number
  height?: number
  className?: string
}

export function LatamMap({
  category,
  subregion,
  selectedCountryId,
  values,
  onSelectCountry,
  width = 980,
  height = 660,
  className,
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
    if (!topology) return FALLBACK_PROJECTION
    const geoJson = feature(
      topology,
      topology.objects.countries as GeometryCollection,
    ) as unknown as { features: Array<{ id?: string; geometry: unknown }> }

    // Zoomed to a single country: fit that country's shape to the full canvas.
    if (selectedCountryId) {
      const selected = geoJson.features.find((f) => f.id === selectedCountryId)
      if (!selected) return FALLBACK_PROJECTION
      const projection = geoMercator().fitSize([width, height], selected as GeoJSON.Feature)
      const [lon, lat] = projection.invert?.([width / 2, height / 2]) ?? FALLBACK_PROJECTION.center
      return { center: [lon, lat] as [number, number], scale: projection.scale() }
    }

    // Regional / subregion view: fit all currently visible countries to the
    // canvas so the map fills the container edge-to-edge instead of leaving
    // empty margins around a fixed center/scale.
    const visibleFeatures = geoJson.features.filter((f) => f.id && visibleIds.has(f.id))
    if (visibleFeatures.length === 0) return FALLBACK_PROJECTION
    const collection = { type: 'FeatureCollection', features: visibleFeatures } as GeoJSON.FeatureCollection
    const projection = geoMercator().fitSize([width, height], collection)
    const [lon, lat] = projection.invert?.([width / 2, height / 2]) ?? FALLBACK_PROJECTION.center
    return { center: [lon, lat] as [number, number], scale: projection.scale() }
  }, [topology, selectedCountryId, visibleIds, width, height])

  if (!topology) {
    return (
      <div className={className} style={{ display: 'grid', placeItems: 'center', color: '#999' }}>
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
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <filter id="latam-map-selected-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feMerge result="glowed">
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
          <feDropShadow
            in="glowed"
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#000000"
            floodOpacity="0.6"
          />
        </filter>
      </defs>
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
                      strokeWidth: isSelected ? 2.5 : 0.5,
                      outline: 'none',
                      cursor: onSelectCountry ? 'pointer' : 'default',
                      filter: isSelected ? 'url(#latam-map-selected-glow)' : undefined,
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 220ms ease, filter 220ms ease',
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
