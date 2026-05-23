import { priceRanges, propertyTypes } from "@/data/landing-content";

import { ChevronDownIcon, SearchIcon } from "./icons";

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <label className="space-y-2 rounded-2xl bg-surface-container-lowest px-5 py-4 md:bg-transparent md:px-4 md:py-3">
      <span className="block font-label text-[0.65rem] font-bold uppercase tracking-[0.24em] text-outline">
        {label}
      </span>
      <div className="relative">
        <select
          defaultValue={options[0]}
          className="w-full appearance-none bg-transparent pr-8 text-sm font-semibold text-on-surface outline-none"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-outline" />
      </div>
    </label>
  );
}

export function PropertySearch() {
  return (
    <form className="editorial-shadow mt-10 flex w-full max-w-4xl flex-col gap-3 rounded-[28px] border border-white/10 bg-surface-container-lowest/88 p-3 backdrop-blur-2xl md:flex-row md:items-center">
      <label className="flex-1 space-y-2 rounded-2xl bg-surface-container-lowest px-5 py-4 md:bg-transparent md:px-4 md:py-3 md:border-r md:border-outline-variant/20">
        <span className="block font-label text-[0.65rem] font-bold uppercase tracking-[0.24em] text-outline">
          Location
        </span>
        <input
          type="text"
          placeholder="Where to?"
          className="w-full bg-transparent text-sm font-semibold text-on-surface outline-none placeholder:text-outline-variant"
        />
      </label>

      <div className="flex-1 md:border-r md:border-outline-variant/20">
        <SelectField label="Price Range" options={priceRanges} />
      </div>

      <div className="flex-1">
        <SelectField label="Property Type" options={propertyTypes} />
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-[20px] bg-on-surface px-6 py-4 font-headline text-sm font-bold tracking-[0.18em] uppercase text-surface-container-lowest transition-colors hover:bg-primary"
      >
        <SearchIcon className="size-4" />
        Explore
      </button>
    </form>
  );
}
