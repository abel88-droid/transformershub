"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="label-card rounded-2xl p-10 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-5">
          <Send size={22} className="text-gold" />
        </div>
        <h3 className="font-display text-xl uppercase text-bone mb-2">Message Sent</h3>
        <p className="text-graphite text-sm">
          Thanks, {form.name.split(" ")[0] || "athlete"} — we'll get back to you within one
          business day.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="eyebrow block mb-2">
          Name
        </label>
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border focus:border-gold rounded-xl px-4 py-3 text-bone outline-none transition-colors"
          placeholder="Your full name"
        />
      </div>
      <div>
        <label htmlFor="email" className="eyebrow block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border focus:border-gold rounded-xl px-4 py-3 text-bone outline-none transition-colors"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="message" className="eyebrow block mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border focus:border-gold rounded-xl px-4 py-3 text-bone outline-none transition-colors resize-none"
          placeholder="Tell us how we can help..."
        />
      </div>
      <Button type="submit" variant="primary" size="lg" fullWidth>
        Send Message <Send size={16} />
      </Button>
    </form>
  );
}
