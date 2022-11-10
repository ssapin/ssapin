import "./app.css";

import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Card from "./Card";

const Container = styled.div`
  height: fit-content;
  position: relative;
  z-index: 999;
`;
const Div = styled.div`
  position: relative;
`;
function Cards() {
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const ref = useRef<HTMLDivElement>();

  let myReq;
  function getIntersectionRatio(target, height) {
    const a = [
      window.scrollY - height,
      window.scrollY - height + window.innerHeight,
    ];
    const b = [target.offsetTop, target.offsetTop + target.clientHeight];
    const max = Math.max(a[0], b[0]);
    const min = Math.min(a[1], b[1]);

    return Math.max(0, (min - max) / (b[1] - b[0]));
  }

  function onScroll() {
    const boxes = cardRefs.current;
    for (let i = 0; i < boxes.length; i += 1) {
      const intersection = getIntersectionRatio(
        boxes[i],
        ref.current.offsetHeight + 1500,
      );
      // console.log("ref.current.offsetTop", ref.current.offsetHeight);
      // console.log(boxes[i].offsetTop, window.pageYOffset);
      console.log(intersection, boxes[i].offsetTop, window.scrollY);
      const top = boxes[i].offsetTop - window.pageYOffset < 0;
      const css = `
                transform-origin: ${top ? "left" : "top left"};
                position: ${top ? "sticky" : "absolute"};
                transform: scale(${intersection});
                opacity: ${intersection};
            `;
      boxes[i].firstChild.style.cssText = css;
    }
    myReq = requestAnimationFrame(onScroll);
  }
  const callback = (entries) => {
    entries.forEach((entry) => {
      // console.log(entry.isIntersecting);
      if (entry.isIntersecting) {
        myReq = requestAnimationFrame(onScroll);
      } else {
        cancelAnimationFrame(myReq);
      }
    });
  };

  useEffect(() => {
    const fuck = ref.current;
    console.log(ref.current.offsetTop);

    const observer = new IntersectionObserver(callback);
    observer.observe(fuck);

    return () => observer.disconnect();
  }, []);

  return (
    <Container>
      <Div ref={ref}>
        {Array(10)
          .fill(0)
          .map((i, idx) => (
            <Card
              key={idx}
              ref={(element) => {
                cardRefs.current[idx] = element;
              }}
            />
          ))}
      </Div>
    </Container>
  );
}

export default Cards;
