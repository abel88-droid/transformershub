import { Metadata } from "next";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ui/ContactForm";
import Button from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/utils";
import {
  WHATSAPP_NUMBER,
  SUPPORT_EMAIL,
  SUPPORT_PHONE,
  STORE_ADDRESS,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Transformers Protein Hub for order support, product questions, or bulk inquiries. WhatsApp, phone, and email support available.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappLink = buildWhatsAppLink({ phone: WHATSAPP_NUMBER });

  return (
    <>
      <PageHero
        eyebrow="We're Here To Help"
        title="Get In Touch"
        description="Questions about an order, a formula, or a bulk inquiry? Reach out — a real person replies, not a bot."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-8xl px-6 grid lg:grid-cols-[1fr_420px] gap-12">
          <ContactForm />

          <div className="space-y-5">
            <div className="label-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-1">
                <MessageCircle size={18} className="text-gold" />
                <h3 className="font-display text-lg uppercase text-bone">
                  Fastest: WhatsApp
                </h3>
              </div>
              <p className="text-graphite text-sm mb-4">
                Most order queries are answered within minutes during business hours.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" fullWidth>
                  Message Us <MessageCircle size={16} />
                </Button>
              </a>
            </div>

            <div className="label-card rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-bone">{STORE_ADDRESS}</p>
                  <p className="font-mono text-xs text-graphite mt-0.5">Store & Warehouse</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-bone">{SUPPORT_PHONE}</p>
                  <p className="font-mono text-xs text-graphite mt-0.5">Mon–Sat, 9am–7pm</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-bone">{SUPPORT_EMAIL}</p>
                  <p className="font-mono text-xs text-graphite mt-0.5">Replies within 24 hrs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-bone">Same-day dispatch</p>
                  <p className="font-mono text-xs text-graphite mt-0.5">
                    Orders placed before 3pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
