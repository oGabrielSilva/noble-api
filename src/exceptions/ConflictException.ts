import { HTTPStatus } from '../resources/HTTPStatus'
import { InternalServerErrorException } from './InternalServerErrorException'

export class ConflictException extends InternalServerErrorException {
  public constructor(message = 'Conflict with the current state of the resource') {
    super(message, HTTPStatus.CONFLICT)
  }
}
