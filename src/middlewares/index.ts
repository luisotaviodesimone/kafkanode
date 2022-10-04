import { NextFunction } from 'express';
import { MyKafkaRequest, MyKafkaResponse } from '../@types';

export const ensureTopicMiddleware = (
  req: MyKafkaRequest,
  res: MyKafkaResponse,
  next: NextFunction
) => {
  const { topic } = req.body;

  if (!topic) return res.json({ response: 'Topic not given' });

  return next();
};

export const ensureTopicAndMessageMiddleware = (
  req: MyKafkaRequest,
  res: MyKafkaResponse,
  next: NextFunction
) => {
  const { topic, message } = req.body;

  if (!topic) return res.json({ response: 'Topic not given' });

  if (!message) return res.json({ response: 'Message not given' });

  return next();
};
