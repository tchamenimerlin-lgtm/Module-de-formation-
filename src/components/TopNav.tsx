import React, { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { NavView } from '../types/academy';
import { BrandMark } from './BrandMark';

interface TopNavProps {
  activeView: NavView;
  onNavigate: (view: NavView) => void;
}

const PRIMARY_NAV_ITEMS: Array<{ id: NavView; label: string }> = [
  { id: 'home', label: 'Accueil' },
  { id: 'program', label: 'Programme' },
  { id: 'course', label: 'Cours' },
  { id: 'gallery', label: 'Galerie' },
  { id: 'tools', label: 'Matériel' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'progress', label: 'Progression' },
];

export const TopNav: React.FC<TopNavProps> = ({ activeView, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSelect = (view: NavView) => {
    onNavigate(view);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#E2D8C8] bg-white/95 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          aria-label="Accueil Notorious Barber Academy"
          className="text-left focus-visible:rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
        >
          <BrandMark />
        </button>

        {/* Zone 2: Clean single-line text links */}
        <nav
          aria-label="Navigation principale"
          className="hidden lg:flex items-center gap-6"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#111111] font-semibold'
                    : 'text-[#5C554B] hover:text-[#111111]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[19px] h-[2px] bg-[#111111]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('resources')}
            aria-label="Télécharger le module complet"
            aria-current={activeView === 'resources' ? 'page' : undefined}
            className={`hidden sm:inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'resources'
                ? 'bg-[#292622] text-white'
                : 'bg-[#111111] text-white hover:bg-[#292622]'
            }`}
          >
            <Download className="h-3.5 w-3.5 text-[#E8DEC8]" aria-hidden="true" />
            <span>Télécharger</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            className="inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-md border border-[#E2D8C8] bg-[#FAF8F4] text-[#111111] hover:bg-[#F5EFE6] transition-colors cursor-pointer"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Menu mobile"
          className="lg:hidden border-t border-[#E2D8C8] bg-[#FAF8F4] px-4 py-4"
        >
          <div className="flex flex-col gap-1">
            {[
              ...PRIMARY_NAV_ITEMS,
              { id: 'resources' as NavView, label: 'Télécharger le module complet' },
            ].map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex min-h-[44px] items-center justify-between rounded-md px-3.5 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#111111] text-white font-semibold'
                      : 'text-[#2E2A25] hover:bg-[#ECE3D5]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-mono-tabular text-[#E8DEC8]">Actif</span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};
