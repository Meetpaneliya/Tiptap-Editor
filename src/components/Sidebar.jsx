import React from 'react';
import { Plus, Trash2, Menu, X } from 'lucide-react';

const Sidebar = ({ 
  pages, 
  currentPage, 
  onPageSelect, 
  onAddPage, 
  onDeletePage, 
  isOpen, 
  onToggle 
}) => {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 left-6 z-50 p-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-all duration-300"
        style={{ 
          transform: isOpen ? 'translateX(280px)' : 'translateX(0px)',
        }}
      >
        {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ width: '280px' }}>
        <div className="p-4 pt-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pages</h2>
            <button
              onClick={onAddPage}
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              title="Add New Page"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-120px)] overflow-y-auto">
            {pages.map((page) => (
              <div
                key={page.id}
                className={`group relative p-3 border rounded-lg cursor-pointer transition-all ${
                  currentPage === page.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => onPageSelect(page.id)}
              >
                {/* Page Thumbnail */}
                <div className="w-full h-32 bg-white border border-gray-200 rounded mb-2 overflow-hidden">
                  <div className="p-2 text-xs text-gray-600 leading-tight">
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: page.content.replace(/<[^>]*>/g, ' ').substring(0, 150) + '...' 
                      }} 
                    />
                  </div>
                </div>

                {/* Page Info */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Page {page.id}
                  </span>
                  
                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePage(page.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                      title="Delete Page"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Current Page Indicator */}
                {currentPage === page.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;