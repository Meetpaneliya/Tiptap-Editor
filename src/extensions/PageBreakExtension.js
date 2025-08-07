import { Node } from '@tiptap/core';

const PageBreakExtension = Node.create({
  name: 'pageBreak',

  group: 'block',

  parseHTML() {
    return [
      {
        tag: 'div[class="page-break"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { class: 'page-break', ...HTMLAttributes }];
  },

  addCommands() {
    return {
      insertPageBreak: () => ({ commands }) => {
        return commands.insertContent({ type: this.name });
      },
    };
  },
});

export default PageBreakExtension;