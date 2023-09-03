import express, { NextFunction, Request, Response } from 'express';
import axios from '../config/axios';

const router = express.Router();
const options = () => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return options;
};

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await axios.get('/metadata', options());
    console.log(`print response - data ${JSON.stringify(response.data)}`);

    res.json(response.data);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
