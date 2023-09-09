import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ActionModule } from '../action/action.module';
import { BuildModule } from '../build/build.module';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
  imports: [ActionModule, BuildModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
