import { describe, it, expect } from 'vitest';
import { MarkdownParser } from '../lib/MarkdownParser';

describe('MarkdownParser', () => {
  it('should parse markdown slides correctly', () => {
    const markdown = `# Slide 1
This is content

# Slide 2
More content`;

    const slides = MarkdownParser.parseSlides(markdown);
    expect(slides).toHaveLength(2);
    expect(slides[0].title).toBe('Slide 1');
    expect(slides[0].content).toBe('This is content');
    expect(slides[1].title).toBe('Slide 2');
    expect(slides[1].content).toBe('More content');
  });

  it('should parse tables correctly', () => {
    const tableText = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |`;

    const result = MarkdownParser.parseTable(tableText);
    expect(result).not.toBeNull();
    expect(result?.headerRow).toEqual(['Header 1', 'Header 2']);
    expect(result?.dataRows).toEqual([
      ['Cell 1', 'Cell 2'],
      ['Cell 3', 'Cell 4']
    ]);
  });

  it('should convert basic markdown to HTML', () => {
    const markdown = `## Header
**Bold text** and *italic text*
\`inline code\``;

    const result = MarkdownParser.convertToHTML(markdown);
    expect(result).toContain('<h2 class="text-3xl font-bold mb-6">Header</h2>');
    expect(result).toContain('<strong class="font-bold text-blue-400">Bold text</strong>');
    expect(result).toContain('<em class="italic text-blue-300">italic text</em>');
    expect(result).toContain('<code class="bg-muted text-muted-foreground px-2 py-1 rounded font-mono text-sm border border-border">inline code</code>');
  });

  it('should integrate list processing correctly', () => {
    const markdown = `1. First item
   - Sub item`;

    const result = MarkdownParser.convertToHTML(markdown);
    // Just verify that lists are processed (detailed testing is in ListProcessor.test.ts)
    expect(result).toContain('<ol');
    expect(result).toContain('<ul');
    expect(result).toContain('First item');
    expect(result).toContain('Sub item');
  });

  it('should handle code blocks correctly', () => {
    const markdown = `\`\`\`javascript
console.log('hello');
\`\`\``;

    const result = MarkdownParser.convertToHTML(markdown);
    expect(result).toContain('<pre class="bg-muted border border-border rounded-lg p-4 my-4 overflow-x-auto text-left">');
    expect(result).toContain('console.log(\'hello\');');
  });
});
