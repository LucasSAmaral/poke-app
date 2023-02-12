import { css } from 'styled-components';

export const checkCssAnswer = (
  isAnswerCorrect?: boolean,
  isAnswerWrong?: boolean
) => {
  if (isAnswerCorrect) {
    return css`
      transition: 1s;
      background-color: green;
      background-image: none;
    `;
  }

  if (isAnswerWrong) {
    return css`
      transition: 1s;
      background-color: red;
      background-image: none;
    `;
  }

  return css``;
};
