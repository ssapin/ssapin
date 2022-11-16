/* eslint-disable react/no-array-index-key */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import styled from "@emotion/styled";
import { memo, useEffect, useMemo, useState } from "react";
import { goaround, stop } from "../../styles/animations";
import { EMOJI_LIST } from "../../utils/constants/contant";
import { ReactComponent as DiceButton } from "../../assets/svgs/diceButton.svg";

const Slot = styled.div`
  display: flex;
  flex-direction: row;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.lightLightBlue};
`;

const Row = styled.div`
  flex: 1 0 auto;
  overflow: hidden;
  border-radius: 50%;
`;

const RingMoving = styled.div`
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-size: 400%;
  animation: ${goaround} 0.2s linear infinite;
`;

const RingEnd = styled.div`
  height: 150px;
  line-height: 160px;
  text-align: center;
  font-size: 400%;
  animation: ${stop} 0.5s ease-out forwards;
`;

const EmojiContainer = styled.div`
  height: 100%;
  width: 100%;
  font-size: 400%;
  line-height: 150px;
  text-align: center;
`;

const Button = styled.button`
  font-size: ${(props) => props.theme.fontSizes.h1};
  position: absolute;
  bottom: 0;
  height: 45px;
  right: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    svg {
      fill: ${(props) => props.theme.colors.DeepBlue};
    }
  }
`;

interface EmojiProps {
  originalEmoji: string;
  onClick: (emoji: string) => void;
  setState: () => void;
}

function EmojiSlotMachine({ originalEmoji, onClick, setState }: EmojiProps) {
  const [isFirst, setIsFirst] = useState(true);
  const [spin, setSpin] = useState(false);
  const [ring1, setRing1] = useState<number>();
  const [shuffleArray, setShuffleArray] = useState([]);

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

  const row = useMemo(() => {
    const array = pickRandomEmoji();
    const shuffledArray = shuffle(array);

    if (!spin) {
      return (
        <>
          {array.map((emoji, idx) => (
            <RingEnd key={idx}>{emoji}</RingEnd>
          ))}
        </>
      );
    } else if (spin && ring1 === undefined) {
      return (
        <>
          {shuffledArray.map((emoji, idx) => (
            <RingMoving key={idx}>{emoji}</RingMoving>
          ))}
        </>
      );
    } else if (ring1) {
      setShuffleArray(shuffledArray);
      return (
        <>
          {shuffledArray.map((emoji, idx) => (
            <RingEnd key={idx}>{emoji}</RingEnd>
          ))}
        </>
      );
    }
  }, [ring1, spin]);

  const rand = () => {
    const random = Math.floor(Math.random() * (100 - 1) + 1);
    setRing1(random);
  };

  const play = () => {
    setState();
    if (isFirst) {
      setIsFirst(false);
    }
    if (ring1 > 1 || !spin) {
      setSpin(true);
      setRing1(undefined);
      setTimeout(() => {
        rand();
      }, 800);
    }
  };

  useEffect(() => {
    if (shuffleArray.length) {
      onClick(shuffleArray[1]);
    }
  }, [shuffleArray]);

  return (
    <>
      <Slot>
        {isFirst ? (
          <EmojiContainer>{originalEmoji}</EmojiContainer>
        ) : (
          <Row>{row}</Row>
        )}
      </Slot>
      <Button type="button" onClick={play}>
        <DiceButton />
      </Button>
    </>
  );
}

export default EmojiSlotMachine;

export const MemoisedEmojiSlotMachine = memo(EmojiSlotMachine);
