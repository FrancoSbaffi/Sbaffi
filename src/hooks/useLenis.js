import { useEffect, useRef } from 'react';

export const useLenis = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Obtener la instancia de Lenis del objeto window
    if (window.lenis) {
      lenisRef.current = window.lenis;
    }
  }, []);

  const scrollTo = (target, options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  };

  const scrollToTop = (options = {}) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, options);
    }
  };

  const scrollToBottom = (options = {}) => {
    if (lenisRef.current) {
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const targetPosition = scrollHeight - viewportHeight;
      lenisRef.current.scrollTo(targetPosition, options);
    }
  };

  const stop = () => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const start = () => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  const destroy = () => {
    if (lenisRef.current) {
      lenisRef.current.destroy();
    }
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToBottom,
    stop,
    start,
    destroy
  };
}; 