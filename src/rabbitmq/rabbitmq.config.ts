export const rabbitmqConfig = {
  exchanges: [
    {
      name: 'flowers_exchange',
      type: 'direct',
    },
  ],
  uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
  connectionInitOptions: { timeout: 10000 },
  enableControllerDiscovery: true,
  defaultRpcTimeout: 20000,
};

export const QUEUES = {
  FLOWERS_QUEUE: 'flowers_queue',
};

export const ROUTING_KEYS = {
  FLOWER_CREATED: 'flower_created',
  FLOWER_UPDATED: 'flower_updated',
};
