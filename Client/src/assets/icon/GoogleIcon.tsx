interface Props {
  color?: string
}

export default function GoogleIcon({ color }: Props) {
  return (
    <svg
      className='h-4 w-4'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      stroke-width={1.5}
      stroke={color ? color : 'currentColor'}
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      {' '}
      <path stroke='none' d='M0 0h24v24H0z' /> <path d='M17.788 5.108A9 9 0 1021 12h-8' />
    </svg>
  )
}
