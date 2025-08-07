# Tiptap Pagination Editor

A professional document editor built with [Tiptap](https://tiptap.dev/) and React, featuring A4 pagination, headers/footers, manual and automatic page breaks, print-friendly styling, zoom, margin controls, watermark, and a page sidebar.

**Live Demo:**  
[https://willowy-sable-0d3520.netlify.app/](https://willowy-sable-0d3520.netlify.app/)

## Features

- **A4 page layout** with visual boundaries
- **Manual page breaks** via toolbar button
- **Automatic page breaks** when content overflows
- **Headers and footers** with dynamic page numbers
- **Print-friendly** output (WYSIWYG)
- **Zoom controls** for better viewing
- **Adjustable margins**
- **Sidebar** with page thumbnails and navigation
- **Watermark** support
- **Rich text formatting** (bold, italic, underline, headings, lists, alignment, etc.)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Meetpaneliya/Tiptap-Editor.git
   cd tiptap-pagination-editor
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Development Server

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the editor.

### Building for Production

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

## Project Structure

- [`src/App.jsx`](src/App.jsx): Main app entry
- [`src/components/DocumentEditor.jsx`](src/components/DocumentEditor.jsx): Core editor logic and UI
- [`src/components/Toolbar.jsx`](src/components/Toolbar.jsx): Formatting and page break controls
- [`src/components/Sidebar.jsx`](src/components/Sidebar.jsx): Page navigation and thumbnails
- [`src/components/MarginControls.jsx`](src/components/MarginControls.jsx): Margin adjustment UI
- [`src/components/ZoomControls.jsx`](src/components/ZoomControls.jsx): Zoom UI
- [`src/extensions/PageBreakExtension.js`](src/extensions/PageBreakExtension.js): Custom Tiptap extension for page breaks
- [`src/styles/editor.css`](src/styles/editor.css): Editor and print styles

## Customization

- **Header/Footer/Watermark:** Set via input fields above the editor.
- **Margins:** Adjust using the margin controls.
- **Zoom:** Use the zoom controls to change the editor scale.
- **Sidebar:** Add, delete, and navigate pages.

## License

MIT

---

Built with [Tiptap](https://tiptap.dev/), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).