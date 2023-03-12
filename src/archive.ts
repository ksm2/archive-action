import archiver from 'archiver';
import fs from 'node:fs';
import path from 'node:path';
import { Format } from './model';

export function archive(format: Format, outputPath: string, rootDir: string, filenames: string[]): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const output = fs.createWriteStream(outputPath);

    const archive = archiver(format === Format.TAR ? 'tar' : 'zip', {
      zlib: { level: 9 }, // Sets the compression level.
    });

    output.on('close', () => {
      console.log(archive.pointer() + ' total bytes');
      resolve();
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);

    for (const filename of filenames) {
      archive.file(path.resolve(rootDir, filename), { name: filename });
    }
    archive.finalize();
  });
}
