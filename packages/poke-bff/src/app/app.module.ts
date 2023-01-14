import { Module } from '@nestjs/common';
import { ActionModule } from '../action/action.module';
import { BuildModule } from '../build/build.module';

@Module({
  imports: [ActionModule, BuildModule],
})
export class AppModule {}
