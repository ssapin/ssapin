import { keyframes } from "@emotion/react";

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);

  }
`;
export const goaround = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1000px);
  }
`;

export const stop = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-165px);
  }
  75% {
    transform: translateY(-155px);
  }
  100% {
    transform: translateY(-160px);
  }
`;
