import express from 'express';
import { MyKafkaRequest, MyKafkaResponse } from './@types/api';
import { processConsumer } from './consumer';

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

routes.post('/create-consumer', async (req: MyKafkaRequest, res: MyKafkaResponse) => {
  const { topic } = req.body;


  await processConsumer(topic)

  return res.json({ message: 'Consumer created' });

})

export default routes;