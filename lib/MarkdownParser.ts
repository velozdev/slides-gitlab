// MarkdownParser.ts
export class MarkdownParser {
  static parseSlides(markdown: string) {
    const sections = markdown.split(/^# /gm).filter(section => section.trim());
    return sections.map(section => {
      const lines = section.trim().split('\n');
      let title = lines[0] || 'Untitled Slide';
      title = title.replace(/^\*\*(.*?)\*\*$/, '$1');
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    });
  }

  static parseTable(text: string) {
    const lines = text.split('\n').filter(line => line.trim() && line.includes('|'));
    if (lines.length < 1) return null;

    const rows = lines.map(line => {
      const cells = line.split('|');
      if (cells[0].trim() === '') cells.shift();
      if (cells[cells.length - 1].trim() === '') cells.pop();
      return cells.map(cell => cell.trim());
    });

    const isSeparatorRow = (row: string[]) => row.every(cell => /^[-\s:]+$/.test(cell));
    let headerRow = null;
    let dataRows = rows;

    if (rows.length > 1 && isSeparatorRow(rows[1])) {
      headerRow = rows[0];
      dataRows = rows.slice(2);
    } else {
      headerRow = rows[0];
      dataRows = rows.slice(1);
    }

    return { headerRow, dataRows };
  }

  static convertToHTML(markdown: string, slideIndex?: number) {
    let html = markdown;

    // Group consecutive table lines into a single block, including last row at end of string
    html = html.replace(/((?:^\|.*\|.*(?:\n|$))+)/gm, (match) => {
      // Only process if block has at least header, separator, and one row
      const lines = match.trim().split(/\n/).filter(l => l.trim().startsWith('|'));
      if (lines.length < 2) return match;
      const tableData = MarkdownParser.parseTable(lines.join('\n'));
      if (!tableData) return match;

      const { headerRow, dataRows } = tableData;
      let tableHTML = '<table class="table-auto w-full border-collapse my-6 text-left border border-gray-600">';
      if (headerRow && headerRow.length > 0) {
        tableHTML += '<thead><tr class="bg-gray-800 border-b border-gray-600">';
        headerRow.forEach(cell => {
          tableHTML += `<th class="border border-gray-600 px-4 py-3 font-semibold text-white">${cell}</th>`;
        });
        tableHTML += '</tr></thead>';
      }
      if (dataRows && dataRows.length > 0) {
        tableHTML += '<tbody>';
        dataRows.forEach(row => {
          if (row.length > 0) {
            tableHTML += '<tr class="border-b border-gray-600">';
            row.forEach(cell => {
              tableHTML += `<td class="border border-gray-600 px-4 py-3 align-top">${cell}</td>`;
            });
            tableHTML += '</tr>';
          }
        });
        tableHTML += '</tbody>';
      }
      tableHTML += '</table>';
      return tableHTML;
    });

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^\)]+)\)/g, 
      '<img src="$2" alt="$1" class="inline-block align-middle my-4 max-h-24" />');

    // Headers
    html = html.replace(/^### \*\*(.*?)\*\*$/gm, '<h3 class="text-2xl font-semibold mb-4">$1</h3>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mb-4">$1</h3>');
    html = html.replace(/^## \*\*(.*?)\*\*$/gm, '<h2 class="text-3xl font-bold mb-6">$1</h2>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mb-6">$1</h2>');

    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-400">$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em class="italic text-blue-300">$1</em>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, 
      '<code class="bg-gray-800 text-blue-400 px-2 py-1 rounded font-mono text-sm">$1</code>');

    // Lists
    html = html.replace(/^[*-] (.+)$/gm, '<li class="list-item unordered">$1</li>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="list-item ordered">$1</li>');

    // Wrap consecutive ordered list items
    html = html.replace(/(<li class="list-item ordered">.*?<\/li>)(\s*<li class="list-item ordered">.*?<\/li>)*/gs, 
      (match: string) => `<ol class="space-y-3 my-4 list-decimal list-inside mx-auto text-left" style="max-width: 600px;">${match}</ol>`);

    html = html.replace(/(<li class="list-item unordered">.*?<\/li>)(\s*<li class="list-item unordered">.*?<\/li>)*/gs, 
      (match: string) => `<ul class="space-y-3 my-4 list-disc list-inside mx-auto text-left" style="max-width: 600px;">${match}</ul>`);

    // Paragraphs (avoid wrapping tables, lists, and headers)
    // Use flex centering for title slide (slide 0), normal styling for others
    if (slideIndex === 0) {
      html = html.replace(/^(?!<[uthol]|<li)(.+)$/gm, '<p class="mb-4 leading-relaxed flex items-center justify-center min-h-16 gap-4">$1</p>');
    } else {
      html = html.replace(/^(?!<[uthol]|<li)(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>');
    }

    // Clean up empty paragraphs
    html = html.replace(/<p[^>]*><\/p>/g, '');

    return html;
  }
}
