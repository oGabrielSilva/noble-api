import { AuthValidation } from '../validations/AuthValidation'

export class UserModel {
  public constructor(
    public id: string,
    public name: string,
    public email: string,
    public gender: string,
    public birthYear: number,
    public photoUri: string | null = null,
  ) {}

  private static inst() {
    return new this('', '', '', '', 0)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static from(object: any) {
    const instance = UserModel.inst()
    if (!AuthValidation.isObjectIdValid(object._id)) return null
    if (!AuthValidation.nameIsValid(object.name)) return null
    if (!AuthValidation.emailIsValid(object.email)) return null
    if (!AuthValidation.genderIsValid(object.gender)) return null
    if (!AuthValidation.birthYearIsValid(object.birthYear)) return null
    instance.name = object.name
    instance.email = object.email
    instance.gender = object.gender
    instance.birthYear = object.birthYear
    instance.id = object._id
    return instance
  }
}
