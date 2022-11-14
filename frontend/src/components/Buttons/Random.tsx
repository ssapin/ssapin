/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { EMOJI_LIST } from "../../utils/constants/contant";

import "./random.css";

const Container = styled.div`
  margin-top: 0;
  height: 50px;
  overflow: hidden;
  background-color: red;
  width: 50px;
`;

const Machine = styled.div`
  height: 50px;
  font-size: 50px;
`;

// const EMOJI_LIST = ["✏️", "📍", "💋", "👍", "😽", "😈", "🤡", "😺", "😽"];

function Random() {
  const [spin, setSpin] = useState(false);
  const [ring1, setRing1] = useState<number>();

  const pickRandomEmoji = () => {
    const array: string[] = [];
    for (let i = 0; i < 10; i++) {
      const tmp = Math.floor(Math.random() * 50 + 1);
      array.push(EMOJI_LIST[tmp]);
    }
    return array;
  };

  const shuffle = (array: string[]) => {
    const tmp = [...array];
    for (let i = tmp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    return tmp;
  };

  function row1() {
    const array = pickRandomEmoji();
    if (!spin) {
      return (
        <>
          {array.map((emoji, idx) => (
            <div className="ringEnd" key={idx}>
              {emoji}
            </div>
          ))}
        </>
      );
    } else if (spin && ring1 === undefined) {
      return (
        <>
          {array.map((emoji, idx) => (
            <div className="ringMoving" key={idx}>
              {emoji}
            </div>
          ))}
        </>
      );
    } else if (ring1) {
      return (
        <>
          {shuffle(array).map((emoji, idx) => (
            <div className="ringEnd" key={idx}>
              {emoji}
            </div>
          ))}
        </>
      );
    }
  }

  function rand() {
    const random = Math.floor(Math.random() * (100 - 1) + 1);
    setRing1(random);
    console.log(random);
  }

  function play() {
    if (ring1 > 1 || !spin) {
      setSpin(true);
      setRing1();
      setTimeout(() => {
        rand();
      }, 2000);
    }
  }

  return (
    <>
      <div className="slot">
        <div className="row">{row1()}</div>
      </div>
      <button type="button" onClick={play}>
        버튼
      </button>
    </>
  );
}

export default Random;
