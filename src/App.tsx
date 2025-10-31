import './App.css'
import { PropertyPanel } from '@/components/PropertyPanel'
import { CheckCircle2, Moon, Sun } from 'lucide-react'
import { Button } from './components/ui/button'
import { useEffect, useState } from 'react'
import { GridContainer } from './components/GridContainer'
import { CodeOutput } from './components/CodeOutput'
import { getStateFromURL } from './utils/shareUtils'
import { useGridStore } from './stores/gridStore'
import { ShareButton } from './components/common/ShareButton'
import { isLocalStorageAvailable, loadFromLocalStorage } from './utils/storageUtils'
import { toast } from 'sonner'
import { useAutoSave } from './hooks/useAutoSave'

function App() {
	const [isDark, setIsDark] = useState(false)
	const [isCodeCollapsed, setIsCodeCollapsed] = useState(true)

	const loadFromShareableState = useGridStore((state) => state.loadFromShareableState)
	const loadStoreFromLocalStorage = useGridStore((state) => state.loadStoreFromLocalStorage)

	// Auto-save to localStorage (debounced 500ms)
	useAutoSave(500)

	// Load state on mount (priority: URL > localStorage)
	useEffect(() => {
		// Priority 1: Check URL for shared state
		let timeoutRef: number | null = null
		const sharedState = getStateFromURL()
		if (sharedState) {
			loadFromShareableState(sharedState)
			// Clean URL after loading
			window.history.replaceState({}, '', window.location.pathname)
			return // Don't load from localStorage if URL has state
		}

		// Priority 2: Check localStorage for saved state
		if (isLocalStorageAvailable()) {
			const savedState = loadFromLocalStorage()
			if (savedState && savedState.grids.length > 0) {
				loadStoreFromLocalStorage({
					grids: savedState.grids,
					showGridLines: savedState.showGridLines,
				})
				// Delay toast slightly to ensure Toaster is mounted
				timeoutRef = setTimeout(() => {
					toast.success('Work restored from last session', {
						description: 'Your previous state has been recovered.',
						duration: 3000,
						icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
					})
				}, 100)
			}
		}

		return () => {
			if (timeoutRef) {
				clearTimeout(timeoutRef)
			}
		}
	}, [loadFromShareableState, loadStoreFromLocalStorage])

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
