import multer from 'multer'
import { AVATAR_PATH, WEB_USER_ID_HEADER_KEY, getAvatarUri } from '../../resources/constants'
import { AuthValidation } from '../../validations/AuthValidation'
import { BadRequestException } from '../../exceptions/BadRequestException'
import { UserDataModel } from '../models/UserDataModel'
import { NotFoundException } from '../../exceptions/NotFoundException'

export class MulterService {
  public static profile() {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, AVATAR_PATH),
      filename: (req, file, cb) => {
        const id = req.headers[WEB_USER_ID_HEADER_KEY]
        if (typeof id !== 'string')
          return cb(new BadRequestException('ID do usuário não informado'), '')
        if (!AuthValidation.isObjectIdValid(id))
          return cb(new BadRequestException('Tivemos um erro com o id fornecido'), '')
        UserDataModel.findById(id).then(user => {
          if (!user) return cb(new NotFoundException('Usuário não existe'), '')
          const fileName = `${id}` + '.' + file.fieldname
          user.photoUri = getAvatarUri(fileName)
          req.app.locals.uri = user.photoUri
          user.save()
          cb(null, fileName)
        })
      },
    })

    return multer({ storage })
  }
}
