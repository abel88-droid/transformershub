"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import Button from "./Button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-24 px-6"
    >
      <div className="w-20 h-20 rounded-full bg-ink-surface border border-ink-border flex items-center justify-center mb-6">
        <Icon className="text-gold" size={32} strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-2xl uppercase text-bone mb-2">{title}</h3>
      <p className="text-graphite max-w-sm mb-8">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary">{actionLabel}</Button>
        </Link>
      )}
    </motion.div>
  );
}
