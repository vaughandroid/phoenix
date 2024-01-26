// Would be from "@vaughandroid/phoenix" in a real project
import { Json, JsonProjectFile, Project } from '../../src'
import { GENERATED_FILE_COMMENT } from '../../src/projects/project'

const project = new Project()

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
  generatedFileComment: GENERATED_FILE_COMMENT,
}

const packageJson = new JsonProjectFile({
  fileName: 'package.json',
  templatePath: `${__dirname}/../template/package.json`,
  regenerate: true,
})
packageJson.customiseJson = (json: any) => {
  // Install from the local filesystem rather than NPM.
  json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../'
  return json
}

project.projectFiles = [packageJson]

project.regenerateFiles()
