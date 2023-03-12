export enum Format {
  ZIP = 'zip',
  TAR = 'tar',
  TAR_GZ = 'tar.gz',
}

export interface Inputs {
  rootDir: string;
  include?: string;
  format: Format;
  name: string;
}

export interface Outputs {
  name: string;
  path: string;
  mediaType: string;
}

export function getMediaType(format: Format): string {
  switch (format) {
    case Format.TAR: {
      return 'application/tar';
    }
    case Format.TAR_GZ: {
      return 'application/tar+gzip';
    }
    case Format.ZIP: {
      return 'application/zip';
    }
  }
}
