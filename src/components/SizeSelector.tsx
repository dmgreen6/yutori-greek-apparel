import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelect: (size: string) => void;
  accentColor: string;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  accentColor,
}: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <p
        className="text-xs uppercase tracking-[0.2em] text-white/40"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        Select Size
      </p>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <motion.button
              key={size}
              onClick={() => onSelect(size)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300',
                isSelected
                  ? 'text-black border-transparent'
                  : 'text-white/70 border-white/15 hover:border-white/30 hover:text-white'
              )}
              style={
                isSelected
                  ? { backgroundColor: accentColor }
                  : undefined
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedSize"
                  className="absolute inset-0 rounded-lg"
                  style={{ backgroundColor: accentColor }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span
                className="relative z-10"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {size}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
