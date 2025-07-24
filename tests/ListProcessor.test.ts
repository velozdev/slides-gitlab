import { describe, it, expect } from 'vitest';
import { ListProcessor } from '../lib/ListProcessor';

describe('ListProcessor', () => {
  it('should process simple unordered lists', () => {
    const markdown = `- Item 1
- Item 2`;
    
    const result = ListProcessor.processLists(markdown);
    expect(result).toContain('<ul class="space-y-3 my-4 list-disc list-inside text-left"');
    expect(result).toContain('<li class="list-item unordered">Item 1</li>');
    expect(result).toContain('<li class="list-item unordered">Item 2</li>');
  });

  it('should process simple ordered lists', () => {
    const markdown = `1. First item
2. Second item`;
    
    const result = ListProcessor.processLists(markdown);
    expect(result).toContain('<ol class="space-y-3 my-4 list-decimal list-inside text-left"');
    expect(result).toContain('<li class="list-item ordered">First item</li>');
    expect(result).toContain('<li class="list-item ordered">Second item</li>');
  });

  it('should process nested unordered lists', () => {
    const markdown = `- Main Item 1
  - Sub Item 1.1
  - Sub Item 1.2
- Main Item 2`;
    
    const result = ListProcessor.processLists(markdown);
    const normalized = result.replace(/\s+/g, ' ').trim();
    
    expect(normalized).toContain('<ul');
    expect(normalized).toContain('Main Item 1');
    expect(normalized).toContain('Sub Item 1.1');
    expect(normalized).toContain('Sub Item 1.2');
    expect(normalized).toContain('Main Item 2');
    
    // Verify nested structure
    const openingUls = (normalized.match(/<ul/g) || []).length;
    const closingUls = (normalized.match(/<\/ul>/g) || []).length;
    expect(openingUls).toBe(closingUls);
    expect(openingUls).toBeGreaterThan(1);
  });

  it('should process ordered lists with unordered sublists', () => {
    const markdown = `1. **Main Item**
   - Sub Item 1
   - Sub Item 2`;
    
    const result = ListProcessor.processLists(markdown);
    const normalized = result.replace(/\s+/g, ' ').trim();
    
    expect(normalized).toContain('<ol');
    expect(normalized).toContain('<ul');
    expect(normalized).toContain('<strong class="font-bold text-blue-400">Main Item</strong>');
    expect(normalized).toContain('Sub Item 1');
    expect(normalized).toContain('Sub Item 2');
  });

  it('should handle complex nested structures', () => {
    const markdown = `1. **Define Clear Objectives**
   - Start with specific, measurable business goals
   - Align metrics with organizational priorities
   - Focus on outcomes, not just outputs
2. **Another Main Item**
   - Another sub item`;
    
    const result = ListProcessor.processLists(markdown);
    const normalized = result.replace(/\s+/g, ' ').trim();
    
    expect(normalized).toContain('Define Clear Objectives');
    expect(normalized).toContain('Start with specific, measurable business goals');
    expect(normalized).toContain('Another Main Item');
    expect(normalized).toContain('Another sub item');
  });

  it('should not process non-list content', () => {
    const markdown = `This is just a paragraph.
Not a list at all.`;
    
    const result = ListProcessor.processLists(markdown);
    expect(result).toBe(markdown); // Should be unchanged
  });
});
