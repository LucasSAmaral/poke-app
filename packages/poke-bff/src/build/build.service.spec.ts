import { Test, TestingModule } from '@nestjs/testing';
import { PokemonRepository } from '../repository/pokemon.repository';
import { BuildService } from './build.service';

describe('BuildService', () => {
  let service: BuildService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildService, PokemonRepository],
    }).compile();

    service = module.get<BuildService>(BuildService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
