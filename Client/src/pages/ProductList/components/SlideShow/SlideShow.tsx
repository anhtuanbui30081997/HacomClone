import slide1 from 'src/assets/images/slide1.jpg'
import slide2 from 'src/assets/images/slide2.png'
import slide3 from 'src/assets/images/slide3.jpg'
import slide4 from 'src/assets/images/slide4.png'
import slide5 from 'src/assets/images/slide5.png'
import slide6 from 'src/assets/images/slide6.jpg'
import slide7 from 'src/assets/images/slide7.jpg'
import slide8 from 'src/assets/images/slide8.png'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'src/assets/icons'
const SlideImage = (props: { className: string; slide: string }) => {
  return (
    <div className={props.className}>
      <img src={props.slide} className='h-full w-full object-cover' alt='...' />
    </div>
  )
}

export const SlideShow = () => {
  const [active, setActive] = useState<number>(0)
  const imagesSlide = [slide1, slide2, slide3, slide4, slide5, slide6, slide7, slide8]

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prevActive) => (prevActive === imagesSlide.length - 1 ? 0 : prevActive + 1))
    }, 4000)

    return () => clearInterval(id)
  }, [])

  return (
    <div className='relative w-full'>
      <div className='relative w-full overflow-hidden xl:h-48 2xl:h-64'>
        {imagesSlide.map((slide, index) => {
          return (
            <div
              key={index}
              className={classNames('absolute right-[-50%] flex h-full w-[50%] duration-200 ease-linear', {
                'translate-x-[-200%] justify-start': active === index,
                'translate-x-[-100%] justify-end': active + 1 === index || (active === 7 && index === 0),
                'translate-x-[-300%]': active - 1 === index || (active === 0 && index === 7)
              })}
            >
              <SlideImage slide={slide} className={'w-[99.2%]'} />
            </div>
          )
        })}
      </div>
      {/* Slider controls */}
      <button
        type='button'
        className='group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
        onClick={() => setActive((prevActive) => (prevActive === 0 ? imagesSlide.length - 1 : prevActive - 1))}
      >
        <ChevronLeftIcon className='h-8 w-8 text-red-500' />
      </button>
      <button
        type='button'
        className='group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none'
        onClick={() => setActive((prevActive) => (prevActive === imagesSlide.length - 1 ? 0 : prevActive + 1))}
      >
        <span className='inline-flex h-10 w-10 items-center justify-center rounded-full'>
          <ChevronRightIcon className='h-8 w-8 text-red-500' />
        </span>
      </button>
    </div>
  )
}
