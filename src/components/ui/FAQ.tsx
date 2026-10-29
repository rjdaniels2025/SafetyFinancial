import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

/** Accordion of questions whose answers open and close smoothly. */
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left font-sans text-[16px] font-semibold text-ink transition-colors hover:text-accent-dark"
              >
                {item.q}
                <span
                  className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-brand ${
                    isOpen ? 'rotate-45 border-accent bg-accent text-ink' : 'border-line text-accent-dark group-hover:border-accent'
                  }`}
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </button>
            </h3>
            {/* Animating grid rows from 0fr to 1fr gives a smooth height transition */}
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden" aria-hidden={!isOpen}>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
