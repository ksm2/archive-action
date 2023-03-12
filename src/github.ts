import * as core from '@actions/core';
import path from 'node:path';
import { Format, Inputs, Outputs } from './model';

export function getInputs(): Inputs {
  const rootDir = path.resolve(process.cwd(), core.getInput('root-directory'));
  const include = core.getInput('include');
  const format = getFormat();
  const name = core.getInput('name', { required: true });

  return { rootDir, include, format, name };
}

function getFormat(): Format {
  const format = core.getInput('format', { required: true });
  if (Object.values(Format).includes(format as Format)) {
    return format as Format;
  }

  throw new Error(`Invalid format: ${format}`);
}

export function setOutputs(outputs: Outputs): void {
  console.dir(outputs);
  core.setOutput('path', outputs.path);
}

export function setFailed(error: unknown): void {
  if (error instanceof Error) {
    core.setFailed(error.message);
  } else {
    core.setFailed(String(error));
  }
}
