import { useState, useCallback } from "react";
// import ReactDOM from "react-dom";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const render = useCallback(
    (children: React.ReactNode) => {
      if (!isOpen) return null;

      return ReactDOM.createPortal(
        <div className="modal-backdrop" onClick={close}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.body
      );
    },
    [isOpen, close]
  );

  return { isOpen, open, close, render };
}
