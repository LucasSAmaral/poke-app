import { Injectable } from '@nestjs/common';
import { PokemonRepository } from '../repository/pokemon.repository';
import { WhoIsThatPokemonPayload } from './dto/build-page.dto';

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

      const ramdomNumber = this.ramdomizeNumber(pokemonOptions.length);

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

  buildPokemonOptions(
    response: {
      name: string;
      url: string;
    }[]
  ): Array<string> {
    const pokemonList = [];

    for (let index = 0; index < 5; index++) {
      const ramdomNumber = this.ramdomizeNumber(response.length);
      if (pokemonList.includes(response[ramdomNumber].name)) {
        const ramdomNumberAgain = this.ramdomizeNumber(response.length);
        pokemonList.push(response[ramdomNumberAgain].name);
      } else {
        pokemonList.push(response[ramdomNumber].name);
      }
    }
    return pokemonList;
  }

  ramdomizeNumber(ArrayLength: number) {
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
