type MAIN_PAGE = 'MAIN_PAGE';

type MainPagePayload = {};

type MenuOptionName = 'Party' | 'Pokedex' | 'Who Is That Pokémon?';

type LinkPath = 'poke-party' | 'pokedex' | 'who-is-that-pokemon';

type MenuOption = { menuOptionName: MenuOptionName; linkPath: LinkPath };

type MainPageResponse = {
  pageTitle: 'PokeApp';
  menuOptions: MenuOption[];
};
