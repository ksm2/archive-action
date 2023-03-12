import * as core from '@actions/core';
import archiver from 'archiver';
import path from 'node:path';
import { Format } from './model';

export function archive(format: Format, rootDir: string, filenames: string[]): archiver.Archiver {
  const archive = archiver(format === Format.ZIP ? 'zip' : 'tar', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  core.startGroup('Archived files');
  for (const filename of filenames) {
    core.info(`- ${filename}`);
    archive.file(path.resolve(rootDir, filename), { name: filename });
  }
  core.endGroup();

  archive.finalize();
  return archive;
}
