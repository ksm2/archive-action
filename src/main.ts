import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { archive } from './archive';
import { compress } from './compress';
import { getInputs, setFailed, setOutputs } from './github';
import { getFilesToInclude } from './io';

async function main() {
  const { rootDir, include, format, name } = getInputs();
  const filenames = await getFilesToInclude(rootDir, include);

  const outputPath = path.resolve(process.cwd(), `${name}.${format}`);
  const archiver = await archive(format, rootDir, filenames);

  const output = fs.createWriteStream(outputPath);
  const compressor = compress(format);
  await pipeline(archiver, compressor, output);

  setOutputs({ path: outputPath });
}

main().catch((error) => {
  setFailed(error);
});
