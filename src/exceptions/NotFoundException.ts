import { HTTPStatus } from '../resources/HTTPStatus'
import { InternalServerErrorException } from './InternalServerErrorException'

export class NotFoundException extends InternalServerErrorException {
  public constructor(message = 'the server cannot find the requested resource') {
    super(message, HTTPStatus.NOT_FOUND)
  }
}
