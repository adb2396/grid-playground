import { TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useGridStore } from '@/stores/gridStore'

export const StylingTab = () => {
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const updateStyles = useGridStore((state) => state.updateStyles)

	if (!selectedItem) {
		return (
			<TabsContent value="styling" className="space-y-4">
				<p className="text-sm text-muted-foreground">Select an item to edit styles</p>
			</TabsContent>
		)
	}

	const styles = selectedItem.styles || {}

	return (
		<TabsContent value="styling" className="space-y-4 overflow-y-auto">
			{/* Size Properties */}
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="width" className="text-xs">
							Width
						</Label>
						<Input
							id="width"
							placeholder="auto"
							value={styles.width || ''}
							onChange={(e) => updateStyles(selectedItem.id, { width: e.target.value })}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="height" className="text-xs">
							Height
						</Label>
						<Input
							id="height"
							placeholder="auto"
							value={styles.height || ''}
							onChange={(e) => updateStyles(selectedItem.id, { height: e.target.value })}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="min-width" className="text-xs">
							Min Width
						</Label>
						<Input
							id="min-width"
							placeholder="0"
							value={styles.minWidth || ''}
							onChange={(e) => updateStyles(selectedItem.id, { minWidth: e.target.value })}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="max-width" className="text-xs">
							Max Width
						</Label>
						<Input
							id="max-width"
							placeholder="none"
							value={styles.maxWidth || ''}
							onChange={(e) => updateStyles(selectedItem.id, { maxWidth: e.target.value })}
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="min-height" className="text-xs">
							Min Height
						</Label>
						<Input
							id="min-height"
							placeholder="0"
							value={styles.minHeight || ''}
							onChange={(e) => updateStyles(selectedItem.id, { minHeight: e.target.value })}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="max-height" className="text-xs">
							Max Height
						</Label>
						<Input
							id="max-height"
							placeholder="none"
							value={styles.maxHeight || ''}
							onChange={(e) => updateStyles(selectedItem.id, { maxHeight: e.target.value })}
						/>
					</div>
				</div>
			</div>

			{/* Visual Styling */}
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="bg-color">Background Color</Label>
					<div className="flex gap-2">
						<Input
							id="bg-color"
							type="color"
							value={styles.backgroundColor || '#e0e7ff'}
							onChange={(e) => updateStyles(selectedItem.id, { backgroundColor: e.target.value })}
							className="w-14 h-10 p-1 cursor-pointer"
						/>
						<Input
							id="bg-color-input"
							value={styles.backgroundColor || ''}
							onChange={(e) => updateStyles(selectedItem.id, { backgroundColor: e.target.value })}
							className="flex-1"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="border">Border</Label>
					<Input
						id="border"
						placeholder="1px solid #cbd5e1"
						value={styles.border || ''}
						onChange={(e) => updateStyles(selectedItem.id, { border: e.target.value })}
					/>
					<p className="text-xs text-muted-foreground">e.g., 2px solid #000</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="border-radius">Border Radius</Label>
					<Input
						id="border-radius"
						placeholder="8px"
						value={styles.borderRadius || ''}
						onChange={(e) => updateStyles(selectedItem.id, { borderRadius: e.target.value })}
					/>
				</div>
			</div>

			{/* Spacing */}
			<div className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="padding">Padding</Label>
					<Input
						id="padding"
						placeholder="1rem"
						value={styles.padding || ''}
						onChange={(e) => updateStyles(selectedItem.id, { padding: e.target.value })}
					/>
					<p className="text-xs text-muted-foreground">e.g., 16px, 1rem, 10px 20px</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="margin">Margin</Label>
					<Input
						id="margin"
						placeholder="0"
						value={styles.margin || ''}
						onChange={(e) => updateStyles(selectedItem.id, { margin: e.target.value })}
					/>
				</div>
			</div>
		</TabsContent>
	)
}
