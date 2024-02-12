import { readFile } from '../util/fileUtils'
import { replaceTokens } from '../util/tokenUtils'
import { Tokens } from './tokens'

type CustomiseTextFn = (contents: string) => string
type CustomiseJsonFn = (json: any) => any

export interface ProjectFileParams {
  templatePath?: string
  customiseContents?: CustomiseTextFn
}

export class ProjectFile {
  static textFileFromTemplate(
    templatePath: string,
    customiseContents?: CustomiseTextFn,
  ): ProjectFile {
    return new ProjectFile({ templatePath, customiseContents })
  }

  static textFileFromScratch(
    contentsOrCustomiseContentsFn: CustomiseTextFn | string,
  ): ProjectFile {
    const customiseContents =
      typeof contentsOrCustomiseContentsFn === 'function'
        ? contentsOrCustomiseContentsFn
        : () => contentsOrCustomiseContentsFn
    return new ProjectFile({ customiseContents })
  }

  static jsonFileFromTemplate(
    templatePath: string,
    customiseJson: CustomiseJsonFn | undefined = undefined,
  ): ProjectFile {
    const customiseContents = customiseJson
      ? customiseJsonContents(customiseJson)
      : undefined
    return new ProjectFile({ templatePath, customiseContents })
  }

  static jsonFileFromScratch(
    contentsOrCustomiseJsonFn: CustomiseJsonFn | any,
  ): ProjectFile {
    const customiseContents =
      typeof contentsOrCustomiseJsonFn === 'function'
        ? contentsOrCustomiseJsonFn
        : () => contentsOrCustomiseJsonFn
    customiseJsonContents(contentsOrCustomiseJsonFn)
    return new ProjectFile({ customiseContents })
  }

  /**
   * Optional path for a file which serves as a template.
   * If this is not defined, a {@link customiseContents} function should be.
   */
  templatePath?: string
  /**
   * An optional function which can be used to customise the file.
   * This is called after token replacement has been performed.
   */
  customiseContents?: CustomiseTextFn

  constructor(params: ProjectFileParams) {
    this.templatePath = params.templatePath
    this.customiseContents = params.customiseContents
  }

  getFileContents(tokens: Tokens): string {
    let contents = this.templatePath ? readFile(this.templatePath) : ''

    contents = replaceTokens(contents, tokens)

    if (this.customiseContents) {
      contents = this.customiseContents(contents)
    }

    return contents
  }
}

export function customiseJsonContents(
  customiseJson: CustomiseJsonFn,
): CustomiseTextFn {
  return (contents: string) => {
    let jsonContents = JSON.parse(contents)
    jsonContents = customiseJson(jsonContents)
    return JSON.stringify(jsonContents, undefined, 2)
  }
}
