// Would be from "@vaughandroid/phoenix" in a real project
import {
  customiseJsonContents,
  Project,
  ProjectFile,
  REGENERATED_FILE_MARKER,
} from '../../src';
import dedent from 'dedent';

const templatePath = `${__dirname}/../template`;
const project = Project.fromTemplateFolder(templatePath);

project.tokens = {
  projectName: 'sample-project',
  projectVersion: '0.0.2',
  projectDescription: 'A sample project',
};

project.regeneratedFiles['package.json'].customiseContents =
  customiseJsonContents((json: any) => {
    // Use a local filesystem link rather than NPM as we always want to use the current local code.
    json['devDependencies']['@vaughandroid/phoenix'] = 'link:../../';
    // Add a dependency that doesn't exist in the template.
    json['devDependencies']['dedent'] = '^1.5.1';
    return json;
  });

project.regeneratedFiles['.gitignore'] = ProjectFile.textFileFromScratch(
  dedent`# ${REGENERATED_FILE_MARKER}
  node_modules/
  dist/`,
);

project.regenerateFiles();
