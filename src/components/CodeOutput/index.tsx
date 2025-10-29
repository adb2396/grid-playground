import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGridStore } from '@/stores/gridStore'
import {
	generateCompleteCSS,
	generateGridContainerCSS,
	generateGridItemCSS,
	generateCompleteHTML,
	generateFullHTMLPage,
} from '@/utils/codeGeneratorUtils'
import { Copy, Check } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeOutputProps {
	isCollapsed: boolean
	onToggleCollapse: () => void
}

export const CodeOutput = ({ isCollapsed, onToggleCollapse }: CodeOutputProps) => {
	const grids = useGridStore((state) => state.grids)
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const [copied, setCopied] = useState(false)
	const [currentTab, setCurrentTab] = useState<'css' | 'html' | 'full'>('css')

	// Check if dark mode is active
	const isDark = document.documentElement.classList.contains('dark')

	// Generate CSS based on selection
	const cssCode = selectedItem
		? selectedItem.isGridContainer
			? generateGridContainerCSS(selectedItem)
			: generateGridItemCSS(selectedItem)
		: generateCompleteCSS(grids)

	// Generate HTML
	const htmlCode = generateCompleteHTML(grids)

	// Generate full HTML page
	const fullHTMLCode = generateFullHTMLPage(grids)

	// Get current code based on active tab
	const getCurrentCode = () => {
		switch (currentTab) {
			case 'css':
				return cssCode
			case 'html':
				return htmlCode
			case 'full':
				return fullHTMLCode
			default:
				return cssCode
		}
	}

	const handleCopy = async () => {
		await navigator.clipboard.writeText(getCurrentCode())
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const getLanguage = () => {
		return currentTab === 'css' ? 'css' : 'html'
	}

	return (
		<div className="h-full flex flex-col bg-card border-t border-border">
			{/* Header with Tabs */}
			<div
				className={`
					flex items-center justify-between px-4 py-2 border-b border-border cursor-pointer 
					hover:bg-primary/20
				`}
				onClick={onToggleCollapse}
			>
				<Tabs value={currentTab} onValueChange={(v) => setCurrentTab(v as any)} className="flex-1">
					<div className="flex items-center justify-between">
						<TabsList className="h-9">
							<TabsTrigger value="css" className="text-xs" onClick={(e) => e.stopPropagation()}>
								CSS Only
							</TabsTrigger>
							<TabsTrigger value="html" className="text-xs" onClick={(e) => e.stopPropagation()}>
								HTML Only
							</TabsTrigger>
							<TabsTrigger value="full" className="text-xs" onClick={(e) => e.stopPropagation()}>
								Full Page
							</TabsTrigger>
						</TabsList>

						<Button
							variant="ghost"
							size="sm"
							onClick={(e) => {
								e.stopPropagation()
								handleCopy()
							}}
							className="gap-2"
						>
							{copied ? (
								<>
									<Check className="h-4 w-4" />
									Copied!
								</>
							) : (
								<>
									<Copy className="h-4 w-4" />
									Copy
								</>
							)}
						</Button>
					</div>
				</Tabs>
			</div>

			{/* Code Display with Syntax Highlighting */}
			{!isCollapsed && (
				<div className="flex-1 overflow-auto">
					{getCurrentCode() ? (
						<SyntaxHighlighter
							language={getLanguage()}
							style={isDark ? oneDark : oneLight}
							customStyle={{
								margin: 0,
								padding: '1rem',
								background: 'transparent',
								fontSize: '0.875rem',
								lineHeight: '1.5',
							}}
							showLineNumbers
							wrapLongLines
						>
							{getCurrentCode()}
						</SyntaxHighlighter>
					) : (
						<div className="flex items-center justify-center h-full text-center text-muted-foreground">
							<p>Create a grid container to see generated code</p>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
