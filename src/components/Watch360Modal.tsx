import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WatchProduct } from '../types';
import { X, RotateCcw, Move, ShieldCheck, Maximize, Minimize, Compass } from 'lucide-react';

interface Watch360ModalProps {
  product: WatchProduct | null;
  onClose: () => void;
}

export const Watch360Modal: React.FC<Watch360ModalProps> = ({ product, onClose }) => {
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const degreeTextRef = useRef<HTMLSpanElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);

  // Drag tracking refs (keeps loop running outside React re-render cycle for 60fps buttery smoothness)
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  // Update rotation angle in DOM without causing React re-render
  const updateAngleDisplay = useCallback((time: number, duration: number) => {
    if (!duration) return;
    const deg = Math.round((time / duration) * 360) % 360;
    const cleanDeg = deg < 0 ? deg + 360 : deg;
    if (degreeTextRef.current) {
      degreeTextRef.current.textContent = `${cleanDeg}°`;
    }
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${(cleanDeg / 360) * 100}%`;
    }
  }, []);

  // Safe seek scheduler: prevents browser video decoder thrashing
  const applySeek = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;

    if (isSeekingRef.current) return;

    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff > 0.02) {
      isSeekingRef.current = true;
      const t = targetTimeRef.current;
      if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
        (video as any).fastSeek(t);
      } else {
        video.currentTime = t;
      }
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    const video = videoRef.current;
    if (video && video.duration) {
      updateAngleDisplay(video.currentTime, video.duration);
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.03) {
        applySeek();
      }
    }
  }, [applySeek, updateAngleDisplay]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsNativeFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Toggle browser fullscreen mode
  const toggleNativeFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (modalContainerRef.current?.requestFullscreen) {
          await modalContainerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (e) {
      console.error('Fullscreen error:', e);
    }
  };

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => { });
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  // Reset state when product changes
  useEffect(() => {
    setIsLoading(true);
    setHasInteracted(false);
    isDraggingRef.current = false;
    setIsDragging(false);
    isSeekingRef.current = false;
    targetTimeRef.current = 0;
  }, [product]);

  if (!product || !product.video360) return null;

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      targetTimeRef.current = 0;
      setIsLoading(false);
      updateAngleDisplay(0, videoRef.current.duration || 1);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!videoRef.current) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    setHasInteracted(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    startTimeRef.current = videoRef.current.currentTime;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch { }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !videoRef.current) return;
    const video = videoRef.current;
    const duration = video.duration;
    if (!duration || isNaN(duration)) return;

    const deltaX = e.clientX - startPosRef.current.x;
    const deltaY = e.clientY - startPosRef.current.y;

    // Responsive drag: allows both horizontal (left/right) and vertical (up/down) drag
    // Horizontal gives natural spin; vertical also rotates smoothly as requested
    const dominantDelta = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX : -deltaY;

    // Calibrated sensitivity: 500px drag = 1 complete 360-degree rotation
    const pixelsForFullTurn = 500;
    const timeShift = (dominantDelta / pixelsForFullTurn) * duration;

    let targetTime = (startTimeRef.current + timeShift) % duration;
    while (targetTime < 0) targetTime += duration;
    while (targetTime >= duration) targetTime -= duration;

    targetTimeRef.current = targetTime;

    // Fast-path: update angle display immediately for zero latency feedback
    updateAngleDisplay(targetTime, duration);

    // Apply video seek without flooding decoder
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(applySeek);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch { }
    // Ensure final position is synced
    applySeek();
  };

  const handleResetFront = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    targetTimeRef.current = 0;
    updateAngleDisplay(0, videoRef.current.duration || 1);
    applySeek();
  };

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-between bg-[#040507] select-none overflow-hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Immersive Studio Illumination (True Luxury Ambient Backdrop) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[95vw] h-[95vw] max-w-[1200px] max-h-[1200px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.08] via-[#c5a059]/[0.04] to-transparent blur-[140px]" />
      </div>

      {/* Floating Top Bar (Unobtrusive & Elegant) */}
      <header className="relative z-30 w-full px-6 py-5 sm:px-10 sm:py-6 flex items-center justify-between backdrop-blur-md bg-black/20 border-b border-white/5">
        {/* Left: Model Branding & Reference */}
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#c5a059] bg-[#c5a059]/15 border border-[#c5a059]/40 px-2.5 py-0.5 rounded-full font-semibold">
                360° Interactive Model
              </span>
              {product.reference && (
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Ref. {product.reference}
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-2xl font-serif text-white tracking-wide font-medium">
              {product.brandName} {product.name} {product.model}
            </h1>
          </div>
        </div>

        {/* Right: Actions (Fullscreen Toggle + Close) */}
        <div className="flex items-center gap-2.5">
          {/* True Fullscreen Toggle Button */}
          <button
            onClick={toggleNativeFullscreen}
            aria-label="Toggle Fullscreen"
            title={isNativeFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            className="p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isNativeFullscreen ? (
              <Minimize className="w-5 h-5 text-[#c5a059]" />
            ) : (
              <Maximize className="w-5 h-5" />
            )}
          </button>

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            aria-label="Close 360 View"
            className="p-2.5 sm:p-3 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Center Interactive Fullscreen Showcase Area */}
      <main
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative z-10 flex-1 w-full h-full flex items-center justify-center touch-none overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        title="Click and drag anywhere to rotate the watch 360°"
      >
        {/* Video Frame - Sized to fill maximum viewport without clipping */}
        <video
          ref={videoRef}
          src={product.video360}
          playsInline
          muted
          autoPlay={false}
          loop={false}
          preload="auto"
          onLoadedMetadata={handleLoadedMetadata}
          onSeeked={handleSeeked}
          onCanPlay={() => setIsLoading(false)}
          className={`h-[70vh] sm:h-[80vh] md:h-[84vh] w-auto max-w-[95vw] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] pointer-events-none transition-opacity duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm z-30">
            <div className="w-12 h-12 border-2 border-white/10 border-t-[#c5a059] rounded-full animate-spin" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#e6ca85]">
              Loading 360° Precision Motion...
            </span>
          </div>
        )}

        {/* Gesture Guidance Overlay (Fades upon first touch) */}
        {!isLoading && !hasInteracted && (
          <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center gap-2 bg-black/75 backdrop-blur-xl px-7 py-3.5 rounded-full border border-white/15 text-white shadow-2xl animate-pulse z-20">
            <div className="flex items-center gap-3">
              <Move className="w-4 h-4 text-[#c5a059]" />
              <span className="text-xs sm:text-sm font-medium tracking-wide">
                Drag left / right or up / down to rotate
              </span>
            </div>
          </div>
        )}

        {/* Floating Live Compass / Degree Indicator */}
        <div className="absolute top-6 right-6 pointer-events-none flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 shadow-xl">
          <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
          <span
            ref={degreeTextRef}
            className="text-xs font-mono font-medium text-slate-200"
          >
            0°
          </span>
        </div>
      </main>

      {/* Floating Bottom Control Bar */}
      <footer className="relative z-30 w-full px-6 py-5 sm:px-10 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md bg-black/20 border-t border-white/5">
        {/* Reset to Front View Button */}
        <button
          onClick={handleResetFront}
          className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-[#c5a059] text-white hover:text-black border border-white/15 hover:border-[#c5a059] transition-all duration-300 shadow-xl cursor-pointer active:scale-95 text-xs sm:text-sm font-medium tracking-wider uppercase"
        >
          <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform duration-500" />
          <span>Front view</span>
        </button>

        {/* 360 Scrubbing Mini Progress Track */}
        <div className="flex items-center gap-3 w-full sm:w-64 max-w-xs">
          <span className="text-[10px] font-mono text-slate-500">0°</span>
          <div className="relative flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressFillRef}
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#c5a059] to-[#e6ca85] rounded-full transition-all duration-75"
              style={{ width: '0%' }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500">360°</span>
        </div>

        {/* Manual Drag Motion Note */}
        {/* <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-[#c5a059] shrink-0" />
          <span>Smooth Manual Motion • No Auto-Spin</span>
        </div> */}
      </footer>
    </div>
  );
};
