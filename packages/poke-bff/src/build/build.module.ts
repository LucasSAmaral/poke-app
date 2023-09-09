import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildController } from './build.controller';
import { PokemonRepository } from '../repository/pokemon.repository';
import { RequestService } from '../services/request.service';

@Module({
  providers: [BuildService, PokemonRepository, RequestService],
  controllers: [BuildController],
})
export class BuildModule {}
