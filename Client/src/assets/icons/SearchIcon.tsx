import { IconType } from 'src/types/icon.type'

export default function SearchIcon({
  className = 'h-3 w-3',
  stroke = 'currentColor',
  stroke_width = 1.5,
  fill = 'none'
}: IconType) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={fill}
      viewBox='0 0 20 20'
      strokeWidth={stroke_width}
      stroke={stroke}
      className={className}
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
      />
    </svg>
  )
}
