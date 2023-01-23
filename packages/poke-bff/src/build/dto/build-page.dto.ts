type PageName = 'MAIN_PAGE' | 'WHO_IS_THAT_POKEMON' | 'POKEDEX';

type PokedexPayload = {};

export type WhoIsThatPokemonPayload = { limit: string };

type BuildPagePayload = PokedexPayload | WhoIsThatPokemonPayload;

export type BuildPageDto = {
  pageName: PageName;
  payload: BuildPagePayload;
};
