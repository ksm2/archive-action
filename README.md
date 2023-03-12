archive
=======

Creates ZIP and TAR archives on Linux, Windows and macOS.


## Usage

See [action.yml](action.yml)

### Create an archive including the whole working directory

```yaml
uses: ksm2/archive-action@v1
with:
  format: "tar.gz"
  name: my-bundle
```

### Create an archive using specific files

```yaml
uses: ksm2/archive-action@v1
with:
  format: "tar.gz"
  name: my-bundle
  include: "**/*.(ts|js|css|html)"
```

### Create an archive from a specific root directory

```yaml
uses: ksm2/archive-action@v1
with:
  root-directory: dist
  format: "tar.gz"
  name: my-bundle
  include: "*.(ts|js|css|html)"
```

### Create multiple archives using a Matrix Strategy

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        archive: [ "zip", "tar" ]
    steps:
      - uses: actions/checkout@v3
      - uses: ksm2/archive-action@v1
        with:
          format: ${{ matrix.archive }}
          name: my-bundle
          include: "**/*.(ts|js|css|html)"
```

### Upload an archive as a release artifact

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    
    steps:
      - uses: actions/checkout@v3

      - uses: actions/create-release@v1
        id: create_release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: "v1.0.0"
          release_name: "My Release"
          draft: true
          prerelease: false

      - uses: ksm2/archive-action@v1
        id: archive
        with:
          format: "zip"
          name: my-bundle
          include: "**/*.(ts|js|css|html)"

      - uses: actions/upload-release-asset@v1.0.1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ${{ steps.archive.outputs.path }}
          asset_name: ${{ steps.archive.outputs.name }}
          asset_content_type: ${{ steps.archive.outputs.media-type }}
```


## Inputs

### `format`

**Required** The archive format to use. Default `"zip"`.

Available Options:
- `"zip"`
- `"tar"`
- `"tar.gz"`

### `name`

**Required** The name of the archive to produce.

The file ending for the archive will be attached.

### `root-directory`

The directory to package files from. Default is the working directory.

### `include`

An optional glob pattern to only include specific files.
Uses [Minimatch] for applying the pattern.
Default is to include all files found in the directory.


## Outputs

### `name`

The basename of the produced archive, e.g. `"my-bundle.tar.gz"`.

### `path`

The absolute path of the produced archive, e.g. `"/path/to/my-bundle.tar.gz"`.

### `media-type`

The media type of the produced archive, e.g. `"application/zip"`.


[Minimatch]: https://www.npmjs.com/package/minimatch
