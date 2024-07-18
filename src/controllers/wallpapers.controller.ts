import {catchAsync} from '@/utils/catchAsync';
import {Request, Response} from 'express';
import Joi from 'joi';

export const getWallpapers = catchAsync(async (req: Request, res: Response) => {
  const {value, error} = Joi.object({
    limit: Joi.number().required(),
    offset: Joi.number().required(),
  }).validate(req.query);

  if (error) {
    throw error;
  }

  const {limit, offset} = value;
  // get wallpapers from database
  res.json({limit, offset});
});
