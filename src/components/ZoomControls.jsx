import React from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

const ZoomControls = ({ zoom, onZoomChange }) => {
  const zoomLevels = [50, 75, 100, 125, 150, 200];

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex < zoomLevels.length - 1) {
      onZoomChange(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex > 0) {
      onZoomChange(zoomLevels[currentIndex - 1]);
    }
  };

  const handleReset = () => {
    onZoomChange(100);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Zoom:</span>
      
      <button
        onClick={handleZoomOut}
        disabled={zoom <= zoomLevels[0]}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>

      <select
        value={zoom}
        onChange={(e) => onZoomChange(parseInt(e.target.value))}
        className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {zoomLevels.map(level => (
          <option key={level} value={level}>{level}%</option>
        ))}
      </select>

      <button
        onClick={handleZoomIn}
        disabled={zoom >= zoomLevels[zoomLevels.length - 1]}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      <button
        onClick={handleReset}
        className="p-1 text-gray-600 hover:bg-gray-100 rounded ml-2"
        title="Reset Zoom"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ZoomControls;