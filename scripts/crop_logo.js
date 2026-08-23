const fs = require('fs');
const zlib = require('zlib');

function cropPNG(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) return false;
  const buf = fs.readFileSync(inputPath);
  
  if (buf.readUInt32BE(0) !== 0x89504E47 || buf.readUInt32BE(4) !== 0x0D0A1A0A) {
    console.log(`Skipping non-PNG: ${inputPath}`);
    return false;
  }

  let offset = 8;
  let width, height, bitDepth, colorType;
  const idatChunks = [];

  while (offset < buf.length) {
    const length = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    const data = buf.slice(offset + 8, offset + 8 + length);
    offset += 12 + length;

    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    }
  }

  if (colorType !== 6 || bitDepth !== 8) {
    console.log(`Unsupported colorType ${colorType} for ${inputPath}`);
    return false;
  }

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  const bytesPerPixel = 4;
  const stride = width * bytesPerPixel;
  const rawImage = Buffer.alloc(width * height * bytesPerPixel);

  let srcPos = 0;
  for (let y = 0; y < height; y++) {
    const filterType = decompressed[srcPos++];
    const prevRowOffset = y > 0 ? (y - 1) * stride : -1;
    const currRowOffset = y * stride;

    for (let x = 0; x < stride; x++) {
      const rawByte = decompressed[srcPos++];
      const left = x >= bytesPerPixel ? rawImage[currRowOffset + x - bytesPerPixel] : 0;
      const up = prevRowOffset >= 0 ? rawImage[prevRowOffset + x] : 0;
      const upLeft = prevRowOffset >= 0 && x >= bytesPerPixel ? rawImage[prevRowOffset + x - bytesPerPixel] : 0;

      let val = 0;
      if (filterType === 0) val = rawByte;
      else if (filterType === 1) val = (rawByte + left) & 0xFF;
      else if (filterType === 2) val = (rawByte + up) & 0xFF;
      else if (filterType === 3) val = (rawByte + Math.floor((left + up) / 2)) & 0xFF;
      else if (filterType === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr = left;
        if (pb < pa && pb < pc) pr = up;
        else if (pc < pa) pr = upLeft;
        val = (rawByte + pr) & 0xFF;
      }
      rawImage[currRowOffset + x] = val;
    }
  }

  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = rawImage[(y * width + x) * 4 + 3];
      if (alpha > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (minX >= maxX || minY >= maxY) {
    console.log(`No non-transparent pixels found in ${inputPath}`);
    return false;
  }

  minX = Math.max(0, minX - 4);
  minY = Math.max(0, minY - 4);
  maxX = Math.min(width - 1, maxX + 4);
  maxY = Math.min(height - 1, maxY + 4);

  const croppedWidth = maxX - minX + 1;
  const croppedHeight = maxY - minY + 1;

  const croppedScanlines = Buffer.alloc(croppedHeight * (1 + croppedWidth * 4));
  let cropPos = 0;

  for (let y = minY; y <= maxY; y++) {
    croppedScanlines[cropPos++] = 0;
    for (let x = minX; x <= maxX; x++) {
      const idx = (y * width + x) * 4;
      croppedScanlines[cropPos++] = rawImage[idx];
      croppedScanlines[cropPos++] = rawImage[idx + 1];
      croppedScanlines[cropPos++] = rawImage[idx + 2];
      croppedScanlines[cropPos++] = rawImage[idx + 3];
    }
  }

  const newIdatData = zlib.deflateSync(croppedScanlines);

  function crc32(buf) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function makeChunk(type, data) {
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const crc = crc32(Buffer.concat([typeBuf, data]));
    crcBuf.writeUInt32BE(crc, 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(croppedWidth, 0);
  ihdrData.writeUInt32BE(croppedHeight, 4);
  ihdrData[8] = 8;
  ihdrData[9] = 6;
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;

  const outPNG = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', newIdatData),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);

  fs.writeFileSync(outputPath, outPNG);
  console.log(`Cropped ${inputPath} (${width}x${height}) -> ${outputPath} (${croppedWidth}x${croppedHeight})`);
  return true;
}

cropPNG('public/logo.png', 'public/logo-cropped.png');
cropPNG('public/logo-white.png', 'public/logo-white-cropped.png');
cropPNG('public/main-logo.png', 'public/main-logo-cropped.png');
