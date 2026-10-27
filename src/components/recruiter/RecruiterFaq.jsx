import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { faqItems } from "@/data/recruiterData";

export const RecruiterFaq = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3 text-left">
      {faqItems.map((item, idx) => {
        const isExpanded = expandedIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-xl border border-border/70 bg-card/45 hover:bg-card/75 transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => toggleFaq(idx)}
              className="w-full px-5 py-3.5 flex items-center justify-between text-left font-medium text-foreground gap-4 focus:outline-none cursor-pointer"
              aria-expanded={isExpanded}
            >
              <span className="flex items-center gap-3 text-sm sm:text-base font-semibold">
                <HelpCircle className="h-4.5 w-4.5 text-primary shrink-0" />
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-300 ${
                  isExpanded ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-h-0 px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecruiterFaq;
