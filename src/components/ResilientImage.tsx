import React, { useState } from 'react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Sistem Informasi Web',
  fallbackSubtitle = 'PHP CodeIgniter · MySQL · UML Architecture',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col justify-between p-6 bg-gradient-to-br from-[#1C1D21] via-[#26282E] to-[#111111] text-[#F4F4F0] ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono-tabular text-white/60">
            {fallbackSubtitle}
          </span>
          <span className="text-xs font-mono-tabular text-white/40">MVC · 3NF</span>
        </div>
        <div className="my-auto py-6">
          <p className="font-editorial italic text-2xl text-white/90">
            {fallbackTitle}
          </p>
          <p className="mt-1 text-xs text-white/60 max-w-md">{alt}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-xs font-mono-tabular text-white/50">
          <span>Use Case · Activity</span>
          <span>Sequence · Class</span>
          <span className="text-right">Black Box Validated</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
};
