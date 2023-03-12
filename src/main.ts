import path from 'node:path';
import { archive } from './archive';
import { getInputs, setFailed, setOutputs } from './github';
import { getFilesToInclude } from './io';

async function main() {
  const { rootDir, include, format, name } = getInputs();
  const filenames = await getFilesToInclude(rootDir, include);

  const outputPath = path.resolve(process.cwd(), `${name}.${format}`);
  await archive(format, outputPath, rootDir, filenames);

  setOutputs({ path: outputPath });
}

main().catch((error) => {
  setFailed(error);
});
