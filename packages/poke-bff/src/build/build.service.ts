import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../repository/pokemon.repository';

@Injectable()
export class BuildService {
  constructor(private pokemonRepository: PokemonRepository) {}
  async buildWhoIsThatPokemonPage({
    limit,
  }: WhoIsThatPokemonPayload): Promise<WhoIsThatPokemonPageResponse> {
    try {
      const pokemonList = await this.pokemonRepository.getPokemonListByLimit(
        limit
      );

      const { correctAnswer, pokemonImageUrl, pokemonOptions } =
        await this.generatePokemonData(pokemonList);

      return {
        correctAnswer,
        pokemonOptions,
        pokemonImageUrl,
      };
    } catch (error) {
      console.error(error);
    }
  }

  async generatePokemonData(
    pokemonList: {
      name: string;
      url: string;
    }[]
  ) {
    const pokemonOptions = this.buildPokemonOptions(pokemonList);
    const ramdomNumber = this.randomizeNumber(pokemonOptions.length);
    const correctAnswer = pokemonOptions[ramdomNumber];
    const pokemonNumber = await this.pokemonRepository.getPokemonNumberByName(
      correctAnswer
    );
    const safePokemonNumber = this.buildSafePokemonNumber(pokemonNumber);
    const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${safePokemonNumber}.png`;

    return { correctAnswer, pokemonOptions, pokemonImageUrl };
  }

  buildMainPage(payload: MainPagePayload): MainPageResponse {
    return {
      pageTitle: 'PokéApp',
      menuOptions: [
        { menuOptionName: 'Party', linkPath: 'poke-party' },
        {
          menuOptionName: 'Pokédex',
          linkPath: 'pokedex',
        },
        {
          menuOptionName: 'Who Is That Pokémon?',
          linkPath: 'who-is-that-pokemon',
        },
      ],
    };
  }

  buildPokemonOptions(
    response: {
      name: string;
      url: string;
    }[]
  ): Array<string> {
    const pokemonList = new Set<string>();

    while (pokemonList.size < 5) {
      const randomNumber = this.randomizeNumber(response.length);
      pokemonList.add(response[randomNumber].name);
    }

    return Array.from(pokemonList);
  }

  randomizeNumber(ArrayLength: number) {
    return Math.floor(Math.random() * ArrayLength);
  }

  buildSafePokemonNumber(number: string) {
    return number.padStart(3, '0');
  }
}
