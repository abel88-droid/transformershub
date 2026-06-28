"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, BadgeCheck } from "lucide-react";
import { reviews } from "@/data/reviews";
import SectionHeading from "@/components/ui/SectionHeading";
import RatingStars from "@/components/ui/RatingStars";

export default function ReviewsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const visibleCount = 1;

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const review = reviews[index];

  return (
    <section className="relative py-24 sm:py-28 bg-ink-raised overflow-hidden">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          eyebrow="From The Gym Floor"
          title="What Our Athletes Say"
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 max-w-2xl mx-auto relative">
          <Quote className="absolute -top-6 left-1/2 -translate-x-1/2 text-gold/20" size={56} />

          <div className="relative min-h-[260px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="w-full text-center"
              >
                <RatingStars rating={review.rating} className="justify-center mb-5" size={16} />
                <p className="text-bone text-lg sm:text-xl leading-relaxed font-light">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-7 flex items-center justify-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center font-display text-ink"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-bone flex items-center gap-1.5">
                      {review.name}
                      {review.verified && (
                        <BadgeCheck size={14} className="text-gold" />
                      )}
                    </p>
                    <p className="font-mono text-xs text-graphite">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-bone/70 hover:text-gold hover:border-gold/40 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-6 bg-gold" : "w-1.5 bg-ink-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-ink-border flex items-center justify-center text-bone/70 hover:text-gold hover:border-gold/40 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
