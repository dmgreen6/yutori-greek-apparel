import { motion, AnimatePresence } from 'framer-motion';
import type { Organization } from '@/types';
import { Sparkles, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  activeOrg: Organization;
}

export default function HeroSection({ activeOrg }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient background */}
      <motion.div
        key={activeOrg.orgId + '-bg'}
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, ${activeOrg.primaryColor}80 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 100%, ${activeOrg.accentColor}60 0%, transparent 40%),
            radial-gradient(ellipse 40% 30% at 0% 80%, ${activeOrg.primaryColor}40 0%, transparent 30%),
            #0a0a0a
          `,
        }}
      />

      {/* Animated grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal line pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              ${activeOrg.secondaryColor} 40px,
              ${activeOrg.secondaryColor} 41px
            )`,
          }}
        />
      </div>

      {/* Massive floating Greek letters */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOrg.orgId + '-letters'}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-[35vw] md:text-[28vw] font-black leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: activeOrg.secondaryColor,
              opacity: 0.04,
              textShadow: `0 0 200px ${activeOrg.secondaryColor}30`,
            }}
          >
            {activeOrg.greekLetters}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: activeOrg.secondaryColor }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: activeOrg.primaryColor }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOrg.orgId}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Licensed badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10 border"
              style={{
                backgroundColor: `${activeOrg.secondaryColor}08`,
                borderColor: `${activeOrg.secondaryColor}25`,
              }}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: activeOrg.secondaryColor }}
              />
              <span
                className="text-sm font-medium tracking-widest uppercase"
                style={{
                  color: activeOrg.secondaryColor,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Licensed Divine Nine™ Apparel
              </span>
            </motion.div>

            {/* Greek letters - large display */}
            <motion.p
              className="text-2xl md:text-3xl font-light mb-6 tracking-[0.6em]"
              style={{
                color: `${activeOrg.secondaryColor}90`,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.6em' }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {activeOrg.greekLetters}
            </motion.p>

            {/* Organization name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: activeOrg.secondaryColor,
                textShadow: `0 0 80px ${activeOrg.secondaryColor}20`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {activeOrg.name}
            </motion.h1>

            {/* Motto */}
            <motion.p
              className="text-lg md:text-xl italic max-w-2xl mx-auto mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: `${activeOrg.secondaryColor}70`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              "{activeOrg.motto}"
            </motion.p>

            {/* Founded year */}
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div
                className="h-px w-12"
                style={{ backgroundColor: `${activeOrg.secondaryColor}30` }}
              />
              <p
                className="text-sm uppercase tracking-[0.3em]"
                style={{
                  color: `${activeOrg.secondaryColor}50`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Established {activeOrg.founded}
              </p>
              <div
                className="h-px w-12"
                style={{ backgroundColor: `${activeOrg.secondaryColor}30` }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className="text-xs uppercase tracking-[0.2em]"
            style={{
              color: `${activeOrg.secondaryColor}40`,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Explore Collection
          </span>
          <ChevronDown
            className="w-5 h-5"
            style={{ color: `${activeOrg.secondaryColor}40` }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: `linear-gradient(to top, #0a0a0a, transparent)`,
        }}
      />
    </section>
  );
}
