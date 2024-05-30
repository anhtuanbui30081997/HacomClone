import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { SeacrhProductSchema, searchProductSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'

type FormData = SeacrhProductSchema
const nameSchema = searchProductSchema

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.sort
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['sort']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: undefined,
      search: createSearchParams(config).toString()
    })
    reset()
  })
  return { onSubmitSearch, register }
}
