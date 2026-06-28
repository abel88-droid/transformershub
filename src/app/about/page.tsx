import { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, FlaskConical, Truck, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import TearDivider from "@/components/ui/TearDivider";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Transformers Protein Hub was founded to bring lab-verified, genuine sports nutrition to Indian athletes at honest prices.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: FlaskConical,
    title: "Lab Verified",
    description: "Every batch is tested for purity before it reaches our shelves.",
  },
  {
    icon: ShieldCheck,
    title: "Direct Sourcing",
    description: "We buy directly from manufacturers — no grey-market resellers.",
  },
  {
    icon: Truck,
    title: "Fast Logistics",
    description: "A dedicated dispatch team gets your order out within 24 hours.",
  },
  {
    icon: Users,
    title: "Athlete-Led",
    description: "Our team trains daily — we stock what we'd put in our own bodies.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Built By Lifters, For Lifters"
        description="Transformers Protein Hub started in a single gym locker room conversation about how hard it was to find supplements you could actually trust."
      />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-8xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-border">
            <Image
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop"
              alt="Gym training session"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="eyebrow">Since 2021</span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase text-bone mt-3 leading-tight">
              From One Tub To Thousands Of Orders
            </h2>
            <p className="text-graphite mt-5 leading-relaxed">
              What began as a small batch of imported whey shared among a tight-knit
              group of training partners has grown into a full-catalogue sports
              nutrition store serving athletes across India. The mission never
              changed: every product we sell has to pass the test we'd apply to
              our own training.
            </p>
            <p className="text-graphite mt-4 leading-relaxed">
              Today, every order ships with a verifiable batch code, every formula
              is checked against independent lab reports, and every customer
              question gets a real answer from someone who actually lifts.
            </p>
          </div>
        </div>
      </section>

      <TearDivider />

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow="What We Stand For"
            title="The Principles Behind Every Order"
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="label-card rounded-2xl p-7">
                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-display text-lg uppercase text-bone mb-2">{v.title}</h3>
                <p className="text-graphite text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-ink-raised border-t border-ink-border">
        <div className="mx-auto max-w-8xl px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            ["50K+", "Orders Shipped"],
            ["16", "Brand Partners"],
            ["500+", "5-Star Reviews"],
            ["24 HR", "Avg. Dispatch Time"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-3xl sm:text-4xl text-gold">{num}</p>
              <p className="font-mono text-[10px] tracking-widest2 text-graphite uppercase mt-2">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
