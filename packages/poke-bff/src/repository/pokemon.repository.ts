import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { RequestService } from '../services/request.service';

type PokemonResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

@Injectable()
export class PokemonRepository {
  constructor(private requestService: RequestService) {}

  baseUrl = 'https://pokeapi.co/api/v2';

  url = '/pokemon';

  async getPokemonListByLimit(limit: string) {
    const request = this.getPokemonByLimitRequest(limit);

    const {
      data: { results },
    } = await this.requestService.send<PokemonResponse>(request);

    return results;
  }

  getPokemonByLimitRequest(limit: string): AxiosRequestConfig {
    return {
      baseURL: this.baseUrl,
      url: this.url,
      method: 'GET',
      params: {
        limit,
        offset: '0',
      },
    };
  }

  async getPokemonNumberByName(name: string) {
    const request = this.getPokemonNumberByNameRequest(name);

    const {
      data: { id: pokemonNumber },
    } = await this.requestService.send<{ id: number }>(request);
    return pokemonNumber.toString();
  }

  getPokemonNumberByNameRequest(name: string): AxiosRequestConfig {
    return {
      baseURL: this.baseUrl,
      url: `${this.url}/${name}`,
      method: 'GET',
    };
  }
}
