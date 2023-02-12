import { Test, TestingModule } from '@nestjs/testing';
import { PokemonRepository } from '../repository/pokemon.repository';
import { BuildController } from './build.controller';
import { BuildService } from './build.service';

describe.skip('BuildController', () => {
  let controller: BuildController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildService, PokemonRepository],
      controllers: [BuildController],
    }).compile();

    controller = module.get<BuildController>(BuildController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
