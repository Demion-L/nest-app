import { DynamicModule, Module } from '@nestjs/common';
import { RabbitMQModule as NestRabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQService } from './rabbitmq.service';

export interface RabbitMQModuleOptions {
  uri: string;
  exchanges: Array<{
    name: string;
    type: string;
  }>;
  connectionInitOptions?: {
    timeout: number;
  };
  enableControllerDiscovery?: boolean;
  defaultRpcTimeout?: number;
}

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitmqModule {
  static forRoot(options: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitmqModule,
      imports: [
        NestRabbitMQModule.forRoot({
          ...options,
          connectionInitOptions: options.connectionInitOptions || {
            timeout: 10000,
          },
          enableControllerDiscovery:
            options.enableControllerDiscovery !== false,
          defaultRpcTimeout: options.defaultRpcTimeout || 20000,
        }),
      ],
      exports: [NestRabbitMQModule, RabbitMQService],
    };
  }
}
