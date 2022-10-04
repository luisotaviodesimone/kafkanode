import { Kafka } from 'kafkajs';
import { run } from './consumer';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

export const processConsumer = async (topicName: string) => {

  const ordersConsumer = kafka.consumer({
    groupId: 'orders',
    allowAutoTopicCreation: false,
  });
  const paymentsConsumer = kafka.consumer({
    groupId: 'payments',
    allowAutoTopicCreation: false,
  });
  const notificationsConsumer = kafka.consumer({
    groupId: 'notifications',
    allowAutoTopicCreation: false,
  });

  await Promise.all([
    ordersConsumer.connect(),
    paymentsConsumer.connect(),
    notificationsConsumer.connect(),
  ]);

  await Promise.all([
    await ordersConsumer.subscribe({ topic: topicName }),
    await paymentsConsumer.subscribe({ topic: topicName }),
    await notificationsConsumer.subscribe({ topic: topicName }),
  ]);

  let orderCounter = 1;
  let paymentCounter = 1;
  let notificationCounter = 1;

  await run({
    counter: orderCounter,
    consumerName: 'ordersConsumer',
    consumer: ordersConsumer,
  });
  await run({
    counter: paymentCounter,
    consumerName: 'paymentsConsumer',
    consumer: paymentsConsumer,
  });
  await run({
    counter: notificationCounter,
    consumerName: 'notificationsConsumer',
    consumer: notificationsConsumer,
  });
};
