"use client";

import { useEffect, useState } from "react";

/** Matches Tailwind `sm` breakpoint (below 640px). */
const PHONE_MQ = "(max-width: 639px)";

export function useIsPhone() {
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PHONE_MQ);
    const apply = () => setIsPhone(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return isPhone;
}
