import axios from '../config/axios';
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

const options = () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};
router.get(
  '/',
  async (_req: Request | any, res: Response | any, next: NextFunction) => {
    try {
      const response = await axios.get('/metadata', options());
      console.log(`print response - data ${JSON.stringify(response.data)}`);

      res.json(response.data);
    } catch (err) {
      next(err);
    }
  }
);

export function testOnTimedout(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.timedout) next();
}

export default router;
