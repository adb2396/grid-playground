import './App.css'
import { PropertyPanel } from '@/components/PropertyPanel'
import { Separator } from './components/ui/separator'

function App() {
	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<header className="h-16 bg-primary shadow-sm flex items-center p-4 gap-2">
				<h1 className="text-xl font-semibold text-primary-foreground">CSS Grid Playground</h1>
				<Separator orientation="vertical" className="w-1 bg-primary-foreground/20" />
				<span className="text-xs text-primary-foreground/80">
					A tool for learning and experimenting with CSS Grid
				</span>
			</header>

			<div className="w-full h-[calc(100vh-64px)] flex">
				{/* Sidebar - Property Panel */}
				<PropertyPanel />

				{/* Grid Container */}
				<main className="flex-1"></main>
			</div>
		</div>
	)
}

export default App
