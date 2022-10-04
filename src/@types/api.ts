import express from 'express';
import { Consumer } from 'kafkajs';

export interface MyKafkaRequest extends express.Request {
  admin?: any;
}

export interface MyKafkaResponse extends express.Response {}

export interface ConsumerRunProcess {
  counter: number;
  consumerName: string;
  consumer: Consumer;
}