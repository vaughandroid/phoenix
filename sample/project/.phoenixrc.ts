import { Json, JsonProjectFile, Project } from '../../src' // Would be from "@vaughandroid/phoenix" in a real project 

const project = new Project({});

project.tokens = {
  projectName: 'SampleProject',
  version: '0.0.1'
};

const packageJson = new JsonProjectFile({ fileName: 'package.json', regenerate: true });
packageJson.customiseJson = (json: Json) => json;

project.projectFiles = [
  packageJson
];