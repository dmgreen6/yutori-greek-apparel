import { motion, AnimatePresence } from 'framer-motion';
import type { Organization } from '@/types';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

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
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Frosted glass navigation */}
      <div
        className="backdrop-blur-2xl border-b transition-colors duration-700"
        style={{
          backgroundColor: `${activeOrg?.primaryColor}15`,
          borderColor: `${activeOrg?.secondaryColor}20`,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: activeOrg?.secondaryColor }}
              >
                <Crown className="w-5 h-5" style={{ color: activeOrg?.primaryColor }} />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-lg font-bold tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    color: activeOrg?.secondaryColor,
                  }}
                >
                  Yutori
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Greek Products
                </span>
              </div>
            </motion.div>

            {/* Desktop Organization Pills */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              {organizations.map((org) => {
                const isActive = org.orgId === activeOrgId;
                return (
                  <motion.button
                    key={org.orgId}
                    onClick={() => onSelect(org.orgId)}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300',
                      isActive ? 'text-black' : 'text-white/60 hover:text-white'
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          layoutId="activeOrgPill"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: org.secondaryColor }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                    <span
                      className="relative z-10 font-semibold tracking-wide"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {org.greekLetters}
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Mobile Dropdown */}
            <div className="lg:hidden">
              <select
                value={activeOrgId}
                onChange={(e) => onSelect(e.target.value)}
                className="appearance-none bg-white/10 text-white rounded-xl px-4 py-2.5 text-sm font-medium border border-white/20 focus:outline-none focus:ring-2 cursor-pointer"
                style={{
                  borderColor: `${activeOrg?.secondaryColor}40`,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {organizations.map((org) => (
                  <option
                    key={org.orgId}
                    value={org.orgId}
                    className="bg-black text-white"
                  >
                    {org.greekLetters} — {org.shortName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
