import { useId } from "react";
import { ChevronDown } from "lucide-react";

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
  const selectId = useId();

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={selectId} className="sr-only">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full h-11 appearance-none bg-brand-peach dark:bg-zinc-800/80 border border-brand-terracotta/20 hover:border-brand-terracotta/40 px-4 pe-10 rounded-xl text-sm text-brand-terracotta font-semibold outline-none cursor-pointer transition-all duration-200 shadow-sm focus:border-brand-terracotta focus:ring-1 focus:ring-brand-terracotta/20"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-terracotta"
      />
    </div>
  );
}
