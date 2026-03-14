# Divine Nine Apparel Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a stunning, premium landing page for Yutori Greek Products featuring Divine Nine organization apparel with organization-specific theming, product showcase, and inquiry-to-order flow.

**Architecture:** Component-based React architecture with dynamic theming per organization. State managed via React hooks. Organization data drives all visual theming (colors, products, branding). Radix UI primitives for accessible modals/dialogs. Framer Motion for premium animations.

**Tech Stack:** React 18, TypeScript, Tailwind CSS v4, Radix UI, Framer Motion, Lucide Icons

---

## Task 1: Create Organization Data Structure

**Files:**
- Create: `src/data/organizations.ts`
- Create: `src/types/index.ts`

**Step 1: Write types for organization and product data**

Create `src/types/index.ts`:

```typescript
export interface ProductConfig {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sizes: string[];
  category: 'jacket' | 'hoodie' | 'tshirt' | 'polo' | 'accessory';
}

export interface Organization {
  orgId: string;
  name: string;
  shortName: string;
  greekLetters: string;
  founded: number;
  motto: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  heroImage: string;
  products: ProductConfig[];
}
```

**Step 2: Create organizations data**

Create `src/data/organizations.ts`:

```typescript
import type { Organization } from '@/types';

export const organizations: Organization[] = [
  {
    orgId: 'alpha-phi-alpha',
    name: 'Alpha Phi Alpha Fraternity, Inc.',
    shortName: 'Alpha',
    greekLetters: 'ΑΦΑ',
    founded: 1906,
    motto: 'First of All, Servants of All, We Shall Transcend All',
    primaryColor: '#000000',
    secondaryColor: '#FFD700',
    accentColor: '#B8860B',
    logoUrl: '/orgs/alpha-shield.png',
    heroImage: '/orgs/alpha-hero.jpg',
    products: [
      {
        id: 'alpha-letterman',
        name: 'Alpha Letterman Jacket',
        description: 'Premium wool body with leather sleeves. Gold embroidered Greek letters.',
        price: 425,
        image: '/products/alpha-letterman.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        category: 'jacket',
      },
      {
        id: 'alpha-hoodie',
        name: 'Alpha Legacy Hoodie',
        description: 'Heavyweight cotton blend with embroidered crest.',
        price: 89,
        image: '/products/alpha-hoodie.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'hoodie',
      },
    ],
  },
  {
    orgId: 'kappa-alpha-psi',
    name: 'Kappa Alpha Psi Fraternity, Inc.',
    shortName: 'Kappa',
    greekLetters: 'ΚΑΨ',
    founded: 1911,
    motto: 'Achievement in Every Field of Human Endeavor',
    primaryColor: '#DC143C',
    secondaryColor: '#FFFDD0',
    accentColor: '#8B0000',
    logoUrl: '/orgs/kappa-shield.png',
    heroImage: '/orgs/kappa-hero.jpg',
    products: [
      {
        id: 'kappa-letterman',
        name: 'Kappa Varsity Jacket',
        description: 'Crimson wool with cream leather sleeves. Diamond K embroidered.',
        price: 445,
        image: '/products/kappa-letterman.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'omega-psi-phi',
    name: 'Omega Psi Phi Fraternity, Inc.',
    shortName: 'Omega',
    greekLetters: 'ΩΨΦ',
    founded: 1911,
    motto: 'Friendship is Essential to the Soul',
    primaryColor: '#6B3FA0',
    secondaryColor: '#FFD700',
    accentColor: '#4B0082',
    logoUrl: '/orgs/omega-shield.png',
    heroImage: '/orgs/omega-hero.jpg',
    products: [
      {
        id: 'omega-letterman',
        name: 'Que Dog Letterman',
        description: 'Royal purple with gold accents. Omega brand embroidered.',
        price: 435,
        image: '/products/omega-letterman.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'phi-beta-sigma',
    name: 'Phi Beta Sigma Fraternity, Inc.',
    shortName: 'Sigma',
    greekLetters: 'ΦΒΣ',
    founded: 1914,
    motto: 'Culture for Service and Service for Humanity',
    primaryColor: '#002D62',
    secondaryColor: '#FFFFFF',
    accentColor: '#001F44',
    logoUrl: '/orgs/sigma-shield.png',
    heroImage: '/orgs/sigma-hero.jpg',
    products: [
      {
        id: 'sigma-letterman',
        name: 'Sigma Varsity Jacket',
        description: 'Royal blue with white leather sleeves. Dove emblem.',
        price: 425,
        image: '/products/sigma-letterman.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'iota-phi-theta',
    name: 'Iota Phi Theta Fraternity, Inc.',
    shortName: 'Iota',
    greekLetters: 'ΙΦΘ',
    founded: 1963,
    motto: 'Building a Tradition, Not Resting Upon One',
    primaryColor: '#36454F',
    secondaryColor: '#CFB53B',
    accentColor: '#2F4F4F',
    logoUrl: '/orgs/iota-shield.png',
    heroImage: '/orgs/iota-hero.jpg',
    products: [
      {
        id: 'iota-letterman',
        name: 'Iota Centaur Jacket',
        description: 'Charcoal brown with gilded gold accents.',
        price: 435,
        image: '/products/iota-letterman.jpg',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'alpha-kappa-alpha',
    name: 'Alpha Kappa Alpha Sorority, Inc.',
    shortName: 'AKA',
    greekLetters: 'ΑΚΑ',
    founded: 1908,
    motto: 'By Culture and By Merit',
    primaryColor: '#FA8072',
    secondaryColor: '#8DB600',
    accentColor: '#E75480',
    logoUrl: '/orgs/aka-shield.png',
    heroImage: '/orgs/aka-hero.jpg',
    products: [
      {
        id: 'aka-cardigan',
        name: 'AKA Ivy Cardigan',
        description: 'Salmon pink with apple green trim. Ivy leaf embroidered.',
        price: 185,
        image: '/products/aka-cardigan.jpg',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'delta-sigma-theta',
    name: 'Delta Sigma Theta Sorority, Inc.',
    shortName: 'Delta',
    greekLetters: 'ΔΣΘ',
    founded: 1913,
    motto: 'Intelligence is the Torch of Wisdom',
    primaryColor: '#DC143C',
    secondaryColor: '#FFFDD0',
    accentColor: '#8B0000',
    logoUrl: '/orgs/delta-shield.png',
    heroImage: '/orgs/delta-hero.jpg',
    products: [
      {
        id: 'delta-cardigan',
        name: 'Delta Crimson Cardigan',
        description: 'Crimson with cream accents. Pyramid embroidered.',
        price: 175,
        image: '/products/delta-cardigan.jpg',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'zeta-phi-beta',
    name: 'Zeta Phi Beta Sorority, Inc.',
    shortName: 'Zeta',
    greekLetters: 'ΖΦΒ',
    founded: 1920,
    motto: 'A Community Conscious, Action Oriented Organization',
    primaryColor: '#002D62',
    secondaryColor: '#FFFFFF',
    accentColor: '#001F44',
    logoUrl: '/orgs/zeta-shield.png',
    heroImage: '/orgs/zeta-hero.jpg',
    products: [
      {
        id: 'zeta-cardigan',
        name: 'Zeta Finer Cardigan',
        description: 'Royal blue with white dove embroidery.',
        price: 175,
        image: '/products/zeta-cardigan.jpg',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'jacket',
      },
    ],
  },
  {
    orgId: 'sigma-gamma-rho',
    name: 'Sigma Gamma Rho Sorority, Inc.',
    shortName: 'SGRho',
    greekLetters: 'ΣΓΡ',
    founded: 1922,
    motto: 'Greater Service, Greater Progress',
    primaryColor: '#002D62',
    secondaryColor: '#FFD700',
    accentColor: '#001F44',
    logoUrl: '/orgs/sgrho-shield.png',
    heroImage: '/orgs/sgrho-hero.jpg',
    products: [
      {
        id: 'sgrho-cardigan',
        name: 'SGRho Poodle Cardigan',
        description: 'Royal blue with gold poodle embroidery.',
        price: 175,
        image: '/products/sgrho-cardigan.jpg',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        category: 'jacket',
      },
    ],
  },
];

export type { Organization, ProductConfig } from '@/types';
```

**Step 3: Verify types compile**

Run: `cd ~/Documents/yutori-greek-apparel && npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add src/types src/data
git commit -m "feat: add Divine Nine organization data structure"
```

---

## Task 2: Create Utility Functions

**Files:**
- Create: `src/lib/utils.ts`

**Step 1: Create class name utility**

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
```

**Step 2: Commit**

```bash
git add src/lib
git commit -m "feat: add utility functions"
```

---

## Task 3: Create Organization Switcher Component

**Files:**
- Create: `src/components/OrgSwitcher.tsx`

**Step 1: Build organization switcher with premium styling**

```typescript
import { motion } from 'framer-motion';
import type { Organization } from '@/types';
import { cn } from '@/lib/utils';

interface OrgSwitcherProps {
  organizations: Organization[];
  activeOrgId: string;
  onSelect: (orgId: string) => void;
}

export default function OrgSwitcher({
  organizations,
  activeOrgId,
  onSelect,
}: OrgSwitcherProps) {
  const activeOrg = organizations.find((o) => o.orgId === activeOrgId);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">
            YUTORI
          </span>
          <span className="text-xs uppercase tracking-widest text-white/60">
            Greek Products
          </span>
        </div>

        {/* Organization Pills */}
        <nav className="hidden md:flex items-center gap-1">
          {organizations.map((org) => {
            const isActive = org.orgId === activeOrgId;
            return (
              <motion.button
                key={org.orgId}
                onClick={() => onSelect(org.orgId)}
                className={cn(
                  'relative px-3 py-1.5 text-sm font-medium rounded-full transition-colors',
                  isActive ? 'text-black' : 'text-white/70 hover:text-white'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeOrgPill"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: org.secondaryColor }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{org.greekLetters}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Mobile Dropdown */}
        <div className="md:hidden">
          <select
            value={activeOrgId}
            onChange={(e) => onSelect(e.target.value)}
            className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm"
            style={{ borderColor: activeOrg?.primaryColor }}
          >
            {organizations.map((org) => (
              <option key={org.orgId} value={org.orgId} className="bg-black">
                {org.greekLetters} - {org.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/OrgSwitcher.tsx
git commit -m "feat: add organization switcher with animated pills"
```

---

## Task 4: Create Hero Section Component

**Files:**
- Create: `src/components/HeroSection.tsx`

**Step 1: Build stunning hero with dynamic org theming**

```typescript
import { motion } from 'framer-motion';
import type { Organization } from '@/types';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  activeOrg: Organization;
}

export default function HeroSection({ activeOrg }: HeroSectionProps) {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${activeOrg.primaryColor} 0%, ${activeOrg.accentColor} 100%)`,
      }}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 35px,
              ${activeOrg.secondaryColor} 35px,
              ${activeOrg.secondaryColor} 70px
            )`,
          }}
        />
      </div>

      {/* Floating Greek letters background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <span
          className="text-[40vw] font-bold"
          style={{ color: activeOrg.secondaryColor }}
        >
          {activeOrg.greekLetters}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          key={activeOrg.orgId}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              backgroundColor: `${activeOrg.secondaryColor}20`,
              border: `1px solid ${activeOrg.secondaryColor}40`,
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: activeOrg.secondaryColor }}
            />
            <span
              className="text-sm font-medium"
              style={{ color: activeOrg.secondaryColor }}
            >
              Licensed Divine Nine™ Apparel
            </span>
          </motion.div>

          {/* Organization Name */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            style={{ color: activeOrg.secondaryColor }}
          >
            {activeOrg.name}
          </h1>

          {/* Greek Letters */}
          <p
            className="text-2xl md:text-3xl font-light mb-6 tracking-[0.5em]"
            style={{ color: `${activeOrg.secondaryColor}CC` }}
          >
            {activeOrg.greekLetters}
          </p>

          {/* Motto */}
          <p
            className="text-lg md:text-xl italic max-w-2xl mx-auto mb-8"
            style={{ color: `${activeOrg.secondaryColor}99` }}
          >
            "{activeOrg.motto}"
          </p>

          {/* Founded */}
          <p
            className="text-sm uppercase tracking-widest"
            style={{ color: `${activeOrg.secondaryColor}66` }}
          >
            Est. {activeOrg.founded}
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: `linear-gradient(to top, rgb(10, 10, 10), transparent)`,
        }}
      />
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat: add dynamic hero section with org theming"
```

---

## Task 5: Create Product Card Component

**Files:**
- Create: `src/components/ProductCard.tsx`

**Step 1: Build premium product card**

```typescript
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import { cn, formatPrice } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: ProductConfig;
  org: Organization;
  onRequestItem: (product: ProductConfig, size: string) => void;
}

export default function ProductCard({
  product,
  org,
  onRequestItem,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
          animate={{ opacity: isHovered ? 0 : 1 }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center text-6xl opacity-20"
          style={{ color: org.primaryColor }}
        >
          {org.greekLetters}
        </div>

        {/* Placeholder for product image */}
        <div
          className="absolute inset-4 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${org.primaryColor}40 0%, ${org.accentColor}40 100%)`,
          }}
        >
          <span className="text-white/40 text-sm">Product Image</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-white/60 mb-4">{product.description}</p>

        {/* Price */}
        <p
          className="text-2xl font-bold mb-4"
          style={{ color: org.secondaryColor }}
        >
          {formatPrice(product.price)}
        </p>

        {/* Size selector */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-wider text-white/40 mb-2">
            Select Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'px-3 py-1.5 text-sm rounded-lg border transition-all',
                  selectedSize === size
                    ? 'border-transparent text-black'
                    : 'border-white/20 text-white/70 hover:border-white/40'
                )}
                style={
                  selectedSize === size
                    ? { backgroundColor: org.secondaryColor }
                    : undefined
                }
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Request button */}
        <motion.button
          onClick={() => selectedSize && onRequestItem(product, selectedSize)}
          disabled={!selectedSize}
          className={cn(
            'w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all',
            selectedSize
              ? 'text-black'
              : 'bg-white/10 text-white/40 cursor-not-allowed'
          )}
          style={
            selectedSize
              ? { backgroundColor: org.secondaryColor }
              : undefined
          }
          whileHover={selectedSize ? { scale: 1.02 } : undefined}
          whileTap={selectedSize ? { scale: 0.98 } : undefined}
        >
          <ShoppingBag className="w-4 h-4" />
          Request This Item
        </motion.button>
      </div>
    </motion.div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat: add premium product card with size selection"
```

---

## Task 6: Create Product Section Component

**Files:**
- Create: `src/components/OrgProductSection.tsx`

**Step 1: Build product grid section**

```typescript
import { motion } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import ProductCard from './ProductCard';

interface OrgProductSectionProps {
  org: Organization;
  onRequestItem: (product: ProductConfig, size: string) => void;
}

export default function OrgProductSection({
  org,
  onRequestItem,
}: OrgProductSectionProps) {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium {org.shortName} Apparel
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Handcrafted with pride. Each piece represents your legacy and commitment to excellence.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {org.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                org={org}
                onRequestItem={onRequestItem}
              />
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {org.products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/40">
              Products coming soon for {org.name}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/OrgProductSection.tsx
git commit -m "feat: add product section with animated grid"
```

---

## Task 7: Create Inquiry Modal Component

**Files:**
- Create: `src/components/InquiryModal.tsx`

**Step 1: Build inquiry modal with Radix Dialog**

```typescript
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import { formatPrice } from '@/lib/utils';
import { X, Send, CheckCircle } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductConfig | null;
  size: string;
  org: Organization;
}

export default function InquiryModal({
  isOpen,
  onClose,
  product,
  size,
  org,
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    chapterName: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with backend/email service
    console.log('Inquiry submitted:', { product, size, org: org.name, ...formData });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', phone: '', chapterName: '', message: '' });
    }, 2000);
  };

  if (!product) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: `linear-gradient(180deg, ${org.primaryColor} 0%, #0a0a0a 30%)`,
                  }}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between">
                      <div>
                        <Dialog.Title className="text-xl font-bold text-white">
                          Request Inquiry
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-white/60 mt-1">
                          {product.name} - Size {size}
                        </Dialog.Description>
                      </div>
                      <Dialog.Close asChild>
                        <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Product summary */}
                    <div
                      className="mt-4 p-4 rounded-xl"
                      style={{ backgroundColor: `${org.secondaryColor}10` }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                          <p className="text-white/60 text-sm">
                            {org.name} · Size {size}
                          </p>
                        </div>
                        <p
                          className="text-xl font-bold"
                          style={{ color: org.secondaryColor }}
                        >
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="p-6">
                    {isSubmitted ? (
                      <motion.div
                        className="text-center py-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <CheckCircle
                          className="w-16 h-16 mx-auto mb-4"
                          style={{ color: org.secondaryColor }}
                        />
                        <p className="text-white text-lg font-medium">
                          Inquiry Submitted!
                        </p>
                        <p className="text-white/60 text-sm mt-2">
                          We'll contact you within 24-48 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-white/60 mb-1.5">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-white/60 mb-1.5">
                              Chapter Name
                            </label>
                            <input
                              type="text"
                              value={formData.chapterName}
                              onChange={(e) =>
                                setFormData({ ...formData, chapterName: e.target.value })
                              }
                              className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                              placeholder="e.g., Alpha Chapter"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-white/60 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                            placeholder="you@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-white/60 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                            placeholder="(555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-white/60 mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                            rows={3}
                            className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 resize-none"
                            placeholder="Customization requests, questions, etc."
                          />
                        </div>

                        <motion.button
                          type="submit"
                          className="w-full py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 text-black"
                          style={{ backgroundColor: org.secondaryColor }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Send className="w-4 h-4" />
                          Submit Inquiry
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/InquiryModal.tsx
git commit -m "feat: add inquiry modal with animated transitions"
```

---

## Task 8: Create Main App Component

**Files:**
- Modify: `src/App.tsx`

**Step 1: Assemble all components**

```typescript
import { useState } from 'react';
import { organizations } from '@/data/organizations';
import type { ProductConfig } from '@/types';
import OrgSwitcher from '@/components/OrgSwitcher';
import HeroSection from '@/components/HeroSection';
import OrgProductSection from '@/components/OrgProductSection';
import InquiryModal from '@/components/InquiryModal';

export default function App() {
  const [activeOrgId, setActiveOrgId] = useState(organizations[0].orgId);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductConfig | null>(null);
  const [selectedSize, setSelectedSize] = useState('');

  const activeOrg = organizations.find((o) => o.orgId === activeOrgId) || organizations[0];

  const handleRequestItem = (product: ProductConfig, size: string) => {
    setSelectedProduct(product);
    setSelectedSize(size);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <OrgSwitcher
        organizations={organizations}
        activeOrgId={activeOrgId}
        onSelect={setActiveOrgId}
      />

      <HeroSection activeOrg={activeOrg} />

      <OrgProductSection org={activeOrg} onRequestItem={handleRequestItem} />

      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
        size={selectedSize}
        org={activeOrg}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Yutori Greek Products, LTD. All rights reserved.</p>
          <p>Licensed Divine Nine&trade; Apparel &middot; Display Catalog &middot; Inquiry-to-Order</p>
        </div>
      </footer>
    </div>
  );
}
```

**Step 2: Update main.tsx to import CSS**

Verify `src/main.tsx` imports the CSS:

```typescript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Step 3: Verify app compiles and runs**

Run: `cd ~/Documents/yutori-greek-apparel && npm run dev`
Expected: Dev server starts, no errors

**Step 4: Commit**

```bash
git add src/App.tsx src/main.tsx
git commit -m "feat: assemble landing page with all components"
```

---

## Task 9: Add Google Fonts and Final Polish

**Files:**
- Modify: `index.html`

**Step 1: Add Google Fonts**

Update `index.html` head:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yutori Greek Products | Licensed Divine Nine Apparel</title>
    <meta name="description" content="Premium licensed Divine Nine Greek lettered apparel. Handcrafted jackets, hoodies, and accessories for Alpha Phi Alpha, Kappa Alpha Psi, Omega Psi Phi, and more." />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add Google Fonts and SEO meta tags"
```

---

## Task 10: Final Testing and Push

**Step 1: Run type check**

Run: `cd ~/Documents/yutori-greek-apparel && npx tsc --noEmit`
Expected: No errors

**Step 2: Run dev server and verify**

Run: `npm run dev`
Expected: Landing page loads with Divine Nine theming

**Step 3: Push to GitHub**

```bash
git push origin main
```

---

## Summary

This plan creates a stunning Divine Nine apparel landing page with:
- **Dynamic organization theming** - Colors, Greek letters, and branding change per organization
- **Premium animations** - Framer Motion for smooth transitions and interactions
- **Accessible components** - Radix UI primitives for modal dialogs
- **Mobile-responsive** - Works on all screen sizes
- **Inquiry-to-order flow** - Form modal for product requests

The design is dark, premium, and celebrates each organization's heritage and colors.
