import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchParams] = useSearchParams()
  const temParams = Object.fromEntries([...searchParams])
  const params = Object.keys(temParams)
    .filter((key) => temParams[key] !== '')
    .reduce((obj, key) => {
      return Object.assign(obj, {
        [key]: temParams[key]
      })
    }, {})
  return params
}
