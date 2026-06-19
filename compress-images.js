import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const QUALITY = 75; // JPEG quality (0-100) - more aggressive
const PNG_QUALITY = 80; // PNG quality (0-100) - more aggressive
const MAX_WIDTH = 1800; // Max width for images - reduced
const MAX_HEIGHT = 1800; // Max height for images - reduced
const TARGET_SIZE_MB = 1; // Target max file size in MB

// Directories to process
const directories = [
  'public',
  'public/anderson-basement',
  'public/avondale',
  'public/fox-croft-photos',
  'public/okun-photos',
  'public/project-stone-creek',
  'public/new-builds',
  'public/pharoah-kitchen',
  'public/homepage-paralax-images',
  'public/home-gallery',
  'public/team-pics'
];

async function compressImage(inputPath, outputPath) {
  try {
    const inputStats = await fs.stat(inputPath);
    const inputSizeMB = inputStats.size / 1024 / 1024;
    
    // Skip if already under 1MB
    if (inputSizeMB < TARGET_SIZE_MB) {
      console.log(`Skipping: ${path.basename(inputPath)} (${inputSizeMB.toFixed(2)}MB - already under target)`);
      return null;
    }

    const info = await sharp(inputPath).metadata();
    console.log(`Processing: ${path.basename(inputPath)} (${info.width}x${info.height}, ${inputSizeMB.toFixed(2)}MB)`);

    const ext = path.extname(inputPath).toLowerCase();
    const isPng = ext === '.png';
    
    let sharpInstance = sharp(inputPath)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });

    if (isPng) {
      // Convert PNG to JPEG for better compression (unless it has transparency)
      if (info.hasAlpha) {
        sharpInstance = sharpInstance.png({ 
          quality: PNG_QUALITY, 
          compressionLevel: 9,
          effort: 10
        });
      } else {
        // Convert to JPEG for smaller file size
        const newOutputPath = outputPath.replace(/\.png$/i, '.jpg');
        sharpInstance = sharpInstance.jpeg({ 
          quality: QUALITY, 
          progressive: true,
          mozjpeg: true
        });
        outputPath = newOutputPath;
      }
    } else {
      sharpInstance = sharpInstance.jpeg({ 
        quality: QUALITY, 
        progressive: true,
        mozjpeg: true
      });
    }

    await sharpInstance.toFile(outputPath);

    const outputStats = await fs.stat(outputPath);
    const savedPercent = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    const outputSizeMB = outputStats.size / 1024 / 1024;
    
    console.log(`  ✓ Saved ${savedPercent}% (${inputSizeMB.toFixed(2)}MB → ${outputSizeMB.toFixed(2)}MB)`);
    
    return {
      original: inputStats.size,
      compressed: outputStats.size,
      saved: inputStats.size - outputStats.size,
      outputPath: outputPath,
      inputPath: inputPath
    };
  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  console.log(`\n📁 Processing directory: ${dir}`);
  
  let files;
  try {
    files = await fs.readdir(dir);
  } catch (error) {
    console.log(`  ⚠️  Skipping ${dir}: ${error.message}`);
    return { totalOriginal: 0, totalCompressed: 0, processedCount: 0 };
  }
  
  const imageFiles = files.filter(f => {
    const lower = f.toLowerCase();
    return (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png')) 
      && !f.startsWith('temp_');
  });
  
  let totalOriginal = 0;
  let totalCompressed = 0;
  let processedCount = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(dir, file);
    
    // Check if it's a file (not a directory)
    const stat = await fs.stat(inputPath);
    if (!stat.isFile()) continue;
    
    const ext = path.extname(file);
    const tempPath = path.join(dir, `temp_${file}`);
    
    const result = await compressImage(inputPath, tempPath);
    
    if (result) {
      // Replace original with compressed version
      await fs.unlink(inputPath);
      await fs.rename(result.outputPath, result.outputPath.replace('temp_', ''));
      
      // If PNG was converted to JPG, delete the original PNG
      if (result.outputPath !== tempPath) {
        // Already handled above
      }
      
      totalOriginal += result.original;
      totalCompressed += result.compressed;
      processedCount++;
    }
  }

  if (processedCount === 0) {
    console.log(`   No images over ${TARGET_SIZE_MB}MB found in ${dir}`);
  } else {
    const totalSaved = totalOriginal - totalCompressed;
    const percentSaved = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

    console.log(`\n✅ Completed ${dir}`);
    console.log(`   Processed: ${processedCount} images`);
    console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)}MB`);
    console.log(`   Saved: ${(totalSaved / 1024 / 1024).toFixed(2)}MB (${percentSaved}%)`);
  }

  return { totalOriginal, totalCompressed, processedCount };
}

async function main() {
  console.log('🖼️  Image Compression Script');
  console.log('━'.repeat(50));
  console.log(`Target: Files over ${TARGET_SIZE_MB}MB`);
  console.log(`JPEG Quality: ${QUALITY}%`);
  console.log(`PNG Quality: ${PNG_QUALITY}%`);
  console.log(`Max dimensions: ${MAX_WIDTH}x${MAX_HEIGHT}px`);
  console.log('━'.repeat(50));

  let grandTotalOriginal = 0;
  let grandTotalCompressed = 0;
  let grandTotalProcessed = 0;

  for (const dir of directories) {
    const stats = await processDirectory(dir);
    grandTotalOriginal += stats.totalOriginal;
    grandTotalCompressed += stats.totalCompressed;
    grandTotalProcessed += stats.processedCount;
  }

  const grandTotalSaved = grandTotalOriginal - grandTotalCompressed;
  const grandPercentSaved = grandTotalOriginal > 0 
    ? ((grandTotalSaved / grandTotalOriginal) * 100).toFixed(1) 
    : 0;

  console.log('\n' + '━'.repeat(50));
  console.log('🎉 ALL DONE!');
  console.log('━'.repeat(50));
  console.log(`Total images processed: ${grandTotalProcessed}`);
  console.log(`Total original size: ${(grandTotalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total compressed size: ${(grandTotalCompressed / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total saved: ${(grandTotalSaved / 1024 / 1024).toFixed(2)}MB (${grandPercentSaved}%)`);
  console.log('━'.repeat(50));
}

main().catch(console.error);
