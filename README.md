# remark-definition-list

[![Node.js CI](https://github.com/wataru-chocola/remark-definition-list/actions/workflows/node.js.yml/badge.svg)](https://github.com/wataru-chocola/remark-definition-list/actions/workflows/node.js.yml)

[remark] plugin to support definition list

## Feature

* fully support [Definition Lists Syntax of php-markdown]
* work with [rehype] using [remark-rehype]
* shipped with types

[Definition Lists Syntax of php-markdown]: https://michelf.ca/projects/php-markdown/extra/#def-list
[remark]: https://github.com/remarkjs/remark
[rehype]: https://github.com/rehypejs/rehype
[remark-rehype]: https://github.com/remarkjs/remark-rehype
[mdast-util-definition-list]: https://github.com/wataru-chocola/mdast-util-definition-list

## Install

```console
$ npm install remark-definition-list
```

## Use

```typescript
import { remarkDefinitionList, defListHastHandlers } from 'remark-definition-list';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const md = `
Test for defList.

Apple
:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange
:   The fruit of an evergreen tree of the genus Citrus.
`;


const html = unified()
  .use(remarkParse)
  .use(remarkDefinitionList)
  .use(remarkRehype, {
    handlers: Object.assign({}, defListHastHandlers),
  })
  .use(rehypeStringify)
  .process(md);
```
