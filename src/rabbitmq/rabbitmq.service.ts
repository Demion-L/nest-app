import { Inject, Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ROUTING_KEYS, QUEUES } from './rabbitmq.config';

interface FlowerMessage {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
}

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);

  constructor(
    @Inject(AmqpConnection) private readonly amqpConnection: AmqpConnection,
  ) {}

  // Method to publish a message
  async publishMessage(message: FlowerMessage, routingKey: string) {
    await this.amqpConnection.publish('flowers_exchange', routingKey, message);
    return { success: true, message: 'Message published' };
  }

  // Handler for flower created events
  @RabbitSubscribe({
    exchange: 'flowers_exchange',
    routingKey: ROUTING_KEYS.FLOWER_CREATED,
    queue: QUEUES.FLOWERS_QUEUE,
  })
  public async handleFlowerCreated(message: FlowerMessage) {
    this.logger.log('Received flower created event', message);
    try {
      await this.processFlowerCreated(message);
    } catch (error) {
      this.logger.error('Error processing flower created event', error);
      throw error;
    }
  }

  // Handler for flower updated events
  @RabbitSubscribe({
    exchange: 'flowers_exchange',
    routingKey: ROUTING_KEYS.FLOWER_UPDATED,
    queue: QUEUES.FLOWERS_QUEUE,
  })
  public async handleFlowerUpdated(message: FlowerMessage) {
    this.logger.log('Received flower updated event', message);
    try {
      await this.processFlowerUpdated(message);
    } catch (error) {
      this.logger.error('Error processing flower updated event', error);
      throw error;
    }
  }

  private async processFlowerCreated(message: FlowerMessage): Promise<void> {
    // Add your processing logic here
    // Example: Save to database, send notifications, etc.
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate async operation
    this.logger.log(
      'Successfully processed flower created',
      message.id ? { id: message.id } : { message: 'unknown' },
    );
  }

  private async processFlowerUpdated(message: FlowerMessage): Promise<void> {
    // Add your processing logic here
    // Example: Update database, send notifications, etc.
    await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate async operation
    this.logger.log(
      'Successfully processed flower updated',
      message.id ? { id: message.id } : { message: 'unknown' },
    );
  }
}
