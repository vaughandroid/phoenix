// Would be from "@vaughandroid/phoenix" in a real project
import { Json, JsonProjectFile, Project } from '../../src'
import {GENERATED_FILE_COMMENT} from "../../src/projects/project";

const project = new Project({});

project.tokens = {
  projectName: 'SampleProject',
  projectVersion: '0.0.1',
  projectDescription: 'A sample project',
  generatedFileComment: GENERATED_FILE_COMMENT
};

const packageJson = new JsonProjectFile({ fileName: 'package.json', regenerate: true });
packageJson.customiseJson = (json: Json) => json;

project.projectFiles = [
  packageJson
];