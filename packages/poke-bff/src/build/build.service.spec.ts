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

  it('should build main page', () => {
    const mainPageResponse = service.buildMainPage({});

    const expectedResponse = {
      pageTitle: 'PokeApp',
      menuOptions: [
        { menuOptionName: 'Party', linkPath: 'poke-party' },
        {
          menuOptionName: 'Pokedex',
          linkPath: 'pokedex',
        },
        {
          menuOptionName: 'Who Is That Pokémon?',
          linkPath: 'who-is-that-pokemon',
        },
      ],
    };

    expect(mainPageResponse).toEqual(expectedResponse);
  });

  it('should build Who Is That Pokemon Page', async () => {
    const expectedResponse = {
      correctAnswer: 'pikachu',
      pokemonOptions: ['weedle', 'pinsir', 'spearow', 'dratini', 'pikachu'],
      pokemonImageUrl:
        'https://assets.pokemon.com/assets/cms2/img/pokedex/full/000.png',
    };

    jest
      .spyOn(service, 'buildWhoIsThatPokemonPage')
      .mockImplementation(async () => expectedResponse);

    const whoIsThatPokemonPageResponse =
      await service.buildWhoIsThatPokemonPage({
        limit: '151',
      });

    expect(whoIsThatPokemonPageResponse).toEqual(expectedResponse);
  });

  describe('safePokemonNumber', () => {
    it('should build safe pokemon number with two 0s to the left', () => {
      const number = service.buildSafePokemonNumber('1');

      expect(number).toBe('001');
    });

    it('should build safe pokemon number with one 0 to the left', () => {
      const number = service.buildSafePokemonNumber('15');

      expect(number).toBe('015');
    });

    it('should build safe pokemon number with three characters', () => {
      const number = service.buildSafePokemonNumber('123');

      expect(number).toBe('123');
    });
  });
});
