/**
 * Pure TypeScript PKZIP (Store / Method 0) archive builder with standard IEEE 802.3 CRC-32.
 * Zero external dependencies — works identically in browsers and Node.js.
 */

export interface ZipEntryInput {
  name: string;
  data: Uint8Array | string;
  date?: Date;
}

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) !== 0 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

export function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function toDosTimeDate(date: Date): { dosTime: number; dosDate: number } {
  const year = Math.max(1980, Math.min(2107, date.getFullYear()));
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosTime = ((hours & 0x1f) << 11) | ((minutes & 0x3f) << 5) | (seconds & 0x1f);
  const dosDate = (((year - 1980) & 0x7f) << 9) | ((month & 0x0f) << 5) | (day & 0x1f);
  return { dosTime, dosDate };
}

export function createZipArchive(entries: ZipEntryInput[]): Uint8Array {
  const encoder = new TextEncoder();

  interface PreparedEntry {
    nameBytes: Uint8Array;
    dataBytes: Uint8Array;
    crc: number;
    dosTime: number;
    dosDate: number;
    localHeaderOffset: number;
  }

  const prepared: PreparedEntry[] = [];
  let offset = 0;

  for (const entry of entries) {
    const cleanName = entry.name.replace(/^\/+/, '');
    const nameBytes = encoder.encode(cleanName);
    const dataBytes =
      typeof entry.data === 'string' ? encoder.encode(entry.data) : entry.data;
    const crc = crc32(dataBytes);
    const { dosTime, dosDate } = toDosTimeDate(entry.date ?? new Date());

    prepared.push({
      nameBytes,
      dataBytes,
      crc,
      dosTime,
      dosDate,
      localHeaderOffset: offset,
    });

    offset += 30 + nameBytes.length + dataBytes.length;
  }

  const centralDirectoryStart = offset;
  let centralDirectorySize = 0;
  for (const item of prepared) {
    centralDirectorySize += 46 + item.nameBytes.length;
  }

  const totalSize = centralDirectoryStart + centralDirectorySize + 22;
  const output = new Uint8Array(totalSize);
  const view = new DataView(output.buffer);

  // 1. Local file headers + file data
  let cursor = 0;
  for (const item of prepared) {
    view.setUint32(cursor, 0x04034b50, true); // Local file header signature PK\x03\x04
    view.setUint16(cursor + 4, 20, true); // Version needed to extract (2.0)
    view.setUint16(cursor + 6, 0x0800, true); // General purpose bit flag: UTF-8 filename
    view.setUint16(cursor + 8, 0, true); // Compression method: 0 (Store)
    view.setUint16(cursor + 10, item.dosTime, true);
    view.setUint16(cursor + 12, item.dosDate, true);
    view.setUint32(cursor + 14, item.crc, true);
    view.setUint32(cursor + 18, item.dataBytes.length, true); // Compressed size
    view.setUint32(cursor + 22, item.dataBytes.length, true); // Uncompressed size
    view.setUint16(cursor + 26, item.nameBytes.length, true);
    view.setUint16(cursor + 28, 0, true); // Extra field length
    cursor += 30;

    output.set(item.nameBytes, cursor);
    cursor += item.nameBytes.length;

    output.set(item.dataBytes, cursor);
    cursor += item.dataBytes.length;
  }

  // 2. Central directory records
  for (const item of prepared) {
    view.setUint32(cursor, 0x02014b50, true); // Central directory signature PK\x01\x02
    view.setUint16(cursor + 4, 20, true); // Version made by
    view.setUint16(cursor + 6, 20, true); // Version needed
    view.setUint16(cursor + 8, 0x0800, true); // UTF-8 flag
    view.setUint16(cursor + 10, 0, true); // Store method
    view.setUint16(cursor + 12, item.dosTime, true);
    view.setUint16(cursor + 14, item.dosDate, true);
    view.setUint32(cursor + 16, item.crc, true);
    view.setUint32(cursor + 20, item.dataBytes.length, true);
    view.setUint32(cursor + 24, item.dataBytes.length, true);
    view.setUint16(cursor + 28, item.nameBytes.length, true);
    view.setUint16(cursor + 30, 0, true); // Extra field length
    view.setUint16(cursor + 32, 0, true); // File comment length
    view.setUint16(cursor + 34, 0, true); // Disk number start
    view.setUint16(cursor + 36, 0, true); // Internal file attributes
    view.setUint32(cursor + 38, 0, true); // External file attributes
    view.setUint32(cursor + 42, item.localHeaderOffset, true);
    cursor += 46;

    output.set(item.nameBytes, cursor);
    cursor += item.nameBytes.length;
  }

  // 3. End of central directory record
  view.setUint32(cursor, 0x06054b50, true); // EOCD signature PK\x05\x06
  view.setUint16(cursor + 4, 0, true); // Number of this disk
  view.setUint16(cursor + 6, 0, true); // Disk where central directory starts
  view.setUint16(cursor + 8, prepared.length, true); // Entries on this disk
  view.setUint16(cursor + 10, prepared.length, true); // Total entries
  view.setUint32(cursor + 12, centralDirectorySize, true);
  view.setUint32(cursor + 16, centralDirectoryStart, true);
  view.setUint16(cursor + 20, 0, true); // ZIP comment length

  return output;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2).replace('.', ',')} Mo`;
}
