import React, { useState, useRef, MouseEvent, TouchEvent } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  originalImage: string;
  resultImage: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  originalImage,
  resultImage,
  className = '',
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPos(pos);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      className={`relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden select-none cursor-ew-resize border border-[#27272A] shadow-2xl ${className}`}
    >
      {/* Background Image: Transformed AI Output over Brand Checkerboard */}
      <div className="absolute inset-0 bg-checkerboard flex items-center justify-center">
        <img
          src={resultImage}
          alt="After Background Removal"
          className="w-full h-full object-contain p-2"
        />
        {/* After Pill Badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-[#22D3EE]/40 text-xs font-bold text-[#22D3EE] flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
          After (Clippix AI)
        </div>
      </div>

      {/* Foreground Image: Original Image clipped to sliderPos % width */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden bg-[#09090B] flex items-center justify-center"
        style={{ width: `${sliderPos}%` }}
      >
        <div className="absolute top-0 bottom-0 left-0 w-full flex items-center justify-center">
          <img
            src={originalImage}
            alt="Original Before"
            className="max-w-none w-full h-full object-contain p-2"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          />
        </div>
        {/* Before Pill Badge */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#18181B]/90 backdrop-blur-md border border-[#27272A] text-xs font-bold text-[#A1A1AA] shadow-lg">
          Before
        </div>
      </div>

      {/* Draggable Vertical Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-1 bg-gradient-to-b from-[#7C3AED] via-[#3B82F6] to-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#18181B] border-2 border-[#22D3EE] shadow-[0_0_20px_rgba(124,58,237,0.6)] flex items-center justify-center text-white">
          <MoveHorizontal className="w-5 h-5 text-[#22D3EE]" />
        </div>
      </div>
    </div>
  );
};
