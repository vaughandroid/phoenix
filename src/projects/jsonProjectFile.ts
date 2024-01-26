import { ProjectFile, ProjectFileParams } from './projectFile'

export type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json }

type CustomiseJsonFn = (json: Json) => Json

export interface JsonProjectFileParams
  extends Omit<ProjectFileParams, 'customiseContents'> {
  customiseJson?: CustomiseJsonFn
}

export class JsonProjectFile extends ProjectFile {
  /** An optional function which can be used to customise JSON file contents. */
  customiseJson?: CustomiseJsonFn

  constructor(params: JsonProjectFileParams) {
    super({
      ...params,
      customiseContents: (contents: string) => {
        if (this.customiseJson) {
          let jsonContents = JSON.parse(contents)
          jsonContents = this.customiseJson(jsonContents)
          return JSON.stringify(jsonContents, undefined, 2)
        } else {
          return contents
        }
      },
    })
    this.customiseJson = params.customiseJson
  }
}
