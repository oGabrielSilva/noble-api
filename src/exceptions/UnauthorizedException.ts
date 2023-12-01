import { HTTPStatus } from '../resources/HTTPStatus'
import { InternalServerErrorException } from './InternalServerErrorException'

export class UnauthorizedException extends InternalServerErrorException {
  public constructor(message = 'client must authenticate itself to get the requested response') {
    super(message, HTTPStatus.UNAUTHORIZED)
  }
}
