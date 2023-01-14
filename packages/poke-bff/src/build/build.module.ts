import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { PokemonRepository } from '../repository/pokemon.repository';

@Module({
  providers: [BuildService, PokemonRepository],
  controllers: [BuildController],
})
export class BuildModule {}
