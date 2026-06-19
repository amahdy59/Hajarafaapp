import React, { useState } from "react";
import { ArrowLeft, Mail, Phone, Send, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import { useAppSettings } from "../context/AppSettingsContext";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/Button";
import { CONTACT } from "../config/contact";


export function Contact() {
  const { t, isRTL } = useAppSettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = isRTL ? "الاسم مطلوب" : "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = isRTL ? "البريد الإلكتروني مطلوب" : "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isRTL ? "البريد الإلكتروني غير صالح" : "Invalid email address";
    }
    if (!formData.message.trim()) {
      newErrors.message = isRTL ? "الرسالة مطلوبة" : "Message is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-terracotta text-sm transition-colors w-fit">
            <ArrowLeft size={16} className="rtl-flip" />
            {isRTL ? "العودة للرئيسية" : "Back to Home"}
          </Link>
          <div className="flex items-center gap-3">
            <Phone size={24} className="text-brand-terracotta fill-brand-peach/50" />
            <h1 className="text-foreground font-display text-2xl sm:text-3xl">{t.contactUs}</h1>
          </div>
          <p className="text-muted-foreground text-sm max-w-xl leading-relaxed select-none">
            {isRTL ? (
              <span>لديك أي أسئلة أو استفسارات؟ فريق خدمة عملاء حاج عرفة يسعده الرد على اتصالاتكم ورسائلكم في أي وقت.</span>
            ) : (
              <span>Have questions or feedback? The Haj Arafa Customer Care team is here to support you with any inquiries.</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Quick contact info panel */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-5 shadow-soft space-y-4">
              <h3 className="text-foreground font-display text-sm sm:text-base border-b border-border/50 pb-2">
                {isRTL ? "اتصال سريع" : "Direct Support"}
              </h3>

              {/* Phone support */}
              <div className="space-y-1">
                <span className="eyebrow text-[10px] block">{isRTL ? "الخط الساخن" : "Hotline"}</span>
                <a href={`tel:${CONTACT.hotline}`} className="text-foreground font-semibold hover:text-brand-terracotta hover:underline flex items-center gap-2 text-sm sm:text-base">
                  <Phone size={14} className="text-brand-terracotta" /> {CONTACT.hotline}
                </a>
              </div>

              {/* Email Support */}
              <div className="space-y-1">
                <span className="eyebrow text-[10px] block">{isRTL ? "البريد الإلكتروني" : "Email Support"}</span>
                <a href={`mailto:${CONTACT.email}`} className="text-foreground font-semibold hover:text-brand-terracotta hover:underline flex items-center gap-2 text-sm sm:text-base break-all">
                  <Mail size={14} className="text-brand-terracotta" /> {CONTACT.email}
                </a>
              </div>

              {/* WhatsApp instant support button */}
              <div className="pt-2">
                <span className="eyebrow text-[10px] block mb-2">{isRTL ? "تواصل معنا مباشرة" : "WhatsApp Support"}</span>
                <a
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-sage text-white hover:bg-brand-sage-dark px-4.5 py-2.5 rounded-xl transition-all text-xs font-semibold uppercase tracking-wider"
                >
                  <MessageCircle size={14} /> {isRTL ? "دردشة واتساب" : "WhatsApp Chat"}
                </a>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-soft">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    aria-live="polite"
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-foreground font-display text-xl">
                        {isRTL ? "تم إرسال رسالتك بنجاح" : "Message Sent Successfully"}
                      </h2>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        {isRTL 
                          ? "شكراً لتواصلك معنا. سنقوم بالرد على استفسارك خلال ٢٤ ساعة عمل." 
                          : "Thank you for reaching out. We will review your message and respond within 24 working hours."}
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-brand-peach text-brand-terracotta hover:bg-brand-terracotta hover:text-white px-5 py-2.5 rounded-xl text-xs font-semibold uppercase transition-all"
                    >
                      {isRTL ? "إرسال رسالة أخرى" : "Send Another Message"}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-foreground font-display text-sm sm:text-base border-b border-border/50 pb-2">
                      {isRTL ? "أرسل لنا رسالة" : "Send a Message"}
                    </h3>

                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs text-muted-foreground mb-1.5">{isRTL ? "الاسم بالكامل" : "Full Name"} *</label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={`w-full px-4 py-2.5 border ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-brand-terracotta"} bg-background text-foreground rounded-xl text-sm outline-none transition-colors`}
                      />
                      {errors.name && <span id="contact-name-error" className="text-destructive text-xs mt-1 block">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs text-muted-foreground mb-1.5">{isRTL ? "البريد الإلكتروني" : "Email Address"} *</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={`w-full px-4 py-2.5 border ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-brand-terracotta"} bg-background text-foreground rounded-xl text-sm outline-none transition-colors`}
                      />
                      {errors.email && <span id="contact-email-error" className="text-destructive text-xs mt-1 block">{errors.email}</span>}
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs text-muted-foreground mb-1.5">{isRTL ? "الموضوع (اختياري)" : "Subject (Optional)"}</label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-border focus:border-brand-terracotta bg-background text-foreground rounded-xl text-sm outline-none transition-colors"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs text-muted-foreground mb-1.5">{isRTL ? "الرسالة" : "Your Message"} *</label>
                      <textarea
                        id="contact-message"
                        value={formData.message}
                        rows={4}
                        onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                        className={`w-full px-4 py-2.5 border ${errors.message ? "border-destructive focus:border-destructive" : "border-border focus:border-brand-terracotta"} bg-background text-foreground rounded-xl text-sm outline-none transition-colors resize-none`}
                      />
                      {errors.message && <span id="contact-message-error" className="text-destructive text-xs mt-1 block">{errors.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      isLoading={loading}
                      size="lg"
                      fullWidth
                      rightIcon={<Send size={14} />}
                    >
                      {isRTL ? "إرسال الرسالة" : "Send Message"}
                    </Button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 sm:h-6" />
    </div>
  );
}
