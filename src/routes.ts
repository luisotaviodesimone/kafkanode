import express, { NextFunction } from 'express';
import { MyKafkaRequest, MyKafkaResponse } from './@types';
import { processConsumer } from './consumer';
import { processProducer } from './producer/producer';
import {
  ensureTopicMiddleware,
  ensureTopicAndMessageMiddleware,
} from './middlewares';

const routes = express.Router();

routes.post(
  '/create-topic',
  ensureTopicMiddleware,
  async (req: MyKafkaRequest, res: MyKafkaResponse) => {
    const { admin } = req;
    const { topic } = req.body;

    await admin.connect();

    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: 2,
          replicationFactor: 1,
        },
      ],
    });

    await admin.disconnect();

    return res.json({ response: 'Topic created' });
  }
);

routes.post(
  '/create-consumer',
  async (req: MyKafkaRequest, res: MyKafkaResponse) => {
    const { topic } = req.body;

    if (!topic) return res.json({ response: 'Topic not found' });

    await processConsumer(topic);

    return res.json({ response: 'Consumer created' });
  }
);

routes.post(
  '/send-message',
  ensureTopicAndMessageMiddleware,
  async (req: MyKafkaRequest, res: MyKafkaResponse) => {
    const { topic, message } = req.body;

    await processProducer(topic, message);

    return res.json({ response: 'Message sent', topic, message });
  }
);

export default routes;
