# Intro

Tools for adding new books to the 千佛寺圖書館 Thousand Buddha Temple library.

![Homepage Screenshot](https://8octlbsl6slpnmsz.public.blob.vercel-storage.com/homepage.png)

# development

## start the dev server

```
pnpm install
pnpm dev:tools
```

# branching and environments

* local environment: Use .env files.
* dev branch: deploy to 1000buddha-library-tools-dev.stevemu.com
* main branch: deploy to 1000buddha-library-tools.stevemu.com

# Design Decisions

## Logging

* Vercel handles server side logging.
  * Logs error and warnings (for analytics) in interactors.
* Datadog handles client side logging.
  * Unhandled errors are logged to Datadog.
  * Prod environment: Datadog RUM is enabled.

## Monorepo

* monorepo: can reuse eslint config when copying to a new project
* monorepo: cannot used prisma when deploying to vercel
* plain nextjs: when deploying to vercel, can store static files used by server actions in the public folder

## Why not using Prisma

* Used "@prisma/nextjs-monorepo-workaround-plugin" made getting data work.
* Couldn't make creating data work.
  * Probably this is a turborepo issue. Since "https://vercel.com/templates/next.js/postgres-prisma", which does not use turborepo, works even without the "@prisma/nextjs-monorepo-workaround-plugin" plugin.
  * Tried generating prisma client at the root.
* Advantages of pg:
  * simpler to set up
    * no need to set up two database urls
    * no need to generate prisma client
  * can scale to more complex queries

## Reading files in server actions

* Read files directly from the file system from public (or static) folder
  * works in plain nextjs (tried public folder)
  * not work in turborepo when deploying to vercel
    * tried https://vercel.com/guides/how-can-i-use-files-in-serverless-functions
    * tried to put the file in library-tools root (vercel file trace does not seem to work)
* Reading base64 encoded string from files
  * IDE hangs when trying import base64 encoded string
* Final solution: download file from s3 via fetch. Simplier code too.

## Test setup

* use Jest for testing
* jest dependencies are installed in the root package.json
* each package has its own jest config since jest seems to be unable to find the root jest config

## Render edit book dialog as "/edit/[bookId]"

Needed to move AllBooksPage to a layout component and it resulted in hydration error.

# Lessons Learned

* sending binary data (unit8array or Buffer) to the browser in server actions does not work. Need to convert to base64 string.
