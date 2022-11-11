/* eslint-disable react/jsx-no-useless-fragment */
import { useMediaQuery } from "react-responsive";
import { Children } from "../../utils/types/common";

export function Mobile({ children }: Children): JSX.Element {
  const isMobile = useMediaQuery({
    query: "(max-width: 500px)",
  });

  return isMobile && <>{children}</>;
}

export function PC({ children }: Children): JSX.Element {
  const isPC = useMediaQuery({
    query: "(min-width:901px)",
  });
  return isPC && <>{children}</>;
}

export function Tablet({ children }: Children): JSX.Element {
  const isTablet = useMediaQuery({
    query: "{min-width:501px) and (max-width:900px)",
  });
  return isTablet && <>{children}</>;
}
