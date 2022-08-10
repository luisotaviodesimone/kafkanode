import express from 'express';
import { Kafka, Partitioners } from 'kafkajs';
import routes from './routes';

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['kafka1:9092'],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});

const app = express();

app.use((req, res, next) => {
  req.producer = producer;

  next();
}, routes);

const run = async () => {
  app.listen(3333, () => {
    console.log('Server started on port 3333 🚀');
  });
};

run().catch(console.error);
