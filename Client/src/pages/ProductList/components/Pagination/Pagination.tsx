import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

/**
 * Với Range = 2 áp dụng cho khoảng cách đầu, cuối va xung quanh current_page
 * [1] 2 3 ... 19 20
 * 1 [2] 3 4 ... 19 20
 * 1 2 [3] 4 5 ... 19 20
 * 1 2 3 [4] 5 6 ... 19 20
 * 1 2 3 4 [5] 6 7 ... 19 20
 *
 * 1 2 ... 4 5 [6] 7 8 ... 19 20
 * ...
 * 1 2 ... 13 14 [15] 16 17 ... 19 20
 *
 * 1 2 ... 14 15 [16] 17 18 19 20
 * 1 2 ... 15 16 [17] 18 19 20
 * 1 2 ... 16 17 [18] 19 20
 * 1 2 ... 17 18 [19] 20
 * 1 2 ... 18 19 [20]
 */

const RANGE = 2

export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true

        return (
          <span key={index} className='mx-2 cursor-pointer rounded border bg-white px-3 py-2 shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        // ĐIều kiện return vê ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber <= pageSize - RANGE) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: undefined,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'mx-[2px] cursor-pointer rounded border bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='mx-[2px] cursor-not-allowed rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: undefined,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-[2px] cursor-pointer rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='mx-[2px] cursor-not-allowed rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: undefined,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-[2px] cursor-pointer rounded bg-white font-semibold text-[#243a76] hover:bg-[#243a76] hover:text-white xl:px-[7px] xl:py-[3px] xl:text-xs 2xl:px-3 2xl:py-2 2xl:text-sm'
        >
          Next
        </Link>
      )}
    </div>
  )
}
