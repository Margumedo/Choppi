"use client"

interface FilterChipsProps {
  options: { id: string; label: string }[]
  selected: string | null
  onSelect: (id: string | null) => void
}

export function FilterChips({ options, selected, onSelect }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
          selected === null ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
        }`}
      >
        Todos
      </button>

      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
            selected === option.id ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-border"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
