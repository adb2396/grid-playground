# 🎨 CSS Grid Playground

<div align="center">

**An interactive web application for learning and experimenting with CSS Grid through real-time visualization and code generation.**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.8-FF6B6B?logo=redux)](https://github.com/pmndrs/zustand)
[![Vitest](https://img.shields.io/badge/Vitest-4.0.5-6E9F18?logo=vitest)](https://vitest.dev/)

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

### 🎯 Core Functionality

- **🔷 Multiple Grid Containers** - Create multiple independent grid containers side-by-side
- **🌳 Nested Grids** - Transform any item into a grid container with unlimited nesting depth
- **📐 Grid Properties** - Full control over grid template columns/rows, gaps, alignment, and auto-flow
- **📍 Item Placement** - Precise control over grid item positioning (column/row start/end, justify/align self)
- **🎨 Visual Styling** - Customize appearance with width, height, background color, borders, padding, and border radius

### 🛠️ Developer Tools

- **👁️ Visual Grid Lines** - Toggle grid line visualization (similar to browser DevTools) for better understanding
- **💻 Code Generation** - Real-time HTML and CSS code generation with syntax highlighting
- **📋 Multiple Output Formats** - Export CSS only, HTML only, or complete HTML page
- **📦 Preset Templates** - Quick start with 5 pre-built layouts:
  - Holy Grail Layout
  - Dashboard Layout
  - Gallery Layout
  - Card Layout
  - Magazine Layout

### 🔄 State Management

- **↩️ Undo/Redo** - Full history support with keyboard shortcuts (Cmd+Z, Cmd+Shift+Z, Cmd+Y)
- **💾 Auto-Save** - Automatic state persistence to localStorage with debounced saves
- **🔗 Share Links** - Generate shareable URLs with compressed state encoding
- **📱 State Restoration** - Auto-restore previous session on page load

### 🎨 User Experience

- **🌓 Dark Mode** - Toggle between light and dark themes
- **⌨️ Keyboard Shortcuts** - Power user workflow with keyboard navigation
- **📱 Responsive Design** - Works seamlessly on desktop and tablet devices
- **🎯 Intuitive UI** - Clean, organized property panels with tabbed interface

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Yarn** or **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/grid-playground.git
cd grid-playground

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## ⌨️ Keyboard Shortcuts

| Shortcut               | Action           |
| ---------------------- | ---------------- |
| `Cmd/Ctrl + Z`         | Undo last action |
| `Cmd/Ctrl + Shift + Z` | Redo last action |
| `Cmd/Ctrl + Y`         | Redo last action |

---

## 🛠️ Tech Stack

### Core

- **[React 19.1.1](https://reactjs.org/)** - UI library
- **[TypeScript 5.9.3](https://www.typescriptlang.org/)** - Type safety
- **[Vite 7.1.7](https://vitejs.dev/)** - Build tool and dev server

### State & Data

- **[Zustand 5.0.8](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[lz-string](https://github.com/pieroxy/lz-string)** - URL compression for sharing

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Tailwind CSS 3.4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Icon library

### Developer Experience

- **[Vitest 4.0.5](https://vitest.dev/)** - Unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Additional Libraries

- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code syntax highlighting
- **[sonner](https://sonner.emilkowal.ski/)** - Toast notifications

---

## 📁 Project Structure

```
grid-playground/
├── src/
│   ├── components/
│   │   ├── CodeOutput/              # Code generation display panel
│   │   ├── GridContainer/           # Main grid visualization area
│   │   │   ├── index.tsx           # Container with toolbar
│   │   │   └── gridRenderer.tsx   # Recursive grid rendering
│   │   ├── PropertyPanel/          # Left sidebar with controls
│   │   │   ├── index.tsx
│   │   │   └── sidebarTabs/
│   │   │       ├── index.tsx       # Tab management
│   │   │       ├── containerTab.tsx    # Container properties
│   │   │       ├── itemsTab.tsx         # Item placement properties
│   │   │       └── appearanceTab.tsx   # Visual styling
│   │   ├── UndoRedoControls/       # Undo/Redo buttons
│   │   ├── common/
│   │   │   └── ShareButton/        # Share link functionality
│   │   └── ui/                     # shadcn/ui components
│   ├── hooks/
│   │   ├── useAutoSave.ts         # Debounced localStorage saves
│   │   ├── useKeyboardShortcuts.ts # Global keyboard shortcuts
│   │   └── use-mobile.ts          # Mobile detection
│   ├── stores/
│   │   ├── types.ts               # TypeScript interfaces
│   │   ├── helpers.ts             # Tree manipulation utilities
│   │   ├── gridStore.ts           # Zustand store
│   │   └── __tests__/
│   │       └── gridStore.test.ts  # Unit tests (17 tests)
│   ├── utils/
│   │   ├── codeGeneratorUtils.ts  # CSS/HTML code generation
│   │   ├── shareUtils.ts          # URL encode/decode
│   │   ├── storageUtils.ts       # localStorage utilities
│   │   ├── styleBuilder.ts       # Inline style builder
│   │   └── templates.ts          # Preset grid layouts
│   ├── test/
│   │   └── setup.ts              # Vitest configuration
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles & CSS variables
├── public/                        # Static assets
├── vitest.config.ts              # Test configuration
└── package.json
```

---

## 🏗️ Architecture

### State Management

The application uses **Zustand** for state management with a nested tree structure:

```typescript
interface RootGridState {
	grids: GridItem[] // Array of root-level grid containers
	selectedItemId: string | null // Currently selected item
	showGridLines: boolean // Grid lines visibility
	history: {
		past: GridItem[][] // Undo history (max 50 states)
		future: GridItem[][] // Redo history
	}
}
```

### GridItem Structure

Each `GridItem` is a composable type that includes:

```typescript
type GridItem = BaseItem & // id, name, isGridContainer, children
	GridPlacement & // gridColumn, gridRow, justifySelf, alignSelf
	GridContainerProps & { styles: VisualStyles } // gridTemplateColumns, gap, etc. // width, height, backgroundColor, etc.
```

### Key Features

- **Nested Grids**: Any item can become a grid container (`isGridContainer: true`)
- **Multiple Root Grids**: Support for multiple independent grid containers
- **Recursive Operations**: All tree operations (add, remove, update) work recursively
- **History Management**: Manual undo/redo with 50-state limit

---

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for unit testing.

### Run Tests

```bash
# Run tests in watch mode
yarn test

# Run tests once
yarn test:run

# Run tests with UI
yarn test:ui

# Run tests with coverage
yarn test:coverage
```

### Test Coverage

Current test suite includes **17 tests** covering:

- ✅ Grid Management (add/remove grids)
- ✅ Item Management (add items)
- ✅ Updates (placement, container, styles, selection)
- ✅ Undo/Redo (basic flow and edge cases)
- ✅ Template Loading
- ✅ Share State (get/load shareable state)

---

## 📜 Available Scripts

```bash
# Development
yarn dev              # Start development server
yarn build            # Build for production
yarn preview          # Preview production build

# Code Quality
yarn lint             # Run ESLint
yarn lint:fix         # Fix ESLint errors
yarn type-check       # Run TypeScript type checking
yarn format           # Format code with Prettier
yarn format:check     # Check code formatting

# Testing
yarn test             # Run tests in watch mode
yarn test:run         # Run tests once
yarn test:ui          # Run tests with UI
yarn test:coverage    # Run tests with coverage
```

---

## 🎨 Usage Examples

### Creating a Grid Container

1. Click **"Add Container"** button in the toolbar
2. Select the container to edit its properties
3. Configure grid template columns/rows, gaps, and alignment

### Adding Grid Items

1. Select a grid container
2. Click **"Add Item"** button
3. Configure item placement using the "Items" tab
4. Customize appearance in the "Appearance" tab

### Creating Nested Grids

1. Add an item to a grid container
2. Select the item
3. Toggle **"Is Grid Container"** in the Container tab
4. The item becomes a nested grid - add items inside it!

### Using Templates

1. Click **"Load Template"** dropdown in the toolbar
2. Select a template (Holy Grail, Dashboard, etc.)
3. Template loads with pre-configured layout

### Sharing Your Work

1. Click **"Share"** button in the header
2. Shareable URL is copied to clipboard
3. Share the URL - it contains the full grid state

---

## 🔄 State Persistence

### Auto-Save

- **Automatic**: State is saved to `localStorage` with 500ms debounce
- **Auto-Restore**: Previous session automatically restored on page load
- **Toast Notification**: Visual feedback when state is restored

### Share Links

- **Compressed**: State is compressed using `lz-string` for shorter URLs
- **Complete State**: Includes all grids and settings
- **No Server**: Everything encoded in the URL itself

---

## 🎨 Design System

### Colors

- **Primary**: CSS Grid blue (`#1e40af`)
- **Secondary**: Grid lines (`#ef4444` - red outline)
- **Background**: Light gray (`#f9fafb`)

### Typography

- **Headings**: Inter font family
- **Code**: JetBrains Mono (via syntax highlighter)
- **Body**: System font stack

### Spacing

- Base unit: 4px
- Component padding: 16px
- Grid gaps: Configurable via UI

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the code standards below
4. **Commit changes** using conventional commits (`git commit -m 'feat: add amazing feature'`)
5. **Push to branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Code Standards

- ✅ **ESLint** - Code quality and consistency
- ✅ **Prettier** - Automatic code formatting
- ✅ **TypeScript** - Strict type checking
- ✅ **Conventional Commits** - Standardized commit messages
- ✅ **Pre-commit Hooks** - Automatic linting and formatting

### Git Hooks

The project uses `simple-git-hooks` and `lint-staged` for:

- Pre-commit: Run ESLint and Prettier on staged files
- Commit-msg: Validate commit message format

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/) and [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Inspired by browser DevTools grid visualization

---

<div align="center">

**Made with ❤️ for learning CSS Grid**

[⭐ Star this repo](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>
