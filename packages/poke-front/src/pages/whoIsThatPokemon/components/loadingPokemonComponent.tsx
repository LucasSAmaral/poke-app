import styled, { keyframes } from 'styled-components';

const LoadingPokemonComponent = () => {
  return (
    <LoadingPokemonComponentWrapper>
      <PokeBall />
      <span>Loading...</span>
    </LoadingPokemonComponentWrapper>
  );
};

const LoadingPokemonComponentWrapper = styled.div`
  min-width: 300px;
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Moving = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(-20deg);
  }
  75% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const PokeBall = styled.div`
  min-height: 70px;
  width: 70px;
  border: 2px solid black;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  background: linear-gradient(
    to bottom,
    red 0%,
    red 50%,
    black 0%,
    black 55%,
    white 0%
  );
  animation: ${Moving} 1s ease infinite;

  &:before {
    content: '';
    position: absolute;
    min-width: 10px;
    min-height: 10px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid black;
    top: 41%;
    left: 39%;
    background: radial-gradient(
      #fff 0%,
      #fff 45%,
      #333 0%,
      #333 54%,
      #ffffff 0%
    );
  }

  &:focus {
    outline: none;
  }
`;

export default LoadingPokemonComponent;
