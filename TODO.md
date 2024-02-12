# TODO

## Musts

[x] Make projectFiles an object, with filenames for keys
[x] Refactor ProjectFiles
[x] Add `Project.fromTemplate()` factory method
[x] Update sample to include creating a file from scratch
[ ] Support creating a new project
[ ] Support first install when there's no package.json
[ ] Unit tests
  [ ] Token replacement
  [ ] Finding files w/marker
[ ] Handle adding dependencies (need to run `pnpm install` or similar automatically)
[ ] Gracefully recover from errors (e.g. package.json gets deleted)
    OR don't modify files unless the generation process is successful

## Shoulds

[ ] Replace JsonProjectFile with a CustomiseJson function
[ ] Have .phoenixrc.ts export the project, then have phoenix rebuild/create as desired
[ ] Add debug logging
[ ] Acceptance/integration tests
[ ] Look into defining a useful JSON type