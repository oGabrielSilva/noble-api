import { HTTPStatus } from './HTTPStatus'

export class Response {
  private static readonly Body = class<T> {
    public constructor(
      public readonly error: boolean,
      public readonly body: T,
      public readonly message: string,
      public readonly status: number,
      public readonly timestamp: number,
    ) {}
  }

  public static JSON<T = null>(
    error: boolean,
    message: string,
    status: HTTPStatus,
    body?: T,
    timestamp = Date.now(),
  ) {
    return new Response.Body(error, body, message, status, timestamp)
  }
}
