import axios, { AxiosRequestConfig } from 'axios';

type PokemonResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export class PokemonRepository {
  instance = axios.create();

  baseUrl = 'https://pokeapi.co/api/v2';

  url = '/pokemon';

  async getPokemonListByLimit(limit: string) {
    const request = this.getPokemonByLimitRequest(limit);

    const {
      data: { results },
    } = await this.instance.request<PokemonResponse>(request);

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
    } = await this.instance.request<{ id: number }>(request);
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
