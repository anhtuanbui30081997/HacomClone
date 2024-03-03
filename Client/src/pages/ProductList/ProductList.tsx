import { SearchIcon, SettingIcon } from 'src/assets/icons'
import logo from 'src/assets/images/logo-hacom-since-2001.png'

export default function ProductList() {
  return (
    <div className='bg-white py-6'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-10 items-center'>
          <div className='col-span-2'>
            <img src={logo} alt='logo-hacom' />
          </div>
          <div className='col-span-5'>
            <form className='flex h-8'>
              <input
                type='text'
                className='grow rounded-l-full border-2 border-red-500 px-5 py-1 text-xs text-[#000] outline-none'
                placeholder='Nhập tên sản phẩm, từ khóa cần tìm'
              />
              <button className='rounded-r-full bg-red-500 px-5 py-1 text-white'>
                <SearchIcon className='h-4 w-4' />
              </button>
            </form>
          </div>
          <div className='col-span-3'>
            <div className='grid grid-cols-3'>
              <div className='col-span-1'>
                <div className='flex pl-2'>
                  <div className='flex items-center gap-1'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full border border-[#666] shadow-sm'>
                      <SettingIcon className='h-5 w-5' stroke='#666' />
                    </div>
                    <div className='flex flex-col'>
                      <span className='text-xs text-[#333e48]'>Xây dựng</span>
                      <span className='text-xs text-[#333e48]'>cấu hình</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-1'>
                <svg xmlns='http://www.w3.org/2000/svg' height='36' viewBox='0 0 64 64' width='36'>
                  <g id='Icons'>
                    <g>
                      <g>
                        <path d='m54 28h-12v20h-38v4h54c1.105 0 2-.895 2-2v-12z' fill='#243a76'></path>
                      </g>
                      <g>
                        <path
                          d='m32 22c-4.091 0-7.612-2.473-9.159-6h-18.841v32h38v-32h-.841c-1.547 3.527-5.068 6-9.159 6z'
                          fill='#ed1b24'
                        ></path>
                      </g>
                      <g>
                        <path d='m4 16h4v32h-4z' fill='#d70d16'></path>
                      </g>
                      <g>
                        <path d='m14 30v-2h-6v10h2v-4h4v-2h-4v-2z' fill='#f0f0f0'></path>
                      </g>
                      <g>
                        <path d='m30 30v-2h-6v10h6v-2h-4v-2h4v-2h-4v-2z' fill='#f0f0f0'></path>
                      </g>
                      <g>
                        <path d='m38 30v-2h-6v10h6v-2h-4v-2h4v-2h-4v-2z' fill='#f0f0f0'></path>
                      </g>
                      <g>
                        <path
                          d='m22 31.914v-1.828c0-1.152-.934-2.086-2.086-2.086h-3.828c-.047 0-.086.038-.086.086v9.828c0 .047.039.086.086.086h1.828c.047 0 .086-.039.086-.086v-3.828c0-.018.01-.033.019-.047l1.981 3.961h2l-2.004-4.008c1.113-.044 2.004-.954 2.004-2.078zm-3 .086h-1v-2h1c.552 0 1 .448 1 1s-.448 1-1 1z'
                          fill='#f0f0f0'
                        ></path>
                      </g>
                      <g>
                        <path d='m4 48h4v4h-4z' fill='#182c62'></path>
                      </g>
                      <g>
                        <path d='m54 28h-12v-4h12c1.105 0 2 .895 2 2 0 1.105-.895 2-2 2z' fill='#505050'></path>
                      </g>
                      <g>
                        <path d='m60 38h-12v-10h6z' fill='#f0f0f0'></path>
                      </g>
                      <g>
                        <path d='m55 46h5v-4h-5c-.552 0-1 .448-1 1v2c0 .552.448 1 1 1z' fill='#fab400'></path>
                      </g>
                      <g>
                        <path
                          d='m51 56c-2.761 0-5-2.239-5-5 0-2.761 2.239-5 5-5 2.761 0 5 2.239 5 5 0 2.761-2.239 5-5 5z'
                          fill='#505050'
                        ></path>
                      </g>
                      <g>
                        <path
                          d='m13 56c-2.761 0-5-2.239-5-5 0-2.761 2.239-5 5-5 2.761 0 5 2.239 5 5 0 2.761-2.239 5-5 5z'
                          fill='#505050'
                        ></path>
                      </g>
                      <g>
                        <path
                          d='m51 53c-1.105 0-2-.895-2-2 0-1.105.895-2 2-2 1.105 0 2 .895 2 2 0 1.105-.895 2-2 2z'
                          fill='#f0f0f0'
                        ></path>
                      </g>
                      <g>
                        <path
                          d='m13 53c-1.105 0-2-.895-2-2 0-1.105.895-2 2-2 1.105 0 2 .895 2 2 0 1.105-.895 2-2 2z'
                          fill='#f0f0f0'
                        ></path>
                      </g>
                      <g>
                        <circle cx='32' cy='12' fill='#00af80' r='8'></circle>
                      </g>
                      <g>
                        <path
                          d='m25.983 12c0-4.082 3.059-7.443 7.009-7.932-.326-.041-.656-.068-.992-.068-4.418 0-8 3.582-8 8s3.582 8 8 8c.336 0 .666-.027.991-.068-3.949-.489-7.008-3.85-7.008-7.932z'
                          fill='#048f69'
                        ></path>
                      </g>
                      <g>
                        <path d='m37 10-6 6-4-4 2-2 2 2 4-4z' fill='#f0f0f0'></path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
