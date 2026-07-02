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
  const listboxId = `dropdown-listbox-${reactId}`;
  const buttonId = `dropdown-button-${reactId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = options.findIndex((option) => option.value === value);

    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((currentOpen) => !currentOpen);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % options.length : 0;
      onChange(options[nextIndex].value);
      setIsOpen(true);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      const previousIndex =
        currentIndex >= 0
          ? (currentIndex - 1 + options.length) % options.length
          : options.length - 1;
      onChange(options[previousIndex].value);
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onKeyDown={handleKeyDown}
    >
      <label htmlFor={buttonId} className="sr-only">
        {label}
      </label>

      <button
        id={buttonId}
        type="button"
        aria-label={label}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="w-full inline-flex min-h-11 items-center justify-between rounded-xl border border-brand-terracotta/20 bg-brand-peach px-4 py-3 text-start text-sm font-semibold text-brand-terracotta shadow-sm transition-all duration-200 outline-none hover:border-brand-terracotta/40 active:scale-[0.98] focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20 dark:bg-zinc-800/80 dark:text-brand-peach"
        onClick={() => setIsOpen((currentOpen) => !currentOpen)}
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
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <li
                  key={option.value}
                  id={`${listboxId}-${option.value}`}
                  role="option"
                  aria-selected={isSelected}
                  className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-all duration-150 ${
                    isSelected
                      ? "bg-brand-terracotta text-brand-cream shadow-sm dark:text-brand-ink"
                      : "text-brand-terracotta-dark hover:bg-brand-peach/80 dark:text-brand-peach dark:hover:bg-white/5"
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check size={14} className="ms-2 flex-shrink-0" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
