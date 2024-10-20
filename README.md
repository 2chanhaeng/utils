# Utils Repository

Utils to use my self. Pure functions that can be used in any project. Inspired
by [fp-ts](https://gcanti.github.io/fp-ts/) and [fxts](https://fxts.dev/).

## Table of Contents

- [Utils Repository](#utils-repository)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)

## Installation

Install from [JSR](https://jsr.io/@chomu/utils).

```bash
deno add jsr:@chomu/utils
npx jsr add @chomu/utils
yarn dlx jsr add @chomu/utils
pnpm dlx jsr add @chomu/utils
bunx jsr add @chomu/utils
```

## Usage

```ts
import {
  chain,
  filter,
  get,
  map,
  pipe,
  split,
  tap,
  tapLen,
  tapLog,
  toArray,
} from "utils";

const users = pipe(
  Deno.readDirSync,
  filter((file: Deno.DirEntry) => file.name.search(/users.*\.jsonl/) >= 0),
  map(
    pipe(
      get("name")<string>,
      tapLog("files"),
      (name) => `./${name}`,
      Deno.readTextFileSync,
      split("\n"),
    ),
  ),
  chain,
  tapLen(console.log),
  toArray,
)("./");
```
