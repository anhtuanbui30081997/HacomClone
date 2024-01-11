import { IconType } from 'src/types/icon.type'

export default function ClockIcon({
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
      strokeWidth={stroke_width}
      stroke={stroke}
      className={className}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
    </svg>
  )
}
