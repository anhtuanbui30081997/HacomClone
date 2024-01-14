import { RegionType } from '~/constants/enums'
import databaseService from './database.service'

class ShowroomService {
  async getShowroomsByRegion(region: RegionType) {
    const showrooms = await databaseService.showrooms
      .find({
        region: region
      })
      .toArray()
    return showrooms
  }
}

const showroomService = new ShowroomService()
export default showroomService
