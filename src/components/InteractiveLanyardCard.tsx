import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { PROFILE_DATA } from '../data/portfolioData';
import adityaBeachPortraitImg from '../assets/images/aditya_beach_cutout_centered.png';
import { ResilientImage } from './ResilientImage';

export const InteractiveLanyardCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);

  // Physics coordinates relative to the natural rest point (0, 0)
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(-180); // Start high up for the initial drop-in physics

  // Spring physics for elastic lanyard behavior (low damping so it swings & bounces naturally)
  const springX = useSpring(dragX, {
    stiffness: 140,
    damping: 11,
    mass: 1.15,
  });
  const springY = useSpring(dragY, {
    stiffness: 150,
    damping: 12,
    mass: 1.15,
  });

  // Card 3D tilt & pendulum rotation derived from horizontal velocity/displacement
  const rotateZ = useTransform(springX, [-220, 0, 220], [18, 0, -18]);
  const rotateX = useTransform(springY, [-120, 0, 160], [10, 0, -12]);
  const rotateY = useTransform(springX, [-200, 0, 200], [-16, 0, 16]);

  // Initial drop-in animation when page loads (like 0:03 in the video)
  useEffect(() => {
    const timer = setTimeout(() => {
      dragX.set(24);
      dragY.set(0);
      setTimeout(() => {
        dragX.set(0);
        setHasDropped(true);
      }, 280);
    }, 150);
    return () => clearTimeout(timer);
  }, [dragX, dragY]);

  // Gentle idle pendulum sway when not dragging
  useEffect(() => {
    if (!hasDropped || isDragging) return;
    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      const sway = Math.sin(frame * 0.45) * 4.5;
      dragX.set(sway);
    }, 120);
    return () => clearInterval(interval);
  }, [hasDropped, isDragging, dragX]);

  // Dynamic SVG lanyard strap path from top anchor (200, 0) to card clip (200 + springX, 175 + springY)
  const [strapCoords, setStrapCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubX = springX.on('change', (v) => {
      setStrapCoords((prev) => ({ ...prev, x: v }));
    });
    const unsubY = springY.on('change', (v) => {
      setStrapCoords((prev) => ({ ...prev, y: v }));
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [springX, springY]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const restCenterY = rect.top + 310;

    const deltaX = Math.max(-180, Math.min(180, e.clientX - centerX));
    const deltaY = Math.max(-90, Math.min(150, e.clientY - restCenterY));

    dragX.set(deltaX);
    dragY.set(deltaY);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragX.set(0);
    dragY.set(0);
  };

  // Anchor coordinates inside the 400x540 stage
  const anchorX = 200;
  const anchorY = 0;
  const clipX = 200 + strapCoords.x;
  const clipY = 152 + strapCoords.y;
  const ctrlX = anchorX + strapCoords.x * 0.38;
  const ctrlY = (anchorY + clipY) * 0.52 + Math.abs(strapCoords.x) * 0.12;

  // Angle of the strap near the clip for rotating the text along the strap
  const strapAngleDeg =
    (Math.atan2(clipX - anchorX, Math.max(40, clipY - anchorY)) * -180) / Math.PI;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[380px] h-[510px] sm:h-[550px] mx-auto flex flex-col items-center select-none overflow-visible"
      style={{ perspective: '1100px' }}
    >
      {/* Dynamic SVG Lanyard Strap Connecting Ceiling Anchor to ID Card Clip */}
      <svg
        viewBox="0 0 400 540"
        className="pointer-events-none absolute inset-0 w-full h-full z-10 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lanyardStrapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#090A0E" />
            <stop offset="50%" stopColor="#161922" />
            <stop offset="100%" stopColor="#0B0D13" />
          </linearGradient>
          <filter id="strapShadow" x="-20%" y="-10%" width="140%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Left & Right Ribbons of the Neck Lanyard Loop converging into the clip */}
        <path
          d={`M ${anchorX - 10} ${anchorY - 25} Q ${ctrlX - 6} ${ctrlY} ${clipX - 3} ${clipY}`}
          fill="none"
          stroke="url(#lanyardStrapGrad)"
          strokeWidth="20"
          strokeLinecap="round"
          filter="url(#strapShadow)"
        />
        <path
          d={`M ${anchorX + 10} ${anchorY - 25} Q ${ctrlX + 6} ${ctrlY} ${clipX + 3} ${clipY}`}
          fill="none"
          stroke="#1B1E28"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Subtle stitched edge highlight on the strap */}
        <path
          d={`M ${anchorX} ${anchorY - 20} Q ${ctrlX} ${ctrlY} ${clipX} ${clipY}`}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Vertical "aditya.dev" branding printed on the black lanyard strap */}
        <g
          transform={`translate(${(anchorX + clipX) / 2}, ${(anchorY + clipY) / 2 - 8}) rotate(${
            strapAngleDeg * 0.65
          })`}
        >
          <text
            x="0"
            y="0"
            fill="rgba(255,255,255,0.68)"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="JetBrains Mono, monospace"
            letterSpacing="0.16em"
            textAnchor="middle"
            transform="rotate(-90)"
          >
            aditya.dev
          </text>
        </g>
      </svg>

      {/* Draggable & Swinging ID Card + Clasp Assembly */}
      <motion.div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          x: springX,
          y: springY,
          rotateZ,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative z-20 mt-[132px] flex flex-col items-center ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } touch-none`}
      >
        {/* Metallic / Matte Black Lanyard Clasp & Hook at Top of Card */}
        <div className="relative flex flex-col items-center -mb-2.5 z-30 pointer-events-none">
          {/* Upper Plastic/Metal Clamp holding the strap */}
          <div className="w-8 h-5 rounded-sm bg-gradient-to-b from-[#2A2E3D] to-[#12151E] border border-white/20 shadow-md flex items-center justify-center">
            <div className="w-4 h-1 rounded-full bg-white/25" />
          </div>
          {/* Metal Swivel Ring */}
          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#94A3B8] -mt-0.5 bg-[#0D0F14]" />
          {/* Lower Clip Tab inserting into card slot */}
          <div className="w-6 h-4 rounded-b-md bg-gradient-to-b from-[#64748B] to-[#334155] border border-white/25 -mt-1 shadow" />
        </div>

        {/* White PVC Badge Holder Frame (Matching Video 0:04 - 0:10) */}
        <div className="relative w-[240px] sm:w-[264px] h-[330px] sm:h-[360px] rounded-[22px] bg-[#F4F4F6] p-2.5 pt-5 shadow-[0_30px_70px_rgba(0,0,0,0.78),0_0_0_1px_rgba(255,255,255,0.22)] flex flex-col justify-between transition-shadow duration-300 hover:shadow-[0_35px_85px_rgba(0,0,0,0.9),0_0_25px_rgba(255,255,255,0.12)]">
          {/* Top Die-Cut Badge Slot Hole */}
          <div className="mx-auto mb-2 w-12 h-2 rounded-full bg-[#161922] shadow-inner border border-black/20" />

          {/* Inner Dark Monochrome Portrait Card */}
          <div className="relative flex-1 w-full rounded-[15px] bg-gradient-to-b from-[#262932] via-[#171920] to-[#0B0C10] overflow-hidden border border-black/15 flex flex-col justify-end">
            {/* Subtle top-left lighting sheen */}
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                background:
                  'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.22) 0%, transparent 60%)',
              }}
            />

            {/* High-Contrast Monochrome Portrait of Aditya Fauzi (Using the exact user photo) */}
            <div className="relative w-full h-[94%] flex items-end justify-center overflow-hidden">
              <ResilientImage
                src={adityaBeachPortraitImg}
                alt="Aditya Fauzi — Digital ID Card"
                fallbackTitle="Aditya Fauzi"
                className="w-full h-full object-contain object-bottom grayscale contrast-125 brightness-105 select-none pointer-events-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
              />
            </div>

            {/* Subtle bottom vignette + ID watermark */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between px-3.5 pb-2.5">
              <span className="font-mono-tabular text-[10px] tracking-wider uppercase text-white/75 font-semibold">
                ADITYA FAUZI
              </span>
              <span className="font-mono-tabular text-[9px] text-white/50">
                S.Kom · 2026
              </span>
            </div>
          </div>

          {/* Glossy PVC Card Reflection Overlay */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-20"
            style={{
              background:
                'linear-gradient(125deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.05) 38%, transparent 50%)',
            }}
          />
        </div>

        {/* Subtle interactive hint below card */}
        <div className="mt-3 text-[10px] font-mono-tabular text-white tracking-widest uppercase">
          {isDragging ? 'Release to swing' : 'Drag ID Card'}
        </div>
      </motion.div>
    </div>
  );
};
