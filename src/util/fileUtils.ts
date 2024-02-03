import fs from 'fs'
import FastGlob from 'fast-glob'

export function readFile(path: string): string {
  return fs.readFileSync(path, 'utf-8')
}

interface WriteFileOptions {
  readOnly?: boolean
}

export function writeFile(
  path: string,
  contents: string,
  opts?: WriteFileOptions,
): void {
  fs.writeFileSync(path, contents)
  if (opts?.readOnly) {
    fs.chmodSync(path, '444')
  }
}

export function deleteFiles(paths: string[]): void {
  paths.forEach((path) => {
    fs.rmSync(path, { force: true, recursive: true })
  })
}

export function findMarkedFiles(marker: string): string[] {
  const allFilePaths = FastGlob.globSync('**', {
    ignore: ['node_modules/**', '.git/**'],
    dot: true, // Include dotfiles
  })

  const generatedFiles: string[] = []
  allFilePaths.forEach((path) => {
    const contents = readFile(path)

    if (contents.includes(marker)) {
      generatedFiles.push(path)
    }
  })

  return generatedFiles
}

export function getAllFilePathsInFolder(folderPath: string): string[] {
  return FastGlob.globSync('**', {
    cwd: folderPath,
    dot: true, // Include dotfiles
  })
}
