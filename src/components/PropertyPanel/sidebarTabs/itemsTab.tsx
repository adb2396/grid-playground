import { TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useGridStore } from '@/stores/gridStore'

export const ItemsTab = () => {
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const updateGridPlacement = useGridStore((state) => state.updateGridPlacement)

	return (
		<TabsContent
			value="items"
			className="space-y-6 overflow-y-auto max-h-[calc(100vh-13.5rem)] no-scrollbar"
		>
			{/* Grid Placement - Column */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Grid Column</h3>

				<div className="space-y-2">
					<Label htmlFor="grid-column">Column (shorthand)</Label>
					<Input
						id="grid-column"
						placeholder="1 / 3"
						value={selectedItem?.gridColumn || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridColumn: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">e.g., 1 / 3, span 2, 2 / -1</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-column-start">Column Start</Label>
					<Input
						id="grid-column-start"
						placeholder="1"
						value={selectedItem?.gridColumnStart || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridColumnStart: e.target.value,
							})
						}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-column-end">Column End</Label>
					<Input
						id="grid-column-end"
						placeholder="3"
						value={selectedItem?.gridColumnEnd || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridColumnEnd: e.target.value,
							})
						}
					/>
				</div>
			</div>

			{/* Grid Placement - Row */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Grid Row</h3>

				<div className="space-y-2">
					<Label htmlFor="grid-row">Row (shorthand)</Label>
					<Input
						id="grid-row"
						placeholder="1 / 3"
						value={selectedItem?.gridRow || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridRow: e.target.value,
							})
						}
					/>
					<p className="text-xs text-muted-foreground">e.g., 1 / 3, span 2, 2 / -1</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-row-start">Row Start</Label>
					<Input
						id="grid-row-start"
						placeholder="1"
						value={selectedItem?.gridRowStart || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridRowStart: e.target.value,
							})
						}
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="grid-row-end">Row End</Label>
					<Input
						id="grid-row-end"
						placeholder="3"
						value={selectedItem?.gridRowEnd || ''}
						onChange={(e) =>
							updateGridPlacement(selectedItem?.id || '', {
								gridRowEnd: e.target.value,
							})
						}
					/>
				</div>
			</div>

			{/* Self Alignment */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
					Self Alignment
				</h3>

				<div className="space-y-2">
					<Label htmlFor="justify-self">Justify Self</Label>
					<Select
						value={selectedItem?.justifySelf || 'auto'}
						onValueChange={(value) =>
							updateGridPlacement(selectedItem?.id || '', {
								justifySelf: value,
							})
						}
					>
						<SelectTrigger id="justify-self">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="auto">Auto</SelectItem>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns item horizontally in cell</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="align-self">Align Self</Label>
					<Select
						value={selectedItem?.alignSelf || 'auto'}
						onValueChange={(value) =>
							updateGridPlacement(selectedItem?.id || '', {
								alignSelf: value,
							})
						}
					>
						<SelectTrigger id="align-self">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="auto">Auto</SelectItem>
							<SelectItem value="start">Start</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="end">End</SelectItem>
							<SelectItem value="stretch">Stretch</SelectItem>
						</SelectContent>
					</Select>
					<p className="text-xs text-muted-foreground">Aligns item vertically in cell</p>
				</div>
			</div>
		</TabsContent>
	)
}
