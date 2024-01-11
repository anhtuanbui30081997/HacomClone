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
      <path strokeLinecap='round' strokeLinejoin='round' d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
    </svg>
  )
}
