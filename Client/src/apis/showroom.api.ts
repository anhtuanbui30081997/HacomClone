import { RegionType, ShowroomType } from 'src/types/showroom.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'showrooms'

const showroomApi = {
  getShowrooms(region: RegionType) {
    return http.get<SuccessResponse<ShowroomType[]>>(`${URL}/region/${region}`)
  }
}

export default showroomApi
