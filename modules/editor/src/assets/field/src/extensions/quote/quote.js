import { Node } from "@tiptap/core";

const Quote = Node.create({
  name: "quote",

  content: "text*",

  marks: "subscript superscript",

  selectable: false,

  draggable: false,

  parseHTML() {
    return [
      {
        tag: "blockquote",
      },
    ];
  },

  renderHTML() {
    return ["blockquote", {}, 0];
  },

  addKeyboardShortcuts() {
    return {
      // When enter is pressed while the cursor is at the end of the node's
      // content, insert a new paragraph node below it.
      Enter: ({ editor }) => {
        const { $anchor } = this.editor.state.selection;

        if ($anchor.parent.type.name != this.name) {
          return false;
        }

        const isAtEnd = $anchor.parentOffset == $anchor.parent.nodeSize - 2;
        if (!isAtEnd) {
          return false;
        }

        return editor.commands.insertNodeAfter({ type: "paragraph" });
      },
    };
  },
});

export default Quote;
