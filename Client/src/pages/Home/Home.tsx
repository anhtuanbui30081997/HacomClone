import { Link } from 'react-router-dom'
import path from 'src/constants/path'

export default function Home() {
  return (
    <div className='w-full bg-white'>
      <div className='container mx-auto'>
        Home:
        <Link className='text-blue-500' to={path.laptop_macbook_surface}>
          Laptop-tablet-mobile
        </Link>
      </div>
    </div>
  )
}
