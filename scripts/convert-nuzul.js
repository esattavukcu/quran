#!/usr/bin/env node
/**
 * Mevcut nuzul.json'u per-surah dosyalara donusturur.
 * Her dosya { surah: "...", verses: {} } formatinda olur.
 */
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'data', 'nuzul.json');
const outputDir = path.join(__dirname, '..', 'public', 'data', 'nuzul');

const data = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (let i = 1; i <= 114; i++) {
  const surahNuzul = data[String(i)] || '';
  const output = {
    surah: surahNuzul,
    verses: {}
  };
  const outPath = path.join(outputDir, `${i}.json`);
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
}

console.log('114 surah nuzul dosyasi olusturuldu.');
