import { Archiver } from 'archiver';
import { PipelineTransform } from 'node:stream';
import { createGzip } from 'node:zlib';
import { Format } from './model';

export function compress(format: Format): PipelineTransform<Archiver, Uint8Array> {
  if (format === Format.TAR_GZ) {
    return createGzip();
  } else {
    return id;
  }
}

async function* id(chunks: AsyncIterable<Uint8Array>): AsyncIterable<Uint8Array> {
  for await (const chunk of chunks) {
    yield chunk;
  }
}
