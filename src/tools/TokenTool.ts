import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { InternalServerErrorException } from '../exceptions/InternalServerErrorException'

dotenv.config()

const w = 7 * 24 * 60 * 60 * 1000
const KEY = process.env.TOKEN_KEY as string

export class TokenTool {
  public create(id: string, email: string, name: string) {
    try {
      const now = Date.now()
      const payload = { id, email, name, createdAt: now, expires: now + w }
      return jwt.sign(payload, KEY, { expiresIn: '7d' })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Erro ao criar o token de validação')
    }
  }

  public validate(token: string) {
    try {
      return jwt.verify(token, KEY)
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Erro ao validar o token')
    }
  }
}
