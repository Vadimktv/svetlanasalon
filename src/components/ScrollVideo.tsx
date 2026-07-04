'use client';

import { useRef, useEffect } from 'react';

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let requestAnimationFrameId: number;
    let targetTime = 0;
    
    // Ensure video is loaded enough to seek
    video.load();
    video.pause();

    const updateVideoTime = () => {
      // Smoothly interpolate current time towards target time for that buttery feel
      if (video.duration) {
        // LERP for smooth scrubbing
        const diff = targetTime - video.currentTime;
        video.currentTime += diff * 0.1;
      }
      requestAnimationFrameId = requestAnimationFrame(updateVideoTime);
    };

    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Map scroll progress to video duration
      if (video.duration) {
        // Add a slight offset so the video doesn't end exactly at the last pixel, ensuring the last frame is visible
        targetTime = progress * (video.duration - 0.1); 
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    requestAnimationFrameId = requestAnimationFrame(updateVideoTime);

    // Initial call to set state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] w-full h-full bg-black overflow-hidden pointer-events-none">
      <video
        ref={videoRef}
        src="/placeholder.mp4"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
        preload="auto"
        muted
        playsInline
      />
      {/* Dark gradient overlay so text remains readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
    </div>
  );
}
