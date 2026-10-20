import { Plus } from 'lucide-react';

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <Plus className="mt-0.5 h-5 w-5 flex-shrink-0 text-brass-dark transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="mt-3 pr-10 text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
