import * as React from "react";

/**
 * This hook is used to observe the size of an element.
 * @param ref The reference to the element to observe.
 * @returns The width and height of the observed element.
 */
export const useResizeObserver = (ref: React.RefObject<HTMLElement | null>): { width: number; height: number } => {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const observeTarget = ref.current;

    if (!observeTarget) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
    });

    resizeObserver.observe(observeTarget);

    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);

  return dimensions;
};
