import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAppSettings } from "../../context/AppSettingsContext";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  className?: string;
  label?: string;
}

export function CustomDropdown({
  value,
  onChange,
  options,
  className = "",
  label = "Choose an option",
}: CustomDropdownProps) {
  const { isRTL } = useAppSettings();
  const reactId = useId();
  const buttonId = `dropdown-button-${reactId}`;
  const listboxId = `dropdown-listbox-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selectedOption = options[selectedIndex] || options[0];

  useEffect(() => {
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options.length]);

  useEffect(() => {
    setActiveIndex(selectedIndex);
  }, [selectedIndex]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, isOpen]);

  const closeMenu = (restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  const openMenu = (startIndex = selectedIndex) => {
    setActiveIndex(startIndex);
    setIsOpen(true);
  };

  const moveActiveIndex = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + options.length) % options.length;
    setActiveIndex(normalizedIndex);
  };

  const commitSelection = (nextIndex: number) => {
    const option = options[nextIndex];
    if (!option) {
      return;
    }

    onChange(option.value);
    closeMenu(true);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu(selectedIndex);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu(selectedIndex >= 0 ? selectedIndex : options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isOpen) {
        closeMenu();
      } else {
        openMenu(selectedIndex);
      }
    }
  };

  const handleOptionKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    optionIndex: number
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActiveIndex(optionIndex + 1);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActiveIndex(optionIndex - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      moveActiveIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      moveActiveIndex(options.length - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      commitSelection(optionIndex);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
    }
  };

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      <label htmlFor={buttonId} className="sr-only">
        {label}
      </label>

      <button
        id={buttonId}
        ref={triggerRef}
        type="button"
        aria-label={label}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full inline-flex min-h-11 items-center justify-between rounded-xl border border-brand-terracotta/20 bg-brand-peach px-4 py-3 text-start text-sm font-semibold text-brand-terracotta shadow-sm transition-all duration-200 outline-none hover:border-brand-terracotta/40 active:scale-[0.98] focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 dark:bg-zinc-800/80 dark:text-brand-peach"
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu(selectedIndex);
          }
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="truncate pe-3">{selectedOption?.label}</span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-brand-terracotta transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id={listboxId}
            role="listbox"
            aria-labelledby={buttonId}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-40 mt-2 flex max-h-64 w-full flex-col gap-1 overflow-y-auto rounded-2xl border border-brand-terracotta/15 bg-brand-cream p-1.5 shadow-[0_18px_40px_rgba(27,28,26,0.16)] dark:border-white/10 dark:bg-zinc-900 ${
              isRTL ? "right-0" : "left-0"
            }`}
          >
            {options.map((option, optionIndex) => {
              const isSelected = option.value === value;

              return (
                <li key={option.value} role="presentation">
                  <button
                    id={`${listboxId}-${option.value}`}
                    ref={(node) => {
                      optionRefs.current[optionIndex] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-all duration-150 outline-none ${
                      isSelected
                        ? "bg-brand-terracotta text-brand-cream shadow-sm dark:text-brand-ink"
                        : "text-brand-terracotta-dark hover:bg-brand-peach/80 dark:text-brand-peach dark:hover:bg-white/5"
                    } ${
                      activeIndex === optionIndex
                        ? "ring-1 ring-brand-terracotta/30"
                        : ""
                    }`}
                    onClick={() => commitSelection(optionIndex)}
                    onFocus={() => setActiveIndex(optionIndex)}
                    onKeyDown={(event) => handleOptionKeyDown(event, optionIndex)}
                  >
                    <span className="truncate">{option.label}</span>
                    {isSelected && <Check size={14} className="ms-2 flex-shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
