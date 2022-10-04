import { Consumer } from 'kafkajs';

export interface ConsumerRunProcess {
  counter: number;
  consumerName: string;
  consumer: Consumer;
}