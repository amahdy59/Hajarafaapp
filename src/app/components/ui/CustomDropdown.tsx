import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
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
}

export function CustomDropdown({ value, onChange, options, className = "" }: CustomDropdownProps) {
  const { isRTL } = useAppSettings();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(opt => opt.value === value);
      const nextIndex = (currentIndex + 1) % options.length;
      onChange(options[nextIndex].value);
    } else if (e.key === "ArrowUp" && isOpen) {
      e.preventDefault();
      const currentIndex = options.findIndex(opt => opt.value === value);
      const prevIndex = (currentIndex - 1 + options.length) % options.length;
      onChange(options[prevIndex].value);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative select-none ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="dropdown-listbox"
    >
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-11 inline-flex items-center justify-between bg-brand-peach dark:bg-zinc-800/80 border border-brand-terracotta/20 hover:border-brand-terracotta/40 px-4 rounded-xl text-sm text-brand-terracotta font-semibold outline-none cursor-pointer active:scale-[0.98] transition-all duration-200 shadow-sm"
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown 
          size={15} 
          className={`text-brand-terracotta transition-transform duration-300 flex-shrink-0 ms-2 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`} 
        />
      </button>

      {/* Popover Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            id="dropdown-listbox"
            role="listbox"
            aria-activedescendant={`opt-${value}`}
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-30 w-full mt-1.5 bg-card border border-brand-terracotta/10 dark:border-white/10 rounded-2xl p-1.5 shadow-lg shadow-black/10 max-h-60 overflow-y-auto outline-none focus:outline-none flex flex-col gap-1 ${
              isRTL ? "right-0" : "left-0"
            }`}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <li
                  key={option.value}
                  id={`opt-${option.value}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 text-xs sm:text-sm rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? "bg-brand-terracotta text-white dark:text-zinc-950 font-semibold shadow-sm" 
                      : "text-brand-ink-soft dark:text-zinc-300 hover:bg-brand-peach dark:hover:bg-white/5"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <Check size={14} className="flex-shrink-0 ms-2" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
