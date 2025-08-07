import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  FileText,
  Undo2,
  Redo2,
  Ruler
} from 'lucide-react';

const Toolbar = ({ editor, insertPageBreak, showRuler, onToggleRuler }) => {
  if (!editor) return null;

  const ToolbarButton = ({ onClick, isActive = false, children, title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-md transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-lg border">
      {/* Undo/Redo */}
      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <Undo2 className="w-4 h-4" />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <Redo2 className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Text Formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive('underline')}
        title="Underline"
      >
        <Underline className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Headings */}
      <select
        value={
          editor.isActive('heading', { level: 1 }) ? 'h1' :
          editor.isActive('heading', { level: 2 }) ? 'h2' :
          editor.isActive('heading', { level: 3 }) ? 'h3' : 'p'
        }
        onChange={(e) => {
          const value = e.target.value;
          if (value === 'p') {
            editor.chain().focus().setParagraph().run();
          } else {
            const level = parseInt(value.replace('h', ''));
            editor.chain().focus().toggleHeading({ level }).run();
          }
        }}
        className="px-2 py-1 text-sm border border-gray-300 rounded"
      >
        <option value="p">Paragraph</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Text Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Page Break */}
      <ToolbarButton
        onClick={insertPageBreak}
        title="Insert Page Break"
      >
        <FileText className="w-4 h-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-gray-300 mx-2" />

      {/* Ruler Toggle */}
      <ToolbarButton
        onClick={onToggleRuler}
        isActive={showRuler}
        title="Toggle Ruler"
      >
        <Ruler className="w-4 h-4" />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;