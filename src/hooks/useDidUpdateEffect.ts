import { useEffect } from "react";
import { useRef } from "react";

function useDidUpdateEffect(fn: () => void, inputs: any[]) {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (isMountingRef.current) {
      return fn();
    }
  }, inputs);
}

export default useDidUpdateEffect;
