import { createGlobalStyle } from 'styled-components';
import PokemonSolid from '../assets/fonts/Pokemon_Solid.ttf';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "Poke";
  src: url(${PokemonSolid}) format("truetype");
}

body {
  background-color: #010124;
  font-family: "Poke";
  text-shadow: 3px 3px 0 #3b5ca8, -1px -1px 0 #3b5ca8, 1px -1px 0 #3b5ca8,
    -1px 1px 0 #3b5ca8, 1px 1px 0 #3b5ca8;
  color: #ffcb05;
  width: 100%;
  height: 100vh;
}
`;

export default GlobalStyle;
