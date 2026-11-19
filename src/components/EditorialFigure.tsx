import React, { useState } from 'react';
import { Scissors } from 'lucide-react';
import { getAsset } from '../data/assets';

interface EditorialFigureProps {
  assetId: string;
  captionOverride?: string;
  aspectClass?: string;
  priority?: boolean;
  hideCaption?: boolean;
}

export const EditorialFigure: React.FC<EditorialFigureProps> = ({
  assetId,
  captionOverride,
  aspectClass = 'aspect-[4/3]',
  priority = false,
  hideCaption = false,
}) => {
  const asset = getAsset(assetId);
  const [failed, setFailed] = useState(false);

  const rawCaption = captionOverride ?? asset.caption;
  const figMatch = rawCaption.match(/^(Fig\.\s+[0-9a-zA-Z.]+)\s*[—–-]\s*(.*)$/i);
  const displayCode = figMatch ? figMatch[1] : asset.figureCode;
  const displayText = figMatch ? figMatch[2] : rawCaption;

  return (
    <figure className="w-full">
      <div
        className={`relative w-full overflow-hidden rounded-lg bg-[#F5EFE6] border border-[#E2D8C8] ${aspectClass}`}
      >
        {!failed ? (
          <img
            src={asset.src}
            alt={asset.alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F5EFE6] to-[#ECE3D5] p-6 text-center">
            <Scissors className="h-7 w-7 text-[#7D6340]" aria-hidden="true" />
            <p className="text-xs font-medium text-[#5C554B] max-w-xs">{asset.alt}</p>
          </div>
        )}
      </div>
      {!hideCaption && (
        <figcaption className="mt-2.5 text-xs leading-relaxed text-[#5C554B]">
          <span className="font-mono-tabular font-semibold text-[#7D6340] mr-1.5">
            {displayCode}
          </span>
          <span>— {displayText}</span>
        </figcaption>
      )}
    </figure>
  );
};
