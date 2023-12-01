import bcrypt from 'bcryptjs'

export class EncoderTool {
  private readonly salt = bcrypt.genSaltSync()

  public standardSaltHash(str: string) {
    return bcrypt.hash(str, this.salt)
  }

  public compareStandardHash(str: string, hash: string) {
    return bcrypt.compare(str, hash)
  }
}
