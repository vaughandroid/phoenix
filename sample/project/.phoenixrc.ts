// Would be from "@vaughandroid/phoenix" in a real project
import { JsonProjectFile, Project, ProjectFile, ProjectFiles } from '../../src';

const project = new Project();

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
};

const templatePath = `${__dirname}/../template`

project.regeneratedFiles['package.json'] = new JsonProjectFile({
  templatePath: `${templatePath}/package.json`,
  customiseJson: (json: any) => {
    // Since we always want to use the current local code, use a local filesystem dependency rather than NPM.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../';
    return json;
  },
});

project.regeneratedFiles['.eslintrc.js'] = new ProjectFile({
  templatePath: `${templatePath}/.eslintrc.js`,
});

project.regeneratedFiles['.gitignore'] = new ProjectFile({
  templatePath: `${templatePath}/.gitignore`,
});

project.regeneratedFiles['.prettierrc.js'] = new ProjectFile({
  templatePath: `${templatePath}/.prettierrc.js`,
});

project.regeneratedFiles['tsconfig.json'] = new JsonProjectFile({
  templatePath: `${templatePath}/tsconfig.json`,
});

project.regenerateFiles();
