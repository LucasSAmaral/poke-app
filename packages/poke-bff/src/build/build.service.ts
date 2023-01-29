import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../repository/pokemon.repository';

@Injectable()
export class BuildService {
  constructor(private pokemonRepository: PokemonRepository) {}
  async buildWhoIsThatPokemonPage(payload: WhoIsThatPokemonPayload) {
    const { limit } = payload;

    try {
      const pokemonList = await this.pokemonRepository.getPokemonListByLimit(
        limit
      );

      const pokemonOptions = this.buildPokemonOptions(pokemonList);

      const ramdomNumber = this.randomizeNumber(pokemonOptions.length);

      const correctAnswer = pokemonOptions[ramdomNumber];

      const pokemonNumber = await this.pokemonRepository.getPokemonNumberByName(
        correctAnswer
      );

      const safePokemonNumber = this.buildSafePokemonNumber(pokemonNumber);

      const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${safePokemonNumber}.png`;

      return {
        correctAnswer,
        pokemonOptions,
        pokemonImageUrl,
      };
    } catch (error) {
      console.error(error);
    }
  }

  buildMainPage(payload: MainPagePayload): MainPageResponse {
    return {
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
    if (number.length === 1) {
      return `00${number}`;
    }

    if (number.length === 2) {
      return `0${number}`;
    }

    return number;
  }
}
