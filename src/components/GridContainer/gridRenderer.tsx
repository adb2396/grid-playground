import { useMemo } from 'react'
import type { GridItem } from '@/stores/types'
import { useGridStore } from '@/stores/gridStore'
import { buildGridItemStyles } from '@/utils/styleBuilder'

interface GridRendererProps {
	item: GridItem
	level?: number
}

export const GridRenderer = ({ item, level = 0 }: GridRendererProps) => {
	const selectedItemId = useGridStore((state) => state.selectedItemId)
	const showGridLines = useGridStore((state) => state.showGridLines)
	const selectItem = useGridStore((state) => state.selectItem)

	const isSelected = selectedItemId === item.id
	const itemStyles = useMemo(() => buildGridItemStyles(item), [item])

	// Add visual grid lines using CSS (works with any grid definition)
	const gridLinesStyle =
		showGridLines && !item.isGridContainer
			? {
					outline: '2px dashed #ef4444',
					outlineOffset: '-1px',
				}
			: {}

	return (
		<div
			onClick={(e) => {
				e.stopPropagation()
				selectItem(item.id)
			}}
			style={{
				...itemStyles,
				...gridLinesStyle,
			}}
			className={`
				relative cursor-pointer transition-all
				${item.isGridContainer ? 'mb-8' : ''}
				${isSelected ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-1 hover:ring-primary/50'}
			`}
		>
			{/* Item Label */}
			<div className="absolute -top-5 left-0 text-xs font-medium text-muted-foreground bg-background px-1 rounded">
				{item.name}
				{item.isGridContainer && <span className="ml-1 text-primary">(Grid)</span>}
			</div>

			{/* Render children recursively */}
			{item.children.map((child) => (
				<GridRenderer key={child.id} item={child} level={level + 1} />
			))}

			{/* Empty state for grid containers */}
			{item.isGridContainer && item.children.length === 0 && (
				<div className="flex items-center justify-center text-xs text-muted-foreground h-full min-h-[200px]">
					Empty grid - select and click "Add Item" in the sidebar
				</div>
			)}
		</div>
	)
}
