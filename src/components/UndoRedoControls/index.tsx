import { Button } from '@/components/ui/button'
import { Undo2, Redo2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useGridStore } from '@/stores/gridStore'

export const UndoRedoControls = () => {
	const undo = useGridStore((state) => state.undo)
	const redo = useGridStore((state) => state.redo)
	const canUndo = useGridStore((state) => state.canUndo())
	const canRedo = useGridStore((state) => state.canRedo())
	const historyCount = useGridStore((state) => state.history.past.length)

	return (
		<div className="flex items-center gap-1">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="sm" onClick={undo} disabled={!canUndo} className="gap-1">
							<Undo2 className="h-4 w-4" />
							{/* <span className="hidden sm:inline">Undo</span> */}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Undo (⌘Z)</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant="ghost" size="sm" onClick={redo} disabled={!canRedo} className="gap-1">
							<Redo2 className="h-4 w-4" />
							{/* <span className="hidden sm:inline">Redo</span> */}
						</Button>
					</TooltipTrigger>
					<TooltipContent>
						<p>Redo (⌘⇧Z)</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			{historyCount > 0 && (
				<span className="text-xs text-muted-foreground hidden md:inline">
					{historyCount} action{historyCount > 1 ? 's' : ''}
				</span>
			)}
		</div>
	)
}
