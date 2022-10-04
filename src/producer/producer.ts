import { Kafka } from 'kafkajs';
import { MyKafkaMessage } from '../@types';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

export const processProducer = async (topicName: string, message: MyKafkaMessage) => {
  const producer = kafka.producer();
  await producer.connect();

  for (let i = 0; i < 3; i++) {
    await producer.send({
      topic: topicName,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
};
