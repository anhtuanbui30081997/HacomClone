import { IconType } from 'src/types/icon.type'

export default function ChevronLeftIcon({
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
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
    </svg>
  )
}
