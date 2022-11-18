import React from "react";
import SkeletonCard from "../card/SkeletonCard";

interface SkeletonListComponentProps {
  number: number;
}

function SkeletonListComponent({ number }: SkeletonListComponentProps) {
  return (
    <>
      {Array(number)
        .fill(0)
        .map((_, i) => i)
        .map((i) => (
          <SkeletonCard key={i} />
        ))}
    </>
  );
}

export default SkeletonListComponent;
