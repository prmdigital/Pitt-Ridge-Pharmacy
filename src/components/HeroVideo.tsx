"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import poster from "../../public/images/pharmacist-consultation-poster.jpg";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Full-width looping background video for the hero (licensed Freepik stock, muted, 9 s seamless loop).
 * - The poster image renders first (fast LCP, no-JS fallback); the video fades in once playing.
 * - Phones get the 540p file; larger screens get 1080p.
 * - Pauses when scrolled out of view or the tab is hidden, has a visible pause control
 *   (WCAG 2.2.2), and never plays when the visitor prefers reduced motion.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Play only while visible, the tab is active, and the visitor hasn't paused it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowMotion) return;
    let inView = true;
    const sync = () => {
      if (inView && !document.hidden && !userPaused) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(v);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [allowMotion, userPaused]);

  return (
    <>
      <Image
        src={poster}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      {allowMotion && (
        <video
          ref={videoRef}
          aria-hidden
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center] transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`${base}/videos/pharmacist-consultation-loop-540.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`${base}/videos/pharmacist-consultation-loop-1080.mp4`} type="video/mp4" />
        </video>
      )}
      {allowMotion && (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-pressed={userPaused}
          className="absolute top-[calc(var(--hdr)+0.75rem)] right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-navy/60 text-white ring-1 ring-white/30 backdrop-blur hover:bg-navy/80 sm:right-6 lg:top-auto lg:bottom-52"
        >
          {userPaused ? <Play aria-hidden className="size-4" /> : <Pause aria-hidden className="size-4" />}
          <span className="sr-only">Pause background video</span>
        </button>
      )}
    </>
  );
}
