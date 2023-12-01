import { ObjectId } from 'mongoose'
import { UserModel } from './UserModel'

export class AuthUserModel extends UserModel {
  public constructor(
    public readonly id: ObjectId,
    public readonly password: string,
    name: string,
    email: string,
    gender: string,
    birthYear: number,
    photoUri?: string,
  ) {
    super(name, email, gender, birthYear, photoUri)
  }
}
