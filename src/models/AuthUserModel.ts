import { UserModel } from './UserModel'

export class AuthUserModel extends UserModel {
  public constructor(
    public readonly id: string,
    public readonly password: string,
    name: string,
    email: string,
    gender: string,
    birthYear: number,
    photoUri?: string,
  ) {
    super(id, name, email, gender, birthYear, photoUri)
  }
}
