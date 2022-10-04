import express from 'express';
import { MyKafkaMessage } from './producer';

export interface MyKafkaRequest extends express.Request {
  admin?: any;
  body: {
    topic: string;
    message: MyKafkaMessage;
  }
}

export interface MyKafkaResponse extends express.Response {}