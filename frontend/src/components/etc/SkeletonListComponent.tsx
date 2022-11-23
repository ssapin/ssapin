import { lazy } from "react";

const SkeletonCard = lazy(() => import("../card/SkeletonCard"));

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
