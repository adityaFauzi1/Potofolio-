import React from 'react';

interface PortfolioArcBackgroundProps {
  /** Tampilkan layer grid blueprint. Default: true. */
  showGrid?: boolean;
  /** Tampilkan layer aksen radial biru. Default: true. */
  showAccent?: boolean;
}

/**
 * Backdrop kontinu untuk wilayah "Showcase → Mari Berdiskusi".
 *
 * Dirancang agar senada dengan konten terang (teks gelap) yang sudah ada:
 *   1) Grid blueprint tipis bergaya denah sistem
 *   2) Aksen radial biru lembut ( PHP/CodeIgniter/MySQL blueprint )
 *
 * Seluruh pewarnaan punya varian `html.dark` di index.css sehingga tetap
 * terbaca baik pada mode terang maupun gelap.
 */
export const PortfolioArcBackground: React.FC<PortfolioArcBackgroundProps> = ({
  showGrid = true,
  showAccent = true,
}) => {
  return (
    <div className="arc-bg-root" aria-hidden="true">
      {/* Scrim menjaga kontras teks gelap di atas grid */}
      <div className="arc-bg-scrim" />

      {showGrid && <div className="arc-bg-grid" />}

      {showAccent && <div className="arc-bg-accent" />}
    </div>
  );
};

