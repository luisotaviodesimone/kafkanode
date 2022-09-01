import express from 'express';
import { Kafka } from 'kafkajs';
import routes from './routes';

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092'],
});

const app = express();

const admin = kafka.admin();

app.use((req, res, next) => {
  req.admin = admin

  next();
}, express.json(), routes);

const run = async () => {
  app.listen(3333, () => {
    console.log('Server started on port 3333 🚀');
  });
};

run().catch(console.error);
