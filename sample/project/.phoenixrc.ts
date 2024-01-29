// Would be from "@vaughandroid/phoenix" in a real project
import { Json, JsonProjectFile, Project, ProjectFile } from '../../src'
import { GENERATED_FILE_COMMENT } from '../../src/projects/project'

const project = new Project()

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
  // TODO: Do this automatically?
  generatedFileComment: GENERATED_FILE_COMMENT,
}

// TODO: Add 'from template' constructor which defaults the filename
const packageJson = new JsonProjectFile({
  // TODO: Set template path for project
  fileName: 'package.json',
  templatePath: `${__dirname}/../template/package.json`,
  // TODO: Default regenerate to true?
  regenerate: true,
  // TODO: Json types not actually useful?
  customiseJson: (json: any) => {
    // TODO: Add phoenix dependency automatically?
    // Install from the local filesystem rather than NPM.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../'
    return json
  },
})


const eslintrcJs = new ProjectFile({
  fileName: '.eslintrc.js',
  templatePath: `${__dirname}/../template/.eslintrc.js`,
  regenerate: true,
})

const gitignore = new ProjectFile({
  fileName: '.gitignore',
  templatePath: `${__dirname}/../template/.gitignore`,
  regenerate: true,
})

const prettierrcJs = new ProjectFile({
  fileName: '.prettierrc.js',
  templatePath: `${__dirname}/../template/.prettierrc.js`,
  regenerate: true,
})

const tsconfigJson = new JsonProjectFile({
  fileName: 'tsconfig.json',
  templatePath: `${__dirname}/../template/tsconfig.json`,
  regenerate: true,
})

project.projectFiles = [packageJson, eslintrcJs, gitignore, prettierrcJs, tsconfigJson]

project.regenerateFiles()
