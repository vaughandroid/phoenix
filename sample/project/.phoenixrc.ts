// Would be from "@vaughandroid/phoenix" in a real project
import { createCustomiseJsonContents, Project } from '../../src';

const templatePath = `${__dirname}/../template`;
const project = Project.fromTemplateFolder(templatePath);

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
};

project.regeneratedFiles['package.json'].customiseContents =
  createCustomiseJsonContents((json: any) => {
    // Use a local filesystem link rather than NPM as we always want to use the current local code.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../';
    return json;
  });

project.regenerateFiles();
