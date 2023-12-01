/* eslint-disable no-var */
import type { NextFunction, Request, Response } from 'express'
import type { PrismaClient } from '@prisma/client'

export declare global {
  interface Req<T = null> extends Request {
    body: T
  }

  interface Res extends Response {}

  type Next = NextFunction

  interface Middleware {
    use(req: Req, res: Res, next: Next): void
  }

  interface ExceptionHandler {
    use(err: unknown, _: Req, res: Res, next: Next): void
  }

  namespace globalThis {
    var prismaGlobal: PrismaClient
  }
}
