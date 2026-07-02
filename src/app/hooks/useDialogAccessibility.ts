import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

interface DialogAccessibilityOptions {
  containerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  open: boolean;
}

export function useDialogAccessibility({
  containerRef,
  onClose,
  open,
}: DialogAccessibilityOptions) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const dialog = containerRef.current;
    if (!dialog) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((element) => !element.hasAttribute("disabled"));

    document.body.style.overflow = "hidden";
    (focusableElements[0] ?? dialog).focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const activeFocusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((element) => !element.hasAttribute("disabled"));

      if (activeFocusableElements.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const firstElement = activeFocusableElements[0];
      const lastElement = activeFocusableElements[activeFocusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      previouslyFocused?.focus();
    };
  }, [containerRef, onClose, open]);
}

