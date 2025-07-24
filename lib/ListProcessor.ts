export interface ListItem {
  indent: number;
  isOrdered: boolean;
  content: string;
}

export class ListProcessor {
  static processLists(markdown: string): string {
    // First, handle nested lists (ordered with unordered sublists)
    markdown = this.processNestedOrderedLists(markdown);
    
    // Then handle nested unordered lists
    markdown = this.processNestedUnorderedLists(markdown);
    
    // Finally, handle any remaining simple lists
    markdown = this.processSimpleLists(markdown);
    
    return markdown;
  }

  private static processNestedOrderedLists(markdown: string): string {
    // Match ordered list items that have unordered sublists
    return markdown.replace(/((?:^\d+\.\s.*(?:\n\s+[-*]\s.*)*(?:\n|$))+)/gm, (match) => {
      const lines = match.trim().split('\n');
      let result = '<ol class="space-y-3 my-4 list-decimal list-inside text-left" style="max-width: 600px;">';
      let currentOrderedItem = '';
      let sublistItems: string[] = [];
      
      lines.forEach(line => {
        const orderedMatch = line.match(/^\d+\.\s(.*)$/);
        const unorderedMatch = line.match(/^\s+[-*]\s(.*)$/);
        
        if (orderedMatch) {
          // Close previous item if exists
          if (currentOrderedItem) {
            result += this.generateOrderedItem(currentOrderedItem, sublistItems);
            sublistItems = [];
          }
          currentOrderedItem = orderedMatch[1];
        } else if (unorderedMatch) {
          sublistItems.push(unorderedMatch[1]);
        }
      });
      
      // Close the last item
      if (currentOrderedItem) {
        result += this.generateOrderedItem(currentOrderedItem, sublistItems);
      }
      
      result += '</ol>';
      return result;
    });
  }

  private static processNestedUnorderedLists(markdown: string): string {
    // Match unordered list items that have nested sublists
    return markdown.replace(/((?:^[-*]\s.*(?:\n\s{2,}[-*]\s.*)*(?:\n|$))+)/gm, (match) => {
      const lines = match.trim().split('\n');
      let result = '<ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">';
      let currentMainItem = '';
      let sublistItems: string[] = [];
      
      lines.forEach(line => {
        const mainMatch = line.match(/^[-*]\s(.*)$/);
        const subMatch = line.match(/^\s{2,}[-*]\s(.*)$/);
        
        if (mainMatch) {
          // Close previous item if exists
          if (currentMainItem) {
            result += this.generateUnorderedItem(currentMainItem, sublistItems);
            sublistItems = [];
          }
          currentMainItem = mainMatch[1];
        } else if (subMatch) {
          sublistItems.push(subMatch[1]);
        }
      });
      
      // Close the last item
      if (currentMainItem) {
        result += this.generateUnorderedItem(currentMainItem, sublistItems);
      }
      
      result += '</ul>';
      return result;
    });
  }

  private static processSimpleLists(markdown: string): string {
    // Handle any remaining simple lists that weren't caught by nested processing
    return markdown.replace(/((?:^(?:\d+\.|\*|-)\s.*(?:\n|$))+)/gm, (match) => {
      const lines = match.trim().split('\n');
      const firstLine = lines[0];
      
      if (firstLine.match(/^\d+\./)) {
        // Simple ordered list
        let result = '<ol class="space-y-3 my-4 list-decimal list-inside text-left" style="max-width: 600px;">';
        lines.forEach(line => {
          const match = line.match(/^\d+\.\s(.*)$/);
          if (match) {
            const content = this.processContent(match[1], true);
            result += `<li class="list-item ordered transition-all duration-300 ease-in-out">${content}</li>`;
          }
        });
        result += '</ol>';
        return result;
      } else {
        // Simple unordered list
        let result = '<ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">';
        lines.forEach(line => {
          const match = line.match(/^[-*]\s(.*)$/);
          if (match) {
            result += `<li class="list-item unordered transition-all duration-300 ease-in-out">${match[1]}</li>`;
          }
        });
        result += '</ul>';
        return result;
      }
    });
  }

  private static generateOrderedItem(content: string, sublistItems: string[]): string {
    const processedContent = this.processContent(content, true);
    let result = `<li class="list-item ordered transition-all duration-300 ease-in-out">${processedContent}`;
    
    if (sublistItems.length > 0) {
      result += '<ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">';
      sublistItems.forEach(item => {
        result += `<li class="list-item unordered transition-all duration-300 ease-in-out">${item}</li>`;
      });
      result += '</ul>';
    }
    
    result += '</li>';
    return result;
  }

  private static generateUnorderedItem(content: string, sublistItems: string[]): string {
    let result = `<li class="list-item unordered transition-all duration-300 ease-in-out">${content}`;
    
    if (sublistItems.length > 0) {
      result += '<ul class="space-y-3 my-4 list-disc list-inside text-left" style="max-width: 600px;">';
      sublistItems.forEach(item => {
        result += `<li class="list-item unordered transition-all duration-300 ease-in-out">${item}</li>`;
      });
      result += '</ul>';
    }
    
    result += '</li>';
    return result;
  }

  private static processContent(content: string, isOrdered: boolean): string {
    if (isOrdered && content.startsWith('**') && content.endsWith('**')) {
      return `<strong class="font-bold text-blue-400">${content.slice(2, -2)}</strong>`;
    }
    return content;
  }
}
