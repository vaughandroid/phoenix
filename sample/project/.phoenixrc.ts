// Would be from "@vaughandroid/phoenix" in a real project
import { Json, JsonProjectFile, Project } from '../../src'
import { GENERATED_FILE_COMMENT } from '../../src/projects/project'

const project = new Project()

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
  // TODO: Do this automatically?
  generatedFileComment: GENERATED_FILE_COMMENT,
}

const packageJson = new JsonProjectFile({
  // TODO: Set template path for project
  fileName: 'package.json',
  templatePath: `${__dirname}/../template/package.json`,
  regenerate: true,
  // TODO: Json types not actually useful?
  customiseJson: (json: any) => {
    // TODO: Add phoenix dependency automatically?
    // Install from the local filesystem rather than NPM.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../'
    return json
  }
})

project.projectFiles = [packageJson]

project.regenerateFiles()
