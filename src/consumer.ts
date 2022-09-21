import { Consumer, Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const topicName = 'orderCreated';
const consumerNumber = process.argv[2] || '1';

const processConsumer = async () => {
  const ordersConsumer = kafka.consumer({ groupId: 'orders' });
  const paymentsConsumer = kafka.consumer({ groupId: 'payments' });
  const notificationsConsumer = kafka.consumer({ groupId: 'notifications' });
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

  // await ordersConsumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     logMessage(
  //       orderCounter,
  //       `ordersConsumer#${consumerNumber}`,
  //       topic,
  //       partition,
  //       message
  //     );
  //     orderCounter++;
  //   },
  // });

  // await paymentsConsumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     logMessage(
  //       paymentCounter,
  //       `paymentsConsumer#${consumerNumber}`,
  //       topic,
  //       partition,
  //       message
  //     );
  //     paymentCounter++;
  //   },
  // });

  // await notificationsConsumer.run({
  //   eachMessage: async ({ topic, partition, message }) => {
  //     logMessage(
  //       notificationCounter,
  //       `notificationsConsumer#${consumerNumber}`,
  //       topic,
  //       partition,
  //       message
  //     );
  //     notificationCounter++;
  //   },
  // });
};

const run = async ({
  counter,
  consumerName,
  consumer,
}: {
  counter: number;
  consumerName: string;
  consumer: Consumer;
}) => {
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logMessage(
        counter,
        `${consumerName}#${consumerNumber}`,
        topic,
        partition,
        message
      );
      counter++;
    },
  });
};

const logMessage = (
  counter: number,
  consumerName: string,
  topic: string,
  partition: number,
  message: any
) => {
  console.log(
    `received a new message number: ${counter} on ${consumerName}: `,
    {
      topic,
      partition,
      message: {
        offset: message.offset,
        headers: message.headers,
        value: message.value.toString(),
      },
    }
  );
};

processConsumer();
