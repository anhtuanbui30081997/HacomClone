import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR } from '~/constants/direction'

class MediasController {
  async serveImageController(req: Request, res: Response, next: NextFunction) {
    const { name } = req.params
    return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
      if (err) {
        res.status((err as any).status).send('Image not found')
      }
    })
  }
}

const mediasController = new MediasController()
export default mediasController
