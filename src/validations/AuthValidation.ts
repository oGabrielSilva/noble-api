import mongoose from 'mongoose'

export class AuthValidation {
  public static readonly EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  public static readonly MAX_YEAR = new Date().getFullYear() - 55
  public static readonly MIN_YEAR = new Date().getFullYear() - 14

  public static nameIsValid(name: string) {
    return typeof name === 'string' && name.length >= 2
  }

  public static emailIsValid(email: string) {
    return typeof email === 'string' && AuthValidation.EMAIL_REGEX.test(email)
  }

  public static genderIsValid(gender: string) {
    return typeof gender === 'string' && ['F', 'M', 'O'].includes(gender)
  }

  public static birthYearIsValid(year: number) {
    return (
      typeof year === 'number' && year < AuthValidation.MIN_YEAR && year > AuthValidation.MAX_YEAR
    )
  }

  public static passwordIsValid(pass: string) {
    return typeof pass === 'string' && pass.length >= 8
  }

  public static isObjectIdValid(id: string) {
    return !!id && mongoose.Types.ObjectId.isValid(id)
  }
}
