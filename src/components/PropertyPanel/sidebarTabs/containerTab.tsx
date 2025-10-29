import { TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGridStore } from '@/stores/gridStore'
import { useEffect, useState } from 'react'

export const ContainerTab = () => {
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const updateGridContainer = useGridStore((state) => state.updateGridContainer)

	// Helper function to parse gap values (handles "16px", "1rem", etc.)
	const parseGapValue = (gapString: string | undefined, defaultValue = 16): number => {
		if (!gapString) return defaultValue
		const parsed = parseInt(gapString)
		return isNaN(parsed) ? defaultValue : parsed
	}

	// Local state for sliders to show current value
	const [rowGapValue, setRowGapValue] = useState(() => parseGapValue(selectedItem?.rowGap, 16))
	const [columnGapValue, setColumnGapValue] = useState(() =>
		parseGapValue(selectedItem?.columnGap, 16)
	)

	// Sync slider values when selected item changes
	useEffect(() => {
		if (selectedItem && selectedItem.id) {
			setRowGapValue(parseGapValue(selectedItem.rowGap, 16))
			setColumnGapValue(parseGapValue(selectedItem.columnGap, 16))
		}
	}, [selectedItem, selectedItem?.id])

	return (
		<TabsContent
			value="container"
			className="space-y-6 overflow-y-auto max-h-[calc(100vh-13.5rem)] no-scrollbar"
		>
			{/* Grid Template */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
					Grid Template
				</h3>

				<div className="space-y-2">
					<Label htmlFor="grid-columns">Template Columns</Label>
					<Input
						id="grid-columns"
						placeholder="1fr 1fr"
						value={selectedItem?.gridTemplateColumns || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gridTemplateColumns: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">e.g., 1fr 1fr, 200px 1fr, repeat(3, 1fr)</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-rows">Template Rows</Label>
					<Input
						id="grid-rows"
						placeholder="100px auto"
						value={selectedItem?.gridTemplateRows || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gridTemplateRows: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">e.g., 100px auto, repeat(2, 1fr)</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-areas">Template Areas</Label>
					<Input
						id="grid-areas"
						placeholder='"header header" "sidebar main"'
						value={selectedItem?.gridTemplateAreas || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gridTemplateAreas: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">Named grid areas (advanced)</p>
				</div>
			</div>

			{/* Gap Controls */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Gap</h3>

				<div className="space-y-2">
					<Label htmlFor="gap">Gap (shorthand)</Label>
					<Input
						id="gap"
						placeholder="1rem"
						value={selectedItem?.gap || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gap: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">Sets both row and column gap</p>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between">
						<Label>Row Gap</Label>
						<span className="text-sm text-muted-foreground">{rowGapValue}px</span>
					</div>
					<Slider
						value={[rowGapValue]}
						onValueChange={(value) => {
							setRowGapValue(value[0])
							updateGridContainer(selectedItem?.id || '', {
								rowGap: `${value[0]}px`,
							})
						}}
						max={100}
						step={4}
						className="w-full"
					/>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between">
						<Label>Column Gap</Label>
						<span className="text-sm text-muted-foreground">{columnGapValue}px</span>
					</div>
					<Slider
						value={[columnGapValue]}
						onValueChange={(value) => {
							setColumnGapValue(value[0])
							updateGridContainer(selectedItem?.id || '', {
								columnGap: `${value[0]}px`,
							})
						}}
						max={100}
						step={4}
						className="w-full"
					/>
				</div>
			</div>

			{/* Auto Properties */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Auto Sizing</h3>

				<div className="space-y-2">
					<Label htmlFor="auto-flow">Auto Flow</Label>
					<Select
						value={selectedItem?.gridAutoFlow || 'row'}
						onValueChange={(value) =>
							updateGridContainer(selectedItem?.id || '', {
								gridAutoFlow: value,
							})
						}
					>
						<SelectTrigger id="auto-flow">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="row">Row</SelectItem>
							<SelectItem value="column">Column</SelectItem>
							<SelectItem value="row dense">Row Dense</SelectItem>
							<SelectItem value="column dense">Column Dense</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label htmlFor="auto-columns">Auto Columns</Label>
					<Input
						id="auto-columns"
						placeholder="auto"
						value={selectedItem?.gridAutoColumns || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gridAutoColumns: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">Size of auto-generated columns</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="auto-rows">Auto Rows</Label>
					<Input
						id="auto-rows"
						placeholder="auto"
						value={selectedItem?.gridAutoRows || ''}
						onChange={(e) =>
							updateGridContainer(selectedItem?.id || '', {
								gridAutoRows: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">Size of auto-generated rows</p>
				</div>
			</div>

			{/* Content Alignment */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
					Content Alignment
				</h3>

				<div className="space-y-2">
					<Label htmlFor="justify-content">Justify Content</Label>
					<Select
						value={selectedItem?.justifyContent || 'start'}
						onValueChange={(value) =>
							updateGridContainer(selectedItem?.id || '', {
								justifyContent: value,
							})
						}
					>
						<SelectTrigger id="justify-content">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
							<SelectItem value="space-between">Space Between</SelectItem>
							<SelectItem value="space-around">Space Around</SelectItem>
							<SelectItem value="space-evenly">Space Evenly</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns grid along row axis</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="align-content">Align Content</Label>
					<Select
						value={selectedItem?.alignContent || 'start'}
						onValueChange={(value) =>
							updateGridContainer(selectedItem?.id || '', {
								alignContent: value,
							})
						}
					>
						<SelectTrigger id="align-content">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
							<SelectItem value="space-between">Space Between</SelectItem>
							<SelectItem value="space-around">Space Around</SelectItem>
							<SelectItem value="space-evenly">Space Evenly</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns grid along column axis</p>
				</div>
			</div>

			{/* Items Alignment */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
					Items Alignment
				</h3>

				<div className="space-y-2">
					<Label htmlFor="justify-items">Justify Items</Label>
					<Select
						value={selectedItem?.justifyItems || 'stretch'}
						onValueChange={(value) =>
							updateGridContainer(selectedItem?.id || '', {
								justifyItems: value,
							})
						}
					>
						<SelectTrigger id="justify-items">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns items horizontally in cells</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="align-items">Align Items</Label>
					<Select
						value={selectedItem?.alignItems || 'stretch'}
						onValueChange={(value) =>
							updateGridContainer(selectedItem?.id || '', {
								alignItems: value,
							})
						}
					>
						<SelectTrigger id="align-items">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns items vertically in cells</p>
				</div>
			</div>
		</TabsContent>
	)
}
