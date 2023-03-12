export enum Format {
  ZIP = 'zip',
  TAR = 'tar',
}

export interface Inputs {
  rootDir: string
  include?: string
  format: Format
  name: string
}

export interface Outputs {
  path: string
}
