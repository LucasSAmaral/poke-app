type WHO_IS_THAT_POKEMON = 'WHO_IS_THAT_POKEMON';

type WhoIsThatPokemonPayload = { limit: string };

type WhoIsThatPokemonPageResponse = {
  correctAnswer: string;
  pokemonOptions: string[];
  pokemonImageUrl: string;
};
