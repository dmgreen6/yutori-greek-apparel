import { motion, AnimatePresence } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import ProductCard from './ProductCard';
import { Package, Sparkles } from 'lucide-react';

interface OrgProductSectionProps {
  org: Organization;
  onRequestItem: (product: ProductConfig, size: string) => void;
}

export default function OrgProductSection({
  org,
  onRequestItem,
}: OrgProductSectionProps) {
  return (
    <section className="relative py-24 px-6" style={{ backgroundColor: '#0a0a0a' }}>
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${org.secondaryColor}20 1px, transparent 1px),
            linear-gradient(90deg, ${org.secondaryColor}20 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px w-16"
              style={{ backgroundColor: `${org.secondaryColor}30` }}
            />
            <Sparkles
              className="w-5 h-5"
              style={{ color: org.secondaryColor }}
            />
            <div
              className="h-px w-16"
              style={{ backgroundColor: `${org.secondaryColor}30` }}
            />
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span style={{ color: org.secondaryColor }}>{org.shortName}</span>
            {' '}Collection
          </h2>

          <p
            className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Handcrafted with pride. Each piece represents your legacy,
            your commitment to excellence, and your lifelong bond.
          </p>
        </motion.div>

        {/* Product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={org.orgId}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {org.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                org={org}
                onRequestItem={onRequestItem}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {org.products.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
              style={{
                backgroundColor: `${org.secondaryColor}10`,
                border: `1px solid ${org.secondaryColor}20`,
              }}
            >
              <Package
                className="w-8 h-8"
                style={{ color: org.secondaryColor }}
              />
            </div>
            <p
              className="text-xl text-white/40 mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Collection Coming Soon
            </p>
            <p
              className="text-sm text-white/30"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Premium {org.name} apparel is being crafted.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        {org.products.length > 0 && (
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p
              className="text-white/30 text-sm mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Need a custom order or bulk pricing?
            </p>
            <a
              href="mailto:orders@yutorigreek.com"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{
                color: org.secondaryColor,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Contact our Greek liaison team →
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
