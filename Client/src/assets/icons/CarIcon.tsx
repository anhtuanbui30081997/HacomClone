import { IconType } from 'src/types/icon.type'

export default function CarIcon({
  className = 'h-3 w-3',
  stroke = 'currentColor',
  stroke_width = 1.5,
  fill = 'none'
}: IconType) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={fill}
      viewBox='0 0 24 24'
      width={24}
      height={24}
      strokeWidth={stroke_width}
      stroke={stroke}
      className={className}
    >
      <path stroke='none' d='M0 0h24v24H0z' /> <circle cx='7' cy='17' r='2' /> <circle cx='17' cy='17' r='2' />{' '}
      <path d='M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5' /> <line x1='3' y1='9' x2='7' y2='9' />
    </svg>
  )
}
