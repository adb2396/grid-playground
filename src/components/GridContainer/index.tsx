import { Plus, Trash2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'
import { useGridStore } from '@/stores/gridStore'
import type { GridItem } from '@/stores/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { GridRenderer } from './gridRenderer'

export const GridContainer: React.FC = () => {
	const grids = useGridStore((state) => state.grids) as GridItem[]
	const selectedItemId = useGridStore((state) => state.selectedItemId)
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const addGrid = useGridStore((state) => state.addGrid)
	const addItem = useGridStore((state) => state.addItem)
	const removeItem = useGridStore((state) => state.removeItem)
	const removeGrid = useGridStore((state) => state.removeGrid)
	const selectItem = useGridStore((state) => state.selectItem)

	// Grid lines
	const showGridLines = useGridStore((state) => state.showGridLines)
	const setShowGridLines = useGridStore((state) => state.setShowGridLines)

	// Check if a grid container is selected for the add button
	const canAddItem = selectedItem?.isGridContainer

	// Check if selected item is a root grid
	const isRootGrid = selectedItem && grids.some((grid) => grid.id === selectedItem.id)

	const handleDelete = () => {
		if (!selectedItemId) return

		// Use appropriate delete action
		if (isRootGrid) {
			removeGrid(selectedItemId)
		} else {
			removeItem(selectedItemId)
		}

		// Clear selection
		selectItem(null)
	}

	return (
		<main className="h-full flex-1 flex flex-col">
			{/* Toolbar */}
			<div className="h-14 flex items-center justify-between px-4 gap-4">
				<div className="flex items-center gap-2">
					<Button size="sm" onClick={addGrid} title="Add Container">
						<Plus />
						Add Container
					</Button>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span>
									<Button
										variant="outline"
										size="sm"
										onClick={() => selectedItem && addItem(selectedItem.id)}
										disabled={!canAddItem}
									>
										<Plus />
										Add Item
									</Button>
								</span>
							</TooltipTrigger>
							{!canAddItem && (
								<TooltipContent>
									<p>Select a grid container to add an item</p>
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<span>
									<Button
										variant="destructive"
										size="sm"
										onClick={handleDelete}
										disabled={!selectedItemId}
									>
										<Trash2 />
										Delete
									</Button>
								</span>
							</TooltipTrigger>
							{!selectedItemId && (
								<TooltipContent>
									<p>Select an item or container to delete</p>
								</TooltipContent>
							)}
						</Tooltip>
					</TooltipProvider>
				</div>
				<div className="flex items-center gap-6">
					{/* Show Grid Lines Toggle */}
					<div className="flex items-center space-x-2">
						<Switch id="show-grid" checked={showGridLines} onCheckedChange={setShowGridLines} />
						<Label htmlFor="show-grid" className="text-sm text-muted-foreground cursor-pointer">
							Show Grid Lines
						</Label>
					</div>
				</div>
			</div>
			{/* Grid Visualization Area */}
			<div className="flex-1 overflow-auto p-8">
				{grids.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center">
						<div className="text-muted-foreground mb-4">
							<Plus className="h-16 w-16 mx-auto mb-2 opacity-20" />
							<h3 className="text-lg font-medium mb-1">No grid containers yet</h3>
							<p className="text-sm">Click "Add Container" to get started</p>
						</div>
					</div>
				) : (
					grids.map((grid) => <GridRenderer key={grid.id} item={grid} />)
				)}
			</div>
		</main>
	)
}
