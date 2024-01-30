import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ActionModule } from '../action/action.module';
import { BuildModule } from '../build/build.module';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

@Module({
  imports: [
    ActionModule,
    BuildModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'poke-front', 'dist'),
      exclude: ['poke-bff/*'],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
