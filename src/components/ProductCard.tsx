import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { ShoppingBag, Shirt, Star } from 'lucide-react';
import SizeSelector from './SizeSelector';

interface ProductCardProps {
  product: ProductConfig;
  org: Organization;
  onRequestItem: (product: ProductConfig, size: string) => void;
  index: number;
}

export default function ProductCard({
  product,
  org,
  onRequestItem,
  index,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const categoryIcons = {
    jacket: '🧥',
    hoodie: '👕',
    tshirt: '👔',
    polo: '👚',
    accessory: '✨',
    cardigan: '🧶',
  };

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          backgroundColor: `${org.primaryColor}15`,
          borderColor: isHovered ? `${org.secondaryColor}40` : 'rgba(255,255,255,0.08)',
        }}
      >
        {/* Premium badge */}
        <div
          className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: `${org.primaryColor}90`,
            color: org.secondaryColor,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Star className="w-3 h-3" />
          Premium
        </div>

        {/* Product image area */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(135deg, ${org.primaryColor}60 0%, ${org.accentColor}80 50%, ${org.primaryColor}60 100%)
              `,
            }}
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          />

          {/* Greek letters watermark */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: isHovered ? 0.15 : 0.08 }}
          >
            <span
              className="text-[180px] font-black transition-all duration-500"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: org.secondaryColor,
                transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              {org.greekLetters.charAt(0)}
            </span>
          </div>

          {/* Category icon */}
          <motion.div
            className="absolute bottom-4 right-4 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-md"
            style={{
              backgroundColor: `${org.secondaryColor}15`,
              border: `1px solid ${org.secondaryColor}30`,
            }}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {categoryIcons[product.category]}
          </motion.div>

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                105deg,
                transparent 40%,
                ${org.secondaryColor}10 45%,
                ${org.secondaryColor}20 50%,
                ${org.secondaryColor}10 55%,
                transparent 60%
              )`,
              backgroundSize: '200% 100%',
            }}
            animate={{
              backgroundPosition: isHovered ? ['200% 0%', '-200% 0%'] : '200% 0%',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Product name */}
          <div>
            <h3
              className="text-xl font-bold text-white mb-2 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {product.name}
            </h3>
            <p
              className="text-sm text-white/50 leading-relaxed"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl font-bold"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: org.secondaryColor,
              }}
            >
              {formatPrice(product.price)}
            </span>
            <span
              className="text-xs uppercase tracking-wider text-white/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              USD
            </span>
          </div>

          {/* Size selector */}
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
            accentColor={org.secondaryColor}
          />

          {/* Request button */}
          <motion.button
            onClick={() => selectedSize && onRequestItem(product, selectedSize)}
            disabled={!selectedSize}
            className={cn(
              'w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 text-sm uppercase tracking-widest',
              selectedSize
                ? 'cursor-pointer'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            )}
            style={
              selectedSize
                ? {
                    backgroundColor: org.secondaryColor,
                    color: org.primaryColor,
                    fontFamily: "'DM Sans', sans-serif",
                  }
                : { fontFamily: "'DM Sans', sans-serif" }
            }
            whileHover={selectedSize ? { scale: 1.02, y: -2 } : undefined}
            whileTap={selectedSize ? { scale: 0.98 } : undefined}
          >
            <ShoppingBag className="w-4 h-4" />
            {selectedSize ? 'Request This Item' : 'Select a Size'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
