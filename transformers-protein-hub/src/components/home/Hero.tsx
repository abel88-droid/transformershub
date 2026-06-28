"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import Button from "@/components/ui/Button";

export default function Hero() {
  const parallax = useMouseParallax(14);

  return (
    <section className="relative min-h-[100vh] overflow-hidden bg-ink flex items-center pt-24">
      {/* Cinematic background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.12),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(138,31,31,0.10),_transparent_50%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(212,175,55,0.5) 0px, rgba(212,175,55,0.5) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(212,175,55,0.5) 0px, rgba(212,175,55,0.5) 1px, transparent 1px, transparent 64px)",
        }}
      />
      <div className="absolute inset-0 bg-vignette" />

      <div className="relative z-10 mx-auto max-w-8xl w-full px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="foil-seal">BATCH 01 / EST. INDIA</span>
            <span className="eyebrow flex items-center gap-1.5">
              <ShieldCheck size={13} /> Lab Verified
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display uppercase text-bone leading-[0.95] text-[15vw] sm:text-6xl md:text-7xl lg:text-[5.2rem]"
          >
            Fuel Your
            <br />
            <span className="shimmer-text">Transformation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-graphite text-base sm:text-lg max-w-md leading-relaxed"
          >
            Lab-verified whey, creatine, and pre-workout — formulated for
            athletes who train hard and refuse to compromise on what goes
            into their body.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link href="/products">
              <Button variant="primary" size="lg" className="shadow-gold-glow">
                Shop The Range <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Our Story
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              ["500+", "5-Star Reviews"],
              ["50K+", "Orders Delivered"],
              ["100%", "Genuine Stock"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-gold">{num}</p>
                <p className="font-mono text-[10px] tracking-widest2 text-graphite uppercase mt-1">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: floating tubs */}
        <div className="relative h-[420px] sm:h-[520px] lg:h-[620px] hidden sm:block">
          <motion.div
            style={{
              transform: `translate(${parallax.x * 1.2}px, ${parallax.y * 1.2}px)`,
            }}
            className="absolute right-[6%] top-[6%] w-[46%] animate-float-slow"
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-gold-glow-lg border border-gold/20">
              <Image
                src="https://images.unsplash.com/photo-1579722820308-13f1473884cc?q=80&w=900&auto=format&fit=crop"
                alt="Whey protein tub"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            style={{
              transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px)`,
            }}
            className="absolute left-[2%] bottom-[8%] w-[42%] animate-float"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card border border-ink-border">
              <Image
                src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=900&auto=format&fit=crop"
                alt="Pre-workout supplement"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          <motion.div
            style={{
              transform: `translate(${parallax.x * 0.6}px, ${parallax.y * 0.6}px)`,
            }}
            className="absolute right-[18%] bottom-[0%] w-[30%] animate-float-delayed"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card border border-ink-border">
              <Image
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=900&auto=format&fit=crop"
                alt="Creatine supplement"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
            </div>
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15),_transparent_60%)] pointer-events-none" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-widest2 text-graphite">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
