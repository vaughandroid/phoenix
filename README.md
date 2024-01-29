# Phoenix

A Node project re-generator. Node projects as code!

## Overview

Phoenix allows you to not only generate projects, but to re-generate them.

Project generators are at helping to bootstrap projects, or for helping teams to standardise their projects.
However, they have one big drawback for people who need to maintain multiple projects: each project is an independent copy.
When you want to change some aspect of the standard project setup, you have to manually update each copy. 
This is tedious at best, and can be error-prone - especially as small differences creep into projects over time.

A project re-generator aims to solve this problem.
Initial project generation works just like any other project generator, but if a change is made to the base template then that change can be easily applied to projects based on the template, simply by running a command.

## How it works

A Phoenix project is based around a single file, *.phoenixrc.ts*.
That file needs to create an instance of the `Project` class, configure it, and then call its `regenerate()` function.
A project consists of files, which can be based on a template or can be defined purely in code.
Token replacement is supported for template files, and arbitrary changes can be made to any file by defining a `customise` function for it.

Generated files are marked as read-only as they should not be modified directly.
Instead, you should define the required change either in the template file, or in the `customise` function for the file in *.phoenixrc.ts*.
You then need to regenerate the project by running the `phoenix` command.

When the `phoenix` command is run, the *.phoenixrc.ts* file is loaded and executed.
When `Project.regenerate()` is called, Phoenix first searches for all generated files (which are marked with a special comment) and deletes them.
Then, all files are re-generated from scratch.

## Philosophy

Phoenix was inspired by [Projen](https://projen.io/), but whereas Projen looks to take a "batteries included" approach and seeks to provide a solution for many languages and frameworks, the Phoenix philosophy is "less is more".
The API is kept as lean as possible, to make it simple to learn and use.
