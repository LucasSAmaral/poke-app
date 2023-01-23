type PageName = MAIN_PAGE | WHO_IS_THAT_POKEMON | POKEDEX;

type BuildPagePayload =
  | PokedexPayload
  | WhoIsThatPokemonPayload
  | MainPagePayload;

type BuildPageDto = {
  pageName: PageName;
  payload: BuildPagePayload;
};
