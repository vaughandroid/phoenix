import { deleteFiles, findMarkedFiles } from '../util/fileUtils'
import { ProjectFile } from './projectFile'
import { TokenObject } from './tokenObject'

const PHOENIX = 'phoenix'
export const PROJECT_FILENAME = `.${PHOENIX}rc.ts`
// Token replacement is important here to ensure this file doesn't include the marker.
export const REGENERATED_FILE_MARKER = `** Generated by ${PHOENIX} ** To edit, update ${PROJECT_FILENAME} and rebuild the project.`

interface ProjectParams {
  tokens?: Record<string, string>
  projectFiles?: ProjectFile[]
}

export class Project {
  /**
   * The set of tokens which will be replaced during file generation.
   * The key is the token name (without escape characters), and the value is the value which will be used in the generated file.
   */
  tokens: TokenObject
  /** Files which are part of the project. */
  projectFiles: ProjectFile[]

  constructor(params: ProjectParams | undefined = undefined) {
    this.tokens = params?.tokens ?? {}
    this.projectFiles = params?.projectFiles ?? []
  }

  regenerateFiles(): void {
    deleteFiles(findMarkedFiles(GENERATED_FILE_MARKER))
    this.projectFiles.forEach((projectFile) => {
      if (!projectFile.doNotRegenerate) {
        projectFile.regenerateFile({
          regeneratedFileMarker: REGENERATED_FILE_MARKER,
          ...this.tokens,
        })
      }
    })
  }
}
