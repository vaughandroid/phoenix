// Would be from "@vaughandroid/phoenix" in a real project
import { JsonProjectFile, Project, ProjectFile } from '../../src';

const project = new Project();

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
};

const templatePath = `${__dirname}/../template`

// TODO: Add 'from template' constructor
const packageJson = new JsonProjectFile({
  fileName: 'package.json',
  templatePath: `${templatePath}/package.json`,
  customiseJson: (json: any) => {
    // Since we always want to use the current local code, use a local filesystem dependency rather than NPM.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../';
    return json;
  },
});

const eslintrcJs = new ProjectFile({
  fileName: '.eslintrc.js',
  templatePath: `${templatePath}/.eslintrc.js`,
});

const gitignore = new ProjectFile({
  fileName: '.gitignore',
  templatePath: `${templatePath}/.gitignore`,
});

const prettierrcJs = new ProjectFile({
  fileName: '.prettierrc.js',
  templatePath: `${templatePath}/.prettierrc.js`,
});

const tsconfigJson = new JsonProjectFile({
  fileName: 'tsconfig.json',
  templatePath: `${templatePath}/tsconfig.json`,
});

// TODO: Make projectFiles an object, with filenames for keys
project.projectFiles = [
  packageJson,
  eslintrcJs,
  gitignore,
  prettierrcJs,
  tsconfigJson,
];

project.regenerateFiles();
