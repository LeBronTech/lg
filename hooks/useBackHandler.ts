import { useEffect, useRef } from 'react';

export const useBackHandler = (isOpen: boolean, onRequestClose: () => void) => {
  const closedByBack = useRef(false);

  useEffect(() => {
    if (isOpen) {
      closedByBack.current = false;
      window.history.pushState({ modalOpen: true }, '');

      const handlePopState = () => {
        closedByBack.current = true;
        onRequestClose();
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (!closedByBack.current) {
          window.history.back();
        }
      };
    }
  }, [isOpen]); // Removed onRequestClose from dependency array to avoid re-running on close function change
};
