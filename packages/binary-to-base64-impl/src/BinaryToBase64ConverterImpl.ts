import { BinaryToBase64Converter } from '@repo/binary-to-base64/BinaryToBase64Converter';

export class BinaryToBase64ConverterImpl implements BinaryToBase64Converter {
  convert(binary: Uint8Array) {
    // Without chunking, bta won't work
    return btoa(chunkBinary(binary));
  }
}

function chunkBinary(binary: Uint8Array) {
  const CHUNK_SZ = 0x8000;
  const c = [];
  for (let i = 0; i < binary.length; i += CHUNK_SZ) {
    c.push(String.fromCharCode.apply(null, binary.subarray(i, i + CHUNK_SZ) as any));
  }
  return c.join('');
}
