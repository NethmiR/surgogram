import { ReactNode } from "react";

interface TransitionWrapperProps {
  isTransitioning: boolean;
  children: ReactNode;
}

const TransitionWrapper = ({
  isTransitioning,
  children,
}: TransitionWrapperProps) => {
  return (
    <div
      className={`page-wrapper ${
        isTransitioning
          ? "opacity-0 translate-y-12"
          : "opacity-100 translate-y-0"
      } transition-all duration-500 ease-in-out`}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
