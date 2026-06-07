# Changesets

Hello and welcome! This folder is used by Changesets to manage package versions and changelogs for this monorepo.

To add a changeset, run:

```sh
pnpm changeset
```

Select the packages that changed, choose the appropriate bump type, and write a concise summary of the change. Commit the generated Markdown file with your code changes.

When changesets are merged to `main`, the release workflow opens a version PR. Merging that version PR publishes the public packages to npm when `NPM_TOKEN` is configured in repository secrets.

The private `bridger-figma-plugin` workspace is ignored and is never versioned or published by Changesets.
