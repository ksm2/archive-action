import minimatch from 'minimatch';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function getFilesToInclude(rootDir: string, include?: string): Promise<string[]> {
  const files = await getFiles(rootDir);
  const relativeFiles = files.map((file) => path.relative(rootDir, file));
  if (include) {
    return relativeFiles.filter((file) => minimatch(file, include));
  }
  return relativeFiles;
}

async function getFiles(rootDir: string): Promise<string[]> {
  const files = [];
  for await (const base of await fs.readdir(rootDir, { withFileTypes: true })) {
    if (base.isFile()) {
      const file = path.resolve(rootDir, base.name);
      files.push(file);
    } else if (base.isDirectory()) {
      const dir = path.resolve(rootDir, base.name);
      const dirFiles = await getFiles(dir);
      files.push(...dirFiles);
    }
  }
  return files;
}
