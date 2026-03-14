import { useState } from 'react';
import { organizations } from '@/data/organizations';
import type { ProductConfig } from '@/types';
import OrgSwitcher from '@/components/OrgSwitcher';
import HeroSection from '@/components/HeroSection';
import OrgProductSection from '@/components/OrgProductSection';
import InquiryModal from '@/components/InquiryModal';
import { motion } from 'framer-motion';

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
      <footer
        className="relative border-t py-16 px-6"
        style={{
          backgroundColor: '#050505',
          borderColor: `${activeOrg.secondaryColor}10`,
        }}
      >
        {/* Subtle gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${activeOrg.secondaryColor}30, transparent)`,
          }}
        />

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3
                className="text-2xl font-bold tracking-[0.2em] uppercase mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: activeOrg.secondaryColor,
                }}
              >
                Yutori
              </h3>
              <p
                className="text-xs uppercase tracking-[0.3em] text-white/30"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Greek Products
              </p>
            </motion.div>

            {/* Links */}
            <div
              className="flex flex-wrap justify-center gap-6 text-sm text-white/40"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <a href="#" className="hover:text-white/60 transition-colors">
                About Us
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Custom Orders
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Size Guide
              </a>
              <a href="#" className="hover:text-white/60 transition-colors">
                Contact
              </a>
            </div>

            {/* Legal */}
            <div
              className="text-center lg:text-right text-xs text-white/30 space-y-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <p>&copy; {new Date().getFullYear()} Yutori Greek Products, LTD.</p>
              <p>Licensed Divine Nine&trade; Apparel</p>
            </div>
          </div>

          {/* Bottom tagline */}
          <motion.div
            className="mt-12 pt-8 border-t text-center"
            style={{ borderColor: `${activeOrg.secondaryColor}08` }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p
              className="text-xs uppercase tracking-[0.4em] text-white/20"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Display Catalog · Inquiry-to-Order · Handcrafted Excellence
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
