import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusMark, MinusMark } from "./Monogram";

interface AccordionItemData {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-bone/10">
      {items.map((item, index) => (
        <AccordionRow
          key={item.question}
          item={item}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        />
      ))}
    </div>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();

  return (
    <div className="py-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-ember"
      >
        <span className="font-serif text-lg text-bone sm:text-xl">{item.question}</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-bone/25 text-bone">
          {isOpen ? <MinusMark className="h-3.5 w-3.5" /> : <PlusMark className="h-3.5 w-3.5" />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-14 font-sans text-[15px] leading-relaxed text-smoke">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
