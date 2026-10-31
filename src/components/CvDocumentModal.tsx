import React, { useEffect } from 'react';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

interface CvDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_PDF_URL = '/CV_Aditya_Fauzi_Revisi_Dark.pdf';
const CV_PDF_FILENAME = 'CV_Aditya_Fauzi_Revisi_Dark.pdf';

export const CvDocumentModal: React.FC<CvDocumentModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#050505]/85 backdrop-blur-sm overflow-y-auto flex items-start justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white text-[#111111] rounded-2xl border border-[#111111]/20 overflow-hidden my-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar */}
        <div className="no-print flex items-center justify-between gap-3 px-6 py-4 bg-[#111111] text-[#F4F4F0]">
          <div className="text-xs font-mono-tabular text-[#F4F4F0]/80">
            Dokumen Curriculum Vitae Resmi · Aditya Fauzi
          </div>
          <div className="flex items-center gap-2">
            <a
              href={CV_PDF_URL}
              download={CV_PDF_FILENAME}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF CV</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* PDF Document Viewer */}
        <div className="bg-[#525659] p-2 md:p-3">
          <iframe
            src={CV_PDF_URL}
            title="Curriculum Vitae Aditya Fauzi — Revisi Dark"
            className="w-full h-[72vh] md:h-[78vh] rounded-lg bg-white border border-[#111111]/20"
          />
        </div>

        {/* Fallback when the browser cannot embed the PDF */}
        <div className="no-print px-6 py-4 bg-[#F4F4F0] border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#111111]/70">
          <span>Tidak dapat melihat pratinjau PDF?</span>
          <a
            href={CV_PDF_URL}
            download={CV_PDF_FILENAME}
            className="inline-flex items-center gap-1.5 font-semibold text-[#2563EB] hover:underline cursor-pointer whitespace-nowrap"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Download PDF CV
          </a>
        </div>
      </div>
    </div>
  );
};
