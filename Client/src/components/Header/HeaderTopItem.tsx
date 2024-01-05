import Popover from '../Popover'

type PropsType = {
  title: string
  icon: React.ReactNode
  className?: string
}
// Internal Component

export default function HeaderTopItem({
  title,
  icon,
  className = 'flex cursor-pointer items-center p-[10px]'
}: PropsType) {
  return (
    <div className={className}>
      {icon}
      <span className='ml-1 text-xs text-[#333e48]'>{title}</span>
    </div>
  )
}
