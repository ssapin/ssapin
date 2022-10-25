/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

// 동그라미 크기 css
const WhiteCircle = styled.button`
  width: 60px;
  height: 60px;
  margin: 9px 493px 29px 13px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #fff;
`;

const BtnColor = styled.button`
  color: #000000;
`;

export default function MapCircleButton() {
  return <WhiteCircle />;
}
