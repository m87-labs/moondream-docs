import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqDropdownProps {
  question: string;
  children: ReactNode;
}

export default function FaqDropdown({ question, children }: FaqDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 md:my-8 mb-4 rounded-lg border border-black bg-[#FAFAF9] shadow-sm w-full">
      <motion.button
        className="w-full px-4 md:px-6 py-3 md:py-4 cursor-pointer  font-medium text-sm md:text-base text-left flex justify-between items-center text-[#0D0D0D]"
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#4363CC]"
        >
          ▼
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 py-3 md:py-4 border-t-2 border-black text-[#585652] text-sm md:text-base prose dark:prose-invert max-w-none">
              <div className="prose-content [&_a]:text-[#4363CC] [&_a]:hover:text-[#9FB6EB]">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}