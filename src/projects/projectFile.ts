import { readFile } from '../util/fileUtils'
import { replaceTokens } from '../util/tokenUtils'
import { Tokens } from './tokens'

type CustomiseContentsFn = (contents: string) => string

export interface ProjectFileParams {
  templatePath?: string
  customiseContents?: CustomiseContentsFn
}

export class ProjectFile {
  /**
   * Optional path for a file which serves as a template.
   * If this is not defined, a {@link customise} function should be.
   */
  templatePath?: string
  /** An optional function which can be used to customise the file. */
  customise?: CustomiseContentsFn

  constructor(params: ProjectFileParams) {
    this.templatePath = params.templatePath
    this.customise = params.customiseContents
  }

  getFileContents(tokens: Tokens): string {
    let contents = this.templatePath ? readFile(this.templatePath) : ''
    contents = replaceTokens(contents, tokens)
    if (this.customise) {
      contents = this.customise(contents)
    }

    return contents
  }
}
