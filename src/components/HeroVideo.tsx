"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import poster from "../../public/images/pharmacist-consultation-poster.jpg";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Full-width looping background video for the hero (licensed Freepik stock, muted, 9 s seamless loop).
 * - The poster image renders first (fast LCP, no-JS fallback); the video fades in once playing.
 * - Phones get the 540p file; larger screens get 1080p.
 * - Pauses when scrolled out of view or the tab is hidden, and never plays when the visitor
 *   prefers reduced motion (they see the still poster instead).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [allowMotion, setAllowMotion] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowMotion(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Play only while visible and the tab is active.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !allowMotion) return;
    let inView = true;
    const sync = () => {
      if (inView && !document.hidden) v.play().catch(() => {});
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
  }, [allowMotion]);

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
    </>
  );
}
