import express, { NextFunction, Request, Response } from 'express'
const router = express.Router()

router.get('/', async (_req: Request, res, next: NextFunction) => {
  try {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now()
    }

    res.send(healthcheck)
  } catch (err) {
    next(err)
  }
})

export function haltOnTimedout (req: Request, _res: Response, next: NextFunction) {
  if (!req.timedout) next()
}

export default router
