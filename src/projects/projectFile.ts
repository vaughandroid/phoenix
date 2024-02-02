import { readFile } from '../util/fileUtils'
import { replaceTokens } from '../util/tokenUtils'
import { Tokens } from './tokens'

type CustomiseContentsFn = (contents: string) => string
type CustomiseJsonFn = (json: any) => any

export interface ProjectFileParams {
  templatePath?: string
  customiseContents?: CustomiseContentsFn
}

export class ProjectFile {
  static fromTemplate(
    templatePath: string,
    customiseContents?: CustomiseContentsFn,
  ): ProjectFile {
    return new ProjectFile({ templatePath, customiseContents })
  }

  static fromJsonTemplate(
    templatePath: string,
    customiseJson: CustomiseJsonFn | undefined = undefined,
  ): ProjectFile {
    const customiseContents = customiseJson
      ? createCustomiseJsonFn(customiseJson)
      : undefined
    return new ProjectFile({ templatePath, customiseContents })
  }

  static textFileFromScratch(
    customiseContents: CustomiseContentsFn,
  ): ProjectFile {
    return new ProjectFile({ customiseContents })
  }

  static jsonFileFromScratch(customiseJson: CustomiseJsonFn): ProjectFile {
    return new ProjectFile({
      customiseContents: createCustomiseJsonFn(customiseJson),
    })
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
  customiseContents?: CustomiseContentsFn

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

function createCustomiseJsonFn(
  customiseJson: CustomiseJsonFn,
): CustomiseContentsFn {
  return (contents: string) => {
    console.log(contents)
    let jsonContents = JSON.parse(contents)
    console.log(jsonContents)
    jsonContents = customiseJson(jsonContents)
    return JSON.stringify(jsonContents, undefined, 2)
  }
}
