import { remarkDefinitionList, defListHastHandlers } from './index';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkStringify from 'rehype-stringify';

const process = (md: string) =>
  unified()
    .use(remarkParse)
    .use(remarkDefinitionList)
    .use(remarkRehype, {
      handlers: Object.assign({}, defListHastHandlers),
    })
    .use(remarkStringify)
    .process(md);

test('basic syntax', () => {
  const md = `
Test for defList.

Apple
:   Pomaceous fruit of plants of the genus Malus in
    the family Rosaceae.

Orange
:   The fruit of an evergreen tree of the genus Citrus.
`;
  const html = `
`;
  expect(process(md)).toBe(html);
});
