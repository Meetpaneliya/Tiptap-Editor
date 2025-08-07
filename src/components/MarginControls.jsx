import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const MarginControls = ({ margins, onMarginsChange }) => {
  const [showControls, setShowControls] = useState(false);

  const handleMarginChange = (side, value) => {
    const numValue = parseInt(value) || 0;
    onMarginsChange({
      ...margins,
      [side]: numValue
    });
  };

  const presets = [
    { name: 'Narrow', margins: { top: 48, right: 48, bottom: 48, left: 48 } },
    { name: 'Normal', margins: { top: 96, right: 72, bottom: 96, left: 72 } },
    { name: 'Wide', margins: { top: 96, right: 144, bottom: 96, left: 144 } },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowControls(!showControls)}
        className="flex items-center gap-2 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
      >
        <Settings className="w-4 h-4" />
        Margins
      </button>

      {showControls && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-80">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Page Margins</h3>
          
          {/* Presets */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">Presets</label>
            <div className="flex gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => onMarginsChange(preset.margins)}
                  className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Margins */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Top</label>
              <input
                type="number"
                value={margins.top}
                onChange={(e) => handleMarginChange('top', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Right</label>
              <input
                type="number"
                value={margins.right}
                onChange={(e) => handleMarginChange('right', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Bottom</label>
              <input
                type="number"
                value={margins.bottom}
                onChange={(e) => handleMarginChange('bottom', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Left</label>
              <input
                type="number"
                value={margins.left}
                onChange={(e) => handleMarginChange('left', e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="200"
              />
            </div>
          </div>

          <button
            onClick={() => setShowControls(false)}
            className="mt-3 w-full px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default MarginControls;