import express, { Application } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import timeout from 'connect-timeout'
import healthCheck, { haltOnTimedout } from './health-check'
import { corsOptions } from './cors'
import { handleErrorResponse } from '../shared/helpers/response-handler'

const ExpressConfig = (): Application => {
  const app = express()
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(helmet())
  app.use(morgan('dev'))
  app.use(timeout('30s'))
  app.use(cors(corsOptions))
  app.use('/healthcheck', healthCheck)

  app.use(haltOnTimedout)
  app.use(handleErrorResponse)

  return app
}

export default ExpressConfig
