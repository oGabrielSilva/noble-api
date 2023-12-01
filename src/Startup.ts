import e from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { getRouter } from './routes/auth'
import { ExceptionMiddleware } from './middlewares/ExceptionMiddleware'
import { NotFoundException } from './exceptions/NotFoundException'
import path from 'path'

dotenv.config()

class Startup {
  private readonly app = e()
  private readonly port = process.env.PORT ?? 3000

  private configureStatic() {
    this.app.use('/static', e.static(path.resolve(__dirname, '..', 'public')))
  }

  private useExceptionHandler() {
    this.app.use((_, _1, next) => next(new NotFoundException('path not found')))
    this.app.use(new ExceptionMiddleware().use)
  }

  private expressMiddlewares() {
    this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private async configureDBClient() {
    try {
      await mongoose.connect(process.env.DATABASE_URL!)
      this.app.emit('db-client')
    } catch (error) {
      console.log('MongoDB client error:', error)
    }
  }

  private useRoutes() {
    this.app.use('/auth', getRouter())
  }

  private configure() {
    this.configureStatic()
    this.expressMiddlewares()
    this.configureDBClient()
    this.useRoutes()
    this.useExceptionHandler()
  }

  public run() {
    this.app.on('db-client', () =>
      this.app.listen(this.port, () => console.log(`App on http://127.0.0.1:${this.port}`)),
    )
    this.configure()
  }
}

new Startup().run()
