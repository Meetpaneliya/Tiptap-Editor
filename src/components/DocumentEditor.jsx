import React, { useState, useRef, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Toolbar from './Toolbar';
import Sidebar from './Sidebar';
import ZoomControls from './ZoomControls';
import MarginControls from './MarginControls';
import PageBreakExtension from '../extensions/PageBreakExtension';
import '../styles/editor.css';

const DocumentEditor = () => {
  const [pages, setPages] = useState([
    {
      id: 1,
      content: `
        <h1>Sample Document</h1>
        <p>This is a demonstration of a Tiptap editor with pagination support. The editor automatically creates new pages when content overflows the current page boundaries.</p>
        
        <h2>Features Included:</h2>
        <ul>
          <li>A4 page dimensions with visual boundaries</li>
          <li>Manual page breaks via toolbar</li>
          <li>Automatic page breaks when content overflows</li>
          <li>Headers and footers with dynamic page numbers</li>
          <li>Print-friendly styling</li>
          <li>Professional document editing interface</li>
          <li>Zoom controls for better viewing</li>
          <li>Margin adjustments</li>
          <li>Page thumbnails sidebar</li>
          <li>Watermark support</li>
        </ul>

        <h2>Typography Support</h2>
        <p>The editor supports various text formatting options including <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and different heading levels.</p>

        <p>You can also create lists, add links, and format text alignment. The content automatically flows across multiple pages as needed.</p>
      `
    }
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [headerText, setHeaderText] = useState('Document Header');
  const [footerText, setFooterText] = useState('Document Footer');
  const [zoom, setZoom] = useState(100);
  const [margins, setMargins] = useState({ top: 96, right: 72, bottom: 96, left: 72 });
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [showWatermark, setShowWatermark] = useState(true);
  const [showRuler, setShowRuler] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const editorRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextStyle,
      FontFamily,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      PageBreakExtension,
    ],
    content: pages.find(p => p.id === currentPage)?.content || '',
    onUpdate: ({ editor }) => {
      updatePageContent(currentPage, editor.getHTML());
    },
  });

  const updatePageContent = (pageId, content) => {
    setPages(prev => prev.map(page => 
      page.id === pageId ? { ...page, content } : page
    ));
  };

  const addNewPage = () => {
    const newPageId = Math.max(...pages.map(p => p.id)) + 1;
    const newPage = {
      id: newPageId,
      content: '<p>New page content...</p>'
    };
    setPages(prev => [...prev, newPage]);
    setCurrentPage(newPageId);
  };

  const deletePage = (pageId) => {
    if (pages.length > 1) {
      setPages(prev => prev.filter(p => p.id !== pageId));
      if (currentPage === pageId) {
        setCurrentPage(pages[0].id);
      }
    }
  };

  const switchToPage = (pageId) => {
    if (editor && currentPage !== pageId) {
      updatePageContent(currentPage, editor.getHTML());
      setCurrentPage(pageId);
      const pageContent = pages.find(p => p.id === pageId)?.content || '';
      editor.commands.setContent(pageContent);
    }
  };

  const insertPageBreak = () => {
    if (editor) {
      editor.commands.insertContent('<div class="page-break"></div>');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (editor) {
      const pageContent = pages.find(p => p.id === currentPage)?.content || '';
      editor.commands.setContent(pageContent);
    }
  }, [currentPage, editor]);

  if (!editor) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        pages={pages}
        currentPage={currentPage}
        onPageSelect={switchToPage}
        onAddPage={addNewPage}
        onDeletePage={deletePage}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
        {/* Header Controls */}
        <div className="bg-white border-b border-gray-200 px-6 py-4" style={{ paddingLeft: sidebarOpen ? '24px' : '70px' }}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Document Editor</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Page {currentPage} of {pages.length}
              </span>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Print
              </button>
            </div>
          </div>

          {/* Settings Row */}
          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Header Text
              </label>
              <input
                type="text"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                placeholder="Enter header text..."
              />
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Footer Text
              </label>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-md text-sm"
                placeholder="Enter footer text..."
              />
            </div>
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Watermark
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={watermarkText}
                  onChange={(e) => setWatermarkText(e.target.value)}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                  placeholder="Watermark text..."
                />
                <button
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    showWatermark 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {showWatermark ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          <Toolbar 
            editor={editor} 
            insertPageBreak={insertPageBreak}
            showRuler={showRuler}
            onToggleRuler={() => setShowRuler(!showRuler)}
          />
        </div>

        {/* Controls Bar */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center justify-between" style={{ paddingLeft: sidebarOpen ? '24px' : '60px' }}>
          <MarginControls 
            margins={margins}
            onMarginsChange={setMargins}
          />
          <ZoomControls 
            zoom={zoom}
            onZoomChange={setZoom}
          />
        </div>

        {/* Editor Container */}
        <div className="flex-1 overflow-auto px-6 py-8" style={{ paddingLeft: sidebarOpen ? '24px' : '60px' }}>
          <div className="flex justify-center">
            <div 
              ref={editorRef} 
              className="document-container"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                marginBottom: `${(zoom - 100) * 5}px`
              }}
            >
              {/* Rulers */}
              {showRuler && (
                <>
                  {/* Horizontal Ruler */}
                  <div className="horizontal-ruler">
                    {Array.from({ length: 21 }, (_, i) => (
                      <div key={i} className="ruler-mark" style={{ left: `${i * 37.8}px` }}>
                        <div className="ruler-number">{i}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Vertical Ruler */}
                  <div className="vertical-ruler">
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="ruler-mark" style={{ top: `${i * 37.8}px` }}>
                        <div className="ruler-number">{i}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <EditorContent 
                editor={editor} 
                className="focus:outline-none"
              />
              
              {/* Dynamic Styling */}
              <style jsx>{`
                .document-container {
                  --header-text: "${headerText}";
                  --footer-text: "${footerText}";
                  --watermark-text: "${watermarkText}";
                  --show-watermark: ${showWatermark ? 'block' : 'none'};
                  --margin-top: ${margins.top}px;
                  --margin-right: ${margins.right}px;
                  --margin-bottom: ${margins.bottom}px;
                  --margin-left: ${margins.left}px;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;