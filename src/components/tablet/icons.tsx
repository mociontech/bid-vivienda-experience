import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base: IconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function IconHome(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
      <path d="M9.5 20v-6h5v6" />
    </svg>
  )
}

export function IconHomeTool(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h4.5v-6h-2.5" />
      <path d="M18.5 10v3.2" />
      <circle cx="16.8" cy="17.2" r="2.8" />
      <path d="M16.8 15v-1.3M16.8 19.4v-1.3M14.9 16.1l-1.15-.7M19.85 18.3l-1.15-.7M14.9 18.3l-1.15.7M19.85 16.1l-1.15.7" />
    </svg>
  )
}

export function IconHandCoin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="14.5" cy="7.5" r="3.25" />
      <path d="M13.2 6.4h1.6M14 5.6v3.6" />
      <path d="M3 15.5c2-1.4 3.6-1.8 5.2-1 .9.45 1.7.7 2.6.7h3.4a1.35 1.35 0 0 1 0 2.7h-4.7" />
      <path d="M3 14v6.5" />
      <path d="M10 17.9l6.4-1.9c1-.3 2 .1 2.4 1v0c.4.85 0 1.85-.9 2.25L12 21.5l-9-1.4" />
    </svg>
  )
}

export function IconMapPinArea(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5s7-6.2 7-11.6a7 7 0 1 0-14 0c0 5.4 7 11.6 7 11.6Z" />
      <circle cx="12" cy="9.9" r="2.4" />
    </svg>
  )
}

export function IconGlobeSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="11" r="7.5" />
      <path d="M3.5 11h14M10.5 3.5c2.2 2 3.4 4.7 3.4 7.5s-1.2 5.5-3.4 7.5c-2.2-2-3.4-4.7-3.4-7.5s1.2-5.5 3.4-7.5Z" />
      <path d="m19 19.5 2.5 2.5" />
      <circle cx="17.2" cy="17.2" r="3.3" />
    </svg>
  )
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m19.5 19.5-4-4" />
    </svg>
  )
}

export function IconInfo(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.01" />
    </svg>
  )
}

export function IconHelpCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.3 9.3a2.7 2.7 0 1 1 3.9 2.4c-.8.45-1.2.9-1.2 1.8v.4" />
      <path d="M12 17v.01" />
    </svg>
  )
}

export function IconRotateCcw(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5A8 8 0 1 1 4.5 15" />
      <path d="M4 4.5v5h5" />
    </svg>
  )
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconCheckBadge(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.2 12.3 2.4 2.4 5.2-5.4" />
    </svg>
  )
}
