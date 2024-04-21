import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { Request } from 'express'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR } from '~/constants/direction'
import { IncomingForm } from 'formidable'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // Create folder nested
      })
    }
  })
}

export const handleUploadImage = async (req: Request) => {
  const form = new IncomingForm({
    multiples: true,
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 16,
    keepExtensions: true,
    maxFileSize: 3000 * 1024, //300KB
    maxTotalFileSize: 3000 * 1024 * 4,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log('err:', err)
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        console.log('File is empty')
        return reject(new Error('File is empty'))
      }
      resolve(files.image as File[])
    })
  })
}

export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('.')
}

export const getExtension = (fullname: string) => {
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
}
