import { useRef } from "react";
import { useInView } from "framer-motion";

export const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return {
    ref,
    isInView,
  };
};
