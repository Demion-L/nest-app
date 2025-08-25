import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { FlowersModule } from './flowers/flowers.module';
import { LoggerMiddleware } from './conception/middleware';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitmqModule.forRoot({
      uri: process.env.RABBITMQ_URI || 'amqp://localhost:5672',
      exchanges: [
        {
          name: 'flowers_exchange',
          type: 'direct',
        },
      ],
      connectionInitOptions: {
        timeout: 10000,
      },
      enableControllerDiscovery: true,
      defaultRpcTimeout: 20000,
    }),
    FlowersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('flowers');
  }
}
