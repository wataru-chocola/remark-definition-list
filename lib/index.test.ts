import { defListHastHandlers } from './index';
import remarkDefinitionList from './index';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const process = (md: string) =>
  unified()
    .use(remarkParse)
    .use(remarkDefinitionList)
    .use(remarkRehype, {
      handlers: Object.assign({}, defListHastHandlers),
    })
    .use(rehypeStringify)
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
  const html = `<p>Test for defList.</p>
<dl>
<dt>Apple</dt>
<dd>Pomaceous fruit of plants of the genus Malus in
the family Rosaceae.
</dd>
<dt>Orange</dt>
<dd>The fruit of an evergreen tree of the genus Citrus.
</dd>
</dl>`;
  process(md).then((result) => expect(result.value).toBe(html));
});
