import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import cn from 'classnames';

interface FaqDropdownProps {
  question: string;
  children: ReactNode;
}

export default function FaqDropdown({ question, children }: FaqDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={cn(
      "my-4 md:my-8 mb-4 rounded-lg border shadow-sm w-full",
      isDark ? "border-white/20 bg-[#1A1A1A]" : "border-black/40 bg-[#FAFAF9]"
    )}>
      <motion.button
        className={cn(
          "w-full px-4 md:px-6 py-3 md:py-4 cursor-pointer font-medium text-sm md:text-base text-left flex justify-between items-center",
          isDark ? "text-white" : "text-[#0D0D0D]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
      >
        {question}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={isDark ? "text-[#9FB6EB]" : "text-[#4363CC]"}
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
            <div className={cn(
              "px-4 md:px-6 py-3 md:py-4 border-t-2 text-sm md:text-base prose max-w-none",
              isDark ? "border-white/20 text-gray-300 prose-invert" : "border-black/40 text-[#585652]",
              "prose-content [&_a]:hover:text-[#9FB6EB]",
              isDark ? "[&_a]:text-[#9FB6EB]" : "[&_a]:text-[#4363CC]"
            )}>
              <div>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}