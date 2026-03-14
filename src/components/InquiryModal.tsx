import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import type { Organization, ProductConfig } from '@/types';
import { formatPrice } from '@/lib/utils';
import { X, Send, CheckCircle, User, Mail, Phone, Building, MessageSquare } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Inquiry submitted:', {
      product,
      size,
      org: org.name,
      ...formData,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        chapterName: '',
        message: '',
      });
    }, 2500);
  };

  if (!product) return null;

  const inputClass = `
    w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
    text-white placeholder:text-white/25
    focus:outline-none focus:border-white/30 focus:bg-white/8
    transition-all duration-300
  `;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 p-4 sm:p-6"
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="rounded-3xl overflow-hidden border"
                  style={{
                    background: `linear-gradient(180deg, ${org.primaryColor}40 0%, #0a0a0a 25%)`,
                    borderColor: `${org.secondaryColor}15`,
                  }}
                >
                  {/* Header with gradient */}
                  <div
                    className="relative p-6 sm:p-8"
                    style={{
                      background: `linear-gradient(135deg, ${org.primaryColor}80 0%, ${org.accentColor}60 100%)`,
                    }}
                  >
                    {/* Close button */}
                    <Dialog.Close asChild>
                      <motion.button
                        className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/30 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/50 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </Dialog.Close>

                    <Dialog.Title
                      className="text-2xl sm:text-3xl font-bold mb-2"
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        color: org.secondaryColor,
                      }}
                    >
                      Request Inquiry
                    </Dialog.Title>
                    <Dialog.Description
                      className="text-sm"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: `${org.secondaryColor}80`,
                      }}
                    >
                      Complete the form below and we'll contact you within 24-48 hours.
                    </Dialog.Description>
                  </div>

                  {/* Product summary card */}
                  <div className="px-6 sm:px-8 -mt-4">
                    <div
                      className="p-5 rounded-2xl border"
                      style={{
                        backgroundColor: `${org.secondaryColor}08`,
                        borderColor: `${org.secondaryColor}20`,
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p
                            className="font-semibold text-white text-lg"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            {product.name}
                          </p>
                          <p
                            className="text-sm text-white/50 mt-1"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            {org.shortName} · Size {size}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className="text-2xl font-bold"
                            style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              color: org.secondaryColor,
                            }}
                          >
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="p-6 sm:p-8 pt-6">
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          className="text-center py-12"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                          >
                            <CheckCircle
                              className="w-20 h-20 mx-auto mb-6"
                              style={{ color: org.secondaryColor }}
                            />
                          </motion.div>
                          <p
                            className="text-2xl font-bold text-white mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                          >
                            Inquiry Submitted!
                          </p>
                          <p
                            className="text-white/50"
                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                          >
                            Check your email for confirmation.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          className="space-y-5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Name & Chapter */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label
                                className="flex items-center gap-2 text-sm text-white/50 mb-2"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                <User className="w-3.5 h-3.5" />
                                Full Name *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({ ...formData, name: e.target.value })
                                }
                                className={inputClass}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                placeholder="Your name"
                              />
                            </div>
                            <div>
                              <label
                                className="flex items-center gap-2 text-sm text-white/50 mb-2"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                <Building className="w-3.5 h-3.5" />
                                Chapter Name
                              </label>
                              <input
                                type="text"
                                value={formData.chapterName}
                                onChange={(e) =>
                                  setFormData({ ...formData, chapterName: e.target.value })
                                }
                                className={inputClass}
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                                placeholder="e.g., Alpha Chapter"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label
                              className="flex items-center gap-2 text-sm text-white/50 mb-2"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <Mail className="w-3.5 h-3.5" />
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                              className={inputClass}
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                              placeholder="you@example.com"
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label
                              className="flex items-center gap-2 text-sm text-white/50 mb-2"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <Phone className="w-3.5 h-3.5" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                              className={inputClass}
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                              placeholder="(555) 123-4567"
                            />
                          </div>

                          {/* Message */}
                          <div>
                            <label
                              className="flex items-center gap-2 text-sm text-white/50 mb-2"
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              Additional Notes
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                              }
                              rows={3}
                              className={`${inputClass} resize-none`}
                              style={{ fontFamily: "'DM Sans', sans-serif" }}
                              placeholder="Customization requests, questions, etc."
                            />
                          </div>

                          {/* Submit button */}
                          <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 text-sm uppercase tracking-widest transition-all disabled:opacity-70"
                            style={{
                              backgroundColor: org.secondaryColor,
                              color: org.primaryColor,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isSubmitting ? (
                              <>
                                <motion.div
                                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                Submit Inquiry
                              </>
                            )}
                          </motion.button>
                        </motion.form>
                      )}
                    </AnimatePresence>
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
