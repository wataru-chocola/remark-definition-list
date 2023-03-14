import { test, expect } from 'vitest';

import { defListHastHandlers, defListHastToMdast } from './index';
import remarkDefinitionList from './index';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';

import { dedent } from 'ts-dedent';

const md2html = (md: string) =>
  unified()
    .use(remarkParse)
    .use(remarkDefinitionList)
    .use(remarkRehype, {
      handlers: Object.assign({}, defListHastHandlers),
    })
    .use(rehypeStringify)
    .process(md);

const html2md = (html: string) =>
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeRemark, {
      handlers: defListHastToMdast,
    })
    .use(remarkDefinitionList)
    .use(remarkStringify)
    .process(html);

test('md2html', async () => {
  const md = `
  Test for defList.

  Apple
  :   Pomaceous fruit of plants of the genus Malus in
      the family Rosaceae.

  Orange
  :   The fruit of an evergreen tree of the genus Citrus.
  `;
  const html = `
  <p>Test for defList.</p>
  <dl>
  <dt>Apple</dt>
  <dd>Pomaceous fruit of plants of the genus Malus in
  the family Rosaceae.
  </dd>
  <dt>Orange</dt>
  <dd>The fruit of an evergreen tree of the genus Citrus.
  </dd>
  </dl>`;
  const result = await md2html(dedent(md));
  expect(result.value).toBe(dedent(html));
});

test('html2md', async () => {
  const html = `
  <p>Test for defList.</p>
  <dl>
  <dt>Apple</dt>
  <dd>Pomaceous fruit of plants of the genus Malus in
  the family Rosaceae.
  </dd>
  <dt>Orange</dt>
  <dd>The fruit of an evergreen tree of the genus Citrus.
  </dd>
  </dl>`;
  const md = `
  Test for defList.

  Apple
  :   Pomaceous fruit of plants of the genus Malus in the family Rosaceae.

  Orange
  :   The fruit of an evergreen tree of the genus Citrus.

  `;

  const result = await html2md(dedent(html));
  expect(result.value).toBe(dedent(md));
});
