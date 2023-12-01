import { InternalServerErrorException } from '../exceptions/InternalServerErrorException'
import { HTTPStatus } from '../resources/HTTPStatus'
import { Response } from '../resources/Response'

export class ExceptionMiddleware implements ExceptionHandler {
  public use(err: unknown, _: Req, res: Res, next: Next) {
    if (err instanceof InternalServerErrorException)
      res
        .status(err.status)
        .json(Response.JSON(true, err.causedBy, err.status, null, err.timestamp))
    else {
      res
        .status(HTTPStatus.INTERNAL_SERVER_ERROR)
        .json(
          Response.JSON(
            true,
            res.locals.strings?.internalServerExceptionDefaultMessage || '',
            HTTPStatus.INTERNAL_SERVER_ERROR,
            null,
          ),
        )
      console.log(err)
    }
    next()
  }
}
