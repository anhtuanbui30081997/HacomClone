import { Link } from 'react-router-dom'
import { ClockIcon, ImageIcon, LocationIcon, MailIcon, MapPinIcon, PhoneIcon } from 'src/assets/icons'
import { ShowroomType } from 'src/types/showroom.type'

interface Props extends ShowroomType {
  index: number
  className?: string
}

const Showroom = (props: Props) => {
  return (
    <div className={props.className}>
      <div className='flex h-8 items-center'>
        <span className='flex h-full w-8 items-center justify-center rounded-l bg-red-600 text-base font-bold text-white'>
          {props.index + 1}
        </span>
        <span className='h-full flex-1 rounded-r bg-[#243a76] px-[10px] text-[13px] font-bold uppercase leading-8 text-white'>
          {`HACOM - ${props.name}`}
        </span>
      </div>
      <div className='flex flex-col gap-2 p-2'>
        <div className='flex items-start'>
          <MapPinIcon className='h-4 w-4' />
          <p className='ml-1 text-xs font-bold capitalize text-black '>{props.address}</p>
        </div>
        <div className='flex items-start'>
          <ImageIcon className='h-4 w-4' stroke='#ed1b24' />
          <Link
            to={`/hinh-anh-thuc-te-showroom-${props.name.split(' ').join('-')}`}
            className='ml-1 text-xs capitalize text-[#ed1b24] '
          >
            Hình ảnh thực tế showroom
          </Link>
        </div>
        <div className='flex items-start'>
          <LocationIcon className='h-4 w-4' stroke='#ed1b24' />
          <Link to={props.map} className='ml-1 text-xs capitalize text-[#ed1b24] '>
            Xem bản đồ đường đi
          </Link>
        </div>
        <div className='flex items-start'>
          <PhoneIcon className='h-4 w-4' />
          <p className='ml-1 text-xs capitalize text-black '>{props.address}</p>
        </div>
        <div className='flex items-start'>
          <MailIcon className='h-4 w-4' />
          <p className='ml-1 text-xs text-black '>{props.email}</p>
        </div>
        <div className='flex items-start'>
          <ClockIcon className='h-4 w-4' />
          <p className='ml-1 text-xs capitalize text-black '>{props.time}</p>
        </div>
      </div>
    </div>
  )
}

export default Showroom
