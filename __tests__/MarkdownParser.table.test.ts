import { describe, it, expect } from 'vitest';
import { MarkdownParser } from '../lib/MarkdownParser';

const tableMarkdown = `| Relationship | Purpose |
| :---- | :---- |
| Related to | A general connection; these issues are similar but not dependent. |
| Blocks | This issue must be finished before the other one can start. |
| Blocked by | This issue cannot start until the other one is finished. |`;

describe('MarkdownParser Table Parsing', () => {
  it('parses all table rows including the last row', () => {
    const html = MarkdownParser.convertToHTML(tableMarkdown);
    // Should contain all 3 data rows
    expect(html).toContain('<td class="border border-gray-600 px-4 py-3 align-top">Related to</td>');
    expect(html).toContain('<td class="border border-gray-600 px-4 py-3 align-top">Blocks</td>');
    expect(html).toContain('<td class="border border-gray-600 px-4 py-3 align-top">Blocked by</td>');
    // Should contain the last row
    expect(html).toMatch(/Blocked by.*finished/);
  });
});
