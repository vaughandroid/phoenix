import { readFile, writeFile } from '../util/fileUtils'
import { replaceTokens } from '../util/tokenUtils'
import { REGENERATED_FILE_MARKER } from './project'
import { TokenObject } from './tokenObject'

type CustomiseContentsFn = (contents: string) => string

export interface ProjectFileParams {
  fileName: string
  templatePath?: string
  doNotRegenerate: boolean
  customiseContents?: CustomiseContentsFn
}

export class ProjectFile {
  /** The path of the generated file, relative to the project root. */
  fileName: string
  /** The path of the template file. */
  templatePath?: string
  /**
   * Set to true for files which should only be generated once, when the project is first created.
   */
  doNotRegenerate: boolean
  /** An optional function which can be used to customise the file */
  customise?: CustomiseContentsFn

  constructor(params: ProjectFileParams) {
    this.fileName = params.fileName
    this.templatePath = params.templatePath
    this.regenerate = params.regenerate
    this.customise = params.customiseContents
  }

  regenerateFile(tokens: TokenObject): void {
    let contents = this.templatePath ? readFile(this.templatePath) : '';
    contents = replaceTokens(contents, tokens);
    if (this.customise) {
      contents = this.customise(contents)
    }

    // Sense-check: regenerated files should always include the generated file marker somewhere.
    if (!this.doNotRegenerate) {
      if (!contents.includes(REGENERATED_FILE_MARKER)) {
        throw new Error(
          `Regenerated file ${this.fileName} does not include the generated file marker '${REGENERATED_FILE_MARKER}`,
        )
      }
    }

    writeFile(this.fileName, contents, { readOnly: this.regenerate })
  }
}
