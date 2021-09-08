import { defListFromMarkdown, defListToMarkdown } from 'mdast-util-definition-list';
import { defList } from 'micromark-extension-definition-list';
import type { Processor } from 'unified';

export { defListHastHandlers } from 'mdast-util-definition-list';

export function remarkDefinitionList(this: Processor): void {
  const data = this.data();

  add('micromarkExtensions', defList);
  add('fromMarkdownExtensions', defListFromMarkdown);
  add('toMarkdownExtensions', defListToMarkdown);

  function add(field: string, value: any) {
    if (data[field] == null) {
      data[field] = [];
    }
    const list = data[field];
    if (!(list instanceof Array)) {
      throw new Error(`expect data[${field}] is array`);
    }
    list.push(value);
  }
}
