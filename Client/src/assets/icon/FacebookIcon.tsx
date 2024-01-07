interface Props {
  color?: string
}
export default function FacebookIcon({ color }: Props) {
  return (
    <svg
      className='h-5 w-5'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke-width='2'
      stroke={color ? color : 'currentColor'}
      fill='none'
    >
      {' '}
      <path stroke='none' d='M0 0h24v24H0z' />{' '}
      <path d='M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3' />
    </svg>
  )
}
