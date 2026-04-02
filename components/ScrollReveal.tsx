"use client";

/**
 * Scroll-triggered animation primitives built on Framer Motion.
 *
 * Usage:
 *   <FadeUp>          — fade + translate-Y on scroll
 *   <FadeIn>          — fade only
 *   <SlideIn dir="left"> — slide from a side
 *   <Stagger>         — stagger container (wrap StaggerItem children)
 *   <StaggerItem>     — individual staggered child
 */

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, margin: "-80px 0px" } as const;

/* ── FadeUp ─────────────────────────────────────────────────── */
interface FadeUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
  distance?: number;
}
export function FadeUp({
  delay = 0,
  duration = 0.65,
  distance = 36,
  ...props
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    />
  );
}

/* ── FadeIn ─────────────────────────────────────────────────── */
interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}
export function FadeIn({ delay = 0, duration = 0.6, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: "easeOut" }}
      {...props}
    />
  );
}

/* ── SlideIn ────────────────────────────────────────────────── */
interface SlideInProps extends HTMLMotionProps<"div"> {
  dir?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
}
export function SlideIn({
  dir = "left",
  delay = 0,
  duration = 0.65,
  distance = 48,
  ...props
}: SlideInProps) {
  const initial = {
    opacity: 0,
    x: dir === "left" ? -distance : dir === "right" ? distance : 0,
    y: dir === "up" ? distance : dir === "down" ? -distance : 0,
  };
  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    />
  );
}

/* ── Stagger container ──────────────────────────────────────── */
interface StaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  delayChildren?: number;
}
export function Stagger({
  staggerDelay = 0.1,
  delayChildren = 0.05,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
      {...props}
    />
  );
}

/* ── Stagger child ──────────────────────────────────────────── */
interface StaggerItemProps extends HTMLMotionProps<"div"> {
  distance?: number;
  duration?: number;
}
export function StaggerItem({
  distance = 28,
  duration = 0.55,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: EASE },
        },
      }}
      {...props}
    />
  );
}
