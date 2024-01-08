import { IconType } from 'src/types/icon.type'

export default function GoogleIcon({
  className,
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
      {' '}
      <path stroke='none' d='M0 0h24v24H0z' /> <path d='M17.788 5.108A9 9 0 1021 12h-8' />
    </svg>
  )
}
