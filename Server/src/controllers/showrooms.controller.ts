import { Request, Response, NextFunction } from 'express'
import { RegionType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { SHOWROOM_MESSAGES } from '~/constants/messages'
import { GetShowroomReqParams } from '~/models/requests/Showroom.requests'
import showroomService from '~/services/showroom.service'

class ShowroomController {
  async getShowroomsByRegion(req: Request<GetShowroomReqParams>, res: Response, next: NextFunction) {
    const { region } = req.params
    const showrooms = await showroomService.getShowroomsByRegion(Number(region) as RegionType)
    return res.status(HTTP_STATUS.OK).json({
      message: SHOWROOM_MESSAGES.GET_SHOWROOMS_SUCCESSFULLY,
      data: showrooms
    })
  }
}

const showroomController = new ShowroomController()
showroomController.getShowroomsByRegion
export default showroomController
