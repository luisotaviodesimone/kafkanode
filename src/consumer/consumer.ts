import { ConsumerRunProcess } from '../@types';

const consumerNumber = process.argv[2] || '1';

export const run = async ({ counter, consumerName, consumer }: ConsumerRunProcess) => {
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
  , null, 2);
};
