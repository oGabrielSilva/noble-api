import { UserDataModel } from '../db/models/UserDataModel'
import { MulterService } from '../db/services/MulterService'
import { BadRequestException } from '../exceptions/BadRequestException'
import { ConflictException } from '../exceptions/ConflictException'
import { NotFoundException } from '../exceptions/NotFoundException'
import { UnauthorizedException } from '../exceptions/UnauthorizedException'
import { AuthUserModel } from '../models/AuthUserModel'
import { UserModel } from '../models/UserModel'
import { WEB_TOKEN_HEADER_KEY, getAvatarUri } from '../resources/constants'
import { HTTPStatus } from '../resources/HTTPStatus'
import { Response } from '../resources/Response'
import { EncoderTool } from '../tools/EncoderTool'
import { TokenTool } from '../tools/TokenTool'
import { AuthValidation } from '../validations/AuthValidation'

const encoder = new EncoderTool()
const token = new TokenTool()

export class AuthController {
  private static readonly profileMulter = MulterService.profile()

  public static async signIn(req: Req<AuthUserModel>, res: Res) {
    const { email, password } = req.body
    if (!AuthValidation.emailIsValid(email))
      throw new BadRequestException('Tivemos um erro ao validar o campo email')
    if (!AuthValidation.passwordIsValid(password))
      throw new BadRequestException('Tivemos um erro ao validar a senha')

    const userByEmail = await UserDataModel.findOne({ email })
    if (!userByEmail) throw new NotFoundException('Email informado não está cadastrado')
    const passwordMatches = await encoder.compareStandardHash(password, userByEmail.password!)
    if (!passwordMatches) throw new UnauthorizedException('Senha incorreta')

    res
      .status(HTTPStatus.OK)
      .setHeader(
        WEB_TOKEN_HEADER_KEY,
        token.create(userByEmail._id.toString(), email, userByEmail.name!),
      )
      .json(
        Response.JSON(
          false,
          'Usuário logado com sucesso',
          HTTPStatus.OK,
          UserModel.from(userByEmail),
        ),
      )
  }

  public static async signUp(req: Req<AuthUserModel>, res: Res) {
    const { name, email, gender, birthYear, password: pass } = req.body
    if (!AuthValidation.nameIsValid(name))
      throw new BadRequestException('Tivemos um erro ao validar o campo nome')
    if (!AuthValidation.emailIsValid(email))
      throw new BadRequestException('Tivemos um erro ao validar o campo email')
    if (!AuthValidation.genderIsValid(gender))
      throw new BadRequestException('Tivemos um erro ao validar o campo do gênero')
    if (!AuthValidation.birthYearIsValid(birthYear))
      throw new BadRequestException('Tivemos um erro ao validar a data de nascimento')
    if (!AuthValidation.passwordIsValid(pass))
      throw new BadRequestException('Tivemos um erro ao validar a senha')

    const userByEmail = await UserDataModel.findOne({ email })
    if (userByEmail) throw new ConflictException('Email informado já está cadastrado')
    const password = await encoder.standardSaltHash(pass)
    const user = new UserDataModel({
      email,
      name,
      gender,
      birthYear,
      password,
    })
    await user.save()
    res
      .setHeader(WEB_TOKEN_HEADER_KEY, token.create(user._id.toString(), email, name))
      .status(HTTPStatus.CREATED)
      .json(
        Response.JSON(
          false,
          'Usuário criado com sucesso',
          HTTPStatus.CREATED,
          UserModel.from(user),
        ),
      )
  }

  public static async avatar(req: Req, res: Res, next: Next) {
    AuthController.profileMulter.single('avatar')(req, res, async err => {
      console.log(req)
      if (err) return next(err)
      res.status(200).json(Response.JSON(false, getAvatarUri(res.locals.uri), HTTPStatus.OK))
    })
  }
}
