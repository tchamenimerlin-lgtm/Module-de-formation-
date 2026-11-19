import { ASSETS } from '../data/assets';
import { CHAPTERS } from '../data/chapters';
import { AFRO_HAIRSTYLES, FADE_TYPES } from '../data/fadesAndStyles';

export interface LoadedImage {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
}

/**
 * Returns the deduplicated ordered list of all studio photography asset IDs
 * used across the complete 9-chapter module, 10 fades, and 15 hairstyles.
 */
export function getUniqueModuleAssetIds(): string[] {
  const ordered = new Set<string>();
  ordered.add('heroStation');
  for (const ch of CHAPTERS) {
    ordered.add(ch.heroImageId);
  }
  for (const fade of FADE_TYPES) {
    ordered.add(fade.imageId);
  }
  for (const style of AFRO_HAIRSTYLES) {
    ordered.add(style.imageId);
  }
  ordered.add('toolsKit');
  ordered.add('techniqueLineup');
  ordered.add('beforeAfter');
  return Array.from(ordered).filter((id) => id in ASSETS);
}

async function fetchAndResizeImage(
  assetId: string,
  maxWidth: number,
  jpegQuality: number
): Promise<LoadedImage | null> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  const asset = ASSETS[assetId];
  if (!asset) return null;

  try {
    const response = await fetch(asset.src);
    if (!response.ok) return null;
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error(`Failed to decode image ${assetId}`));
        el.src = objectUrl;
      });

      const scale = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
      const targetW = Math.max(1, Math.round(img.naturalWidth * scale));
      const targetH = Math.max(1, Math.round(img.naturalHeight * scale));

      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.fillStyle = '#F5EFE6';
      ctx.fillRect(0, 0, targetW, targetH);
      ctx.drawImage(img, 0, 0, targetW, targetH);

      const dataUrl = canvas.toDataURL('image/jpeg', jpegQuality);
      return {
        id: assetId,
        dataUrl,
        width: targetW,
        height: targetH,
      };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return null;
  }
}

export async function loadModuleImagesAsDataUrls(
  assetIds: string[],
  options?: {
    maxWidth?: number;
    jpegQuality?: number;
    onProgress?: (loaded: number, total: number) => void;
  }
): Promise<Record<string, LoadedImage>> {
  const maxWidth = options?.maxWidth ?? 640;
  const jpegQuality = options?.jpegQuality ?? 0.82;
  const result: Record<string, LoadedImage> = {};
  const total = assetIds.length;
  let completed = 0;

  // Load in bounded batches of 4 to stay smooth on mobile browsers
  const batchSize = 4;
  for (let i = 0; i < assetIds.length; i += batchSize) {
    const batch = assetIds.slice(i, i + batchSize);
    const loadedBatch = await Promise.all(
      batch.map((id) => fetchAndResizeImage(id, maxWidth, jpegQuality))
    );
    for (const item of loadedBatch) {
      completed += 1;
      if (item) {
        result[item.id] = item;
      }
      options?.onProgress?.(completed, total);
    }
  }

  return result;
}
