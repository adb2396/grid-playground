import './App.css'
import { PropertyPanel } from '@/components/PropertyPanel'
import { Moon, Sun } from 'lucide-react'
import { Button } from './components/ui/button'
import { useEffect, useState } from 'react'
import { GridContainer } from './components/GridContainer'
import { CodeOutput } from './components/CodeOutput'
import { getStateFromURL } from './utils/shareUtils'
import { useGridStore } from './stores/gridStore'
import { ShareButton } from './components/common/ShareButton'

function App() {
	const [isDark, setIsDark] = useState(false)
	const [isCodeCollapsed, setIsCodeCollapsed] = useState(true)

	const loadFromShareableState = useGridStore((state) => state.loadFromShareableState)

	// Load state from URL on mount
	useEffect(() => {
		const sharedState = getStateFromURL()
		if (sharedState) {
			loadFromShareableState(sharedState)
			// Optional: Clean URL after loading
			window.history.replaceState({}, '', window.location.pathname)
		}
	}, [loadFromShareableState])

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}, [isDark])

	return (
		<div className="flex flex-col h-screen">
			{/* Header */}
			<header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 gap-4">
				<div className="flex items-center gap-3">
					<h1 className="text-xl font-semibold text-primary">CSS Grid Playground</h1>
					<div className="h-6 w-px bg-muted-foreground/40" />
					<span className="text-sm text-muted-foreground">Learn and experiment with CSS Grid</span>
				</div>

				<div className="flex items-center gap-2">
					{/* Dark Mode Toggle */}
					<Button
						variant="ghost"
						size="icon"
						onClick={() => setIsDark(!isDark)}
						aria-label="Toggle dark mode"
					>
						{isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
					</Button>
					<ShareButton />
				</div>
			</header>

			<div className="flex-1 flex overflow-hidden">
				<PropertyPanel />
				<div className="flex-1 flex flex-col overflow-hidden">
					{/* Grid Visualization (Top 60%) */}
					<div className="flex-[3] overflow-auto bg-muted/60">
						<GridContainer />
					</div>
					{/* Code Output (Bottom 40%) */}
					<div
						className={`transition-all duration-300 ${isCodeCollapsed ? 'flex-none' : 'flex-[2]'} overflow-hidden`}
					>
						<CodeOutput
							isCollapsed={isCodeCollapsed}
							onToggleCollapse={() => setIsCodeCollapsed(!isCodeCollapsed)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
