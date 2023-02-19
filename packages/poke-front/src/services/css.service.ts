import { css, keyframes } from 'styled-components';

const SkeletonLoading = keyframes`
  0% {background-position-y: -70px;}
  100% {background-position-y: 30px;}
`;

export const checkCssAnswer = (
  isAnswerCorrect?: boolean,
  isAnswerWrong?: boolean
) => {
  if (isAnswerCorrect) {
    return css`
      background-color: green;
      background-image: none;

      &:hover {
        background-color: green;
      }
    `;
  }

  if (isAnswerWrong) {
    return css`
      background-color: red;
      background-image: none;

      &:hover {
        background-color: red;
      }
    `;
  }

  return css`
    background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);

    &:hover {
      background-image: linear-gradient(to bottom, #002c5f, #010124, #002c5f);
    }
  `;
};

export const loadingSkeleton = (loading: boolean) => {
  if (loading) {
    return css`
      animation: ${SkeletonLoading} 1s linear infinite;
      background-image: linear-gradient(to bottom, #010124, #002c5f, #010124);
      color: rgba(0, 0, 0, 0);
    `;
  }

  return css``;
};
