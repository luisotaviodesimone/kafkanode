import express from 'express';
import { MyKafkaRequest, MyKafkaResponse } from './@types/api';

const routes = express.Router();

routes.post('/create-topic', async (req: MyKafkaRequest, res: MyKafkaResponse) => {

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

  return res.json({ message: 'Topic created' });
});

export default routes;