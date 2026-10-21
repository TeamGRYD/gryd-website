// Generates raster icons from public/favicon.svg (run once: node scripts/icons.mjs)
import fs from 'node:fs';
import { Resvg } from '@resvg/resvg-js';
const svg = fs.readFileSync('public/favicon.svg', 'utf8');
const png = (size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
fs.writeFileSync('public/apple-touch-icon.png', png(180));
fs.writeFileSync('public/icon-192.png', png(192));
fs.writeFileSync('public/icon-512.png', png(512));
fs.writeFileSync('public/logo.png', png(512));
// ICO containing a single 32px PNG
const p32 = png(32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header.writeUInt8(32, 6); header.writeUInt8(32, 7); header.writeUInt8(0, 8); header.writeUInt8(0, 9);
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12); header.writeUInt32LE(p32.length, 14); header.writeUInt32LE(22, 18);
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, p32]));
console.log('icons written');
