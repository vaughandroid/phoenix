// Would be from "@vaughandroid/phoenix" in a real project
import { Project, ProjectFile } from '../../src';

const project = new Project();

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
};

const templatePath = `${__dirname}/../template`;

project.regeneratedFiles['package.json'] = ProjectFile.fromJsonTemplate(
  `${templatePath}/package.json`,
  (json: any) => {
    // Use a local filesystem link rather than NPM as we always want to use the current local code.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../';
    return json;
  },
);

project.regeneratedFiles['.eslintrc.js'] = ProjectFile.fromTemplate(
  `${templatePath}/.eslintrc.js`,
);
project.regeneratedFiles['.gitignore'] = ProjectFile.fromTemplate(
  `${templatePath}/.gitignore`,
);
project.regeneratedFiles['.prettierrc.js'] = ProjectFile.fromTemplate(
  `${templatePath}/.prettierrc.js`,
);
project.regeneratedFiles['tsconfig.json'] = ProjectFile.fromTemplate(
  `${templatePath}/tsconfig.json`,
);

project.regenerateFiles();
