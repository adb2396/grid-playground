# CSS Grid Playground

An interactive web application for learning and experimenting with CSS Grid through real-time visualization and code generation.

## 🚀 Overview

CSS Grid Playground is a React-based educational tool that allows users to:
- Create and customize CSS Grid containers
- Add and position grid items
- Visualize grid lines and structure
- Generate production-ready CSS code
- Learn through hands-on experimentation

## 🛠️ Tech Stack

- **Frontend Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with custom configuration)
- **State Management**: Zustand
- **Code Editor**: Monaco Editor (for code display)
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
grid-playground/
├── src/
│   ├── components/
│   │   ├── GridContainer/      # Main grid visualization component
│   │   ├── PropertyPanel/      # Grid property controls
│   │   ├── CodeOutput/         # CSS code generation display
│   │   ├── GridOverlay/        # Visual grid lines overlay
│   │   └── common/             # Reusable UI components
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # Zustand state management
│   ├── utils/                  # Helper functions
│   ├── types/                  # TypeScript type definitions
│   ├── styles/                 # Global styles and Tailwind config
│   └── App.tsx                 # Main application component
├── public/                     # Static assets
└── ...config files
```

## 🏗️ Architecture

### State Management
```typescript
// stores/gridStore.ts
interface GridState {
  container: GridContainer;
  items: GridItem[];
  selectedItemId: string | null;
  showOverlay: boolean;
  // ... other state
}
```

### Key Components

1. **GridContainer Component**
   - Renders the actual CSS Grid
   - Handles item selection and manipulation
   - Applies all grid properties dynamically

2. **PropertyPanel Component**
   - Container properties section
   - Item properties section
   - Organized control groups

3. **CodeOutput Component**
   - Real-time CSS generation
   - Syntax highlighting
   - Copy functionality

4. **GridOverlay Component**
   - Visual grid lines
   - Row/column numbering
   - Gap visualization

### Data Flow
```
User Input → Property Panel → Store → Grid Container → Visual Update
                                 ↓
                           Code Generator → Code Output
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- Yarn or npm

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

### Development Commands
```bash
# Start dev server
yarn dev

# Build for production
yarn build

# Preview production build
yarn preview

# Run linting
yarn lint

# Run type checking
yarn type-check
```

## 💻 Development Guidelines

### Component Structure
```typescript
// Example component structure
interface GridItemProps {
  id: string;
  gridArea?: string;
  children?: React.ReactNode;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

export const GridItem: React.FC<GridItemProps> = ({ 
  id, 
  gridArea, 
  children, 
  isSelected, 
  onSelect 
}) => {
  // Component logic
};
```

### Styling Guidelines
- Use Tailwind CSS utilities
- Follow custom theme configuration
- Component-specific styles in CSS modules when needed

### State Management Best Practices
```typescript
// Use Zustand slices for organization
const useGridStore = create<GridState>((set, get) => ({
  // State
  container: defaultContainer,
  
  // Actions
  updateContainerProperty: (property, value) => set(state => ({
    container: { ...state.container, [property]: value }
  })),
}));
```

## 🧪 Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Testing component interactions
- **E2E Tests**: Playwright for user workflows
- **Visual Tests**: Storybook for component library

## 🎨 Design System

### Colors
- Primary: CSS Grid blue (#1e40af)
- Secondary: Grid lines (#e5e7eb)
- Accent: Selected items (#3b82f6)
- Background: Light gray (#f9fafb)

### Typography
- Headings: Inter font family
- Code: JetBrains Mono
- Body: System font stack

### Spacing
- Base unit: 4px
- Component padding: 16px
- Grid gaps: 8px, 16px, 24px

## 📦 Build

### Build Process
```bash
# Production build
yarn build

# Analyze bundle size
yarn build --analyze
```

### Environment Variables
```env
VITE_APP_VERSION=1.0.0
VITE_ANALYTICS_ID=your-analytics-id
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards
- ESLint configuration for code quality
- Prettier for code formatting
- Husky pre-commit hooks
- Conventional commits
