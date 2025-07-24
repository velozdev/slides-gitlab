import { MarkdownParser } from '../lib/MarkdownParser';

describe('MarkdownParser', () => {
  it('should correctly convert ordered lists with unordered sublists to HTML', () => {
    const markdown = `
1. **Define Clear Objectives**
   - Start with specific, measurable business goals  
   - Align metrics with organizational priorities  
   - Focus on outcomes, not just outputs  
    `;

    const expectedHTML = `
<ol class="space-y-3 my-4 list-decimal list-inside text-left" style="max-width: 600px;">
  <li class="list-item ordered">
    <strong class="font-bold text-blue-400">Define Clear Objectives</strong>
    <ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">
      <li class="list-item unordered">Start with specific, measurable business goals</li>
      <li class="list-item unordered">Align metrics with organizational priorities</li>
      <li class="list-item unordered">Focus on outcomes, not just outputs</li>
    </ul>
  </li>
</ol>
    `.trim();

    const result = MarkdownParser.convertToHTML(markdown);
    expect(result).toBe(expectedHTML);
  });

  it('should correctly convert unordered lists with nested unordered sublists to HTML', () => {
    const markdown = `
- Main Item 1
  - Sub Item 1.1
  - Sub Item 1.2
- Main Item 2
  - Sub Item 2.1
    - Sub Sub Item 2.1.1
  - Sub Item 2.2
    `;

    const expectedHTML = `
<ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">
  <li class="list-item unordered">Main Item 1
    <ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">
      <li class="list-item unordered">Sub Item 1.1</li>
      <li class="list-item unordered">Sub Item 1.2</li>
    </ul>
  </li>
  <li class="list-item unordered">Main Item 2
    <ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">
      <li class="list-item unordered">Sub Item 2.1
        <ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">
          <li class="list-item unordered">Sub Sub Item 2.1.1</li>
        </ul>
      </li>
      <li class="list-item unordered">Sub Item 2.2</li>
    </ul>
  </li>
</ul>
    `.trim();

    const result = MarkdownParser.convertToHTML(markdown);
    expect(result).toBe(expectedHTML);
  });
});
