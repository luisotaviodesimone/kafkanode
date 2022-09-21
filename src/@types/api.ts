import express from 'express';

export interface MyKafkaRequest extends express.Request {
  admin?: any;
}

export interface MyKafkaResponse extends express.Response {}