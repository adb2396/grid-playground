import { TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useGridStore } from '@/stores/gridStore'

export const AppearanceTab = () => {
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const updateStyles = useGridStore((state) => state.updateStyles)

	const styles = selectedItem?.styles || {}

	return (
		<TabsContent
			value="appearance"
			className="space-y-6 overflow-y-auto max-h-[calc(100vh-13.5rem)] no-scrollbar"
		>
			<p className="text-xs text-muted-foreground">
				Items can have explicit sizes. Use alignment properties to position items within their grid
				cells.
			</p>
			{/* Item Size */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Item Size</h3>

				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-2">
						<Label htmlFor="width">Width</Label>
						<Input
							id="width"
							placeholder="auto"
							value={styles.width || ''}
							onChange={(e) => updateStyles(selectedItem?.id || '', { width: e.target.value })}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="height">Height</Label>
						<Input
							id="height"
							placeholder="auto"
							value={styles.height || ''}
							onChange={(e) => updateStyles(selectedItem?.id || '', { height: e.target.value })}
						/>
					</div>
				</div>
			</div>

			{/* Visual Styling */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">
					Visual Styling
				</h3>

				<div className="space-y-2">
					<Label htmlFor="bg-color">Background Color</Label>
					<div className="flex gap-2">
						<Input
							id="bg-color"
							type="color"
							value={styles.backgroundColor || '#e0e7ff'}
							onChange={(e) =>
								updateStyles(selectedItem?.id || '', { backgroundColor: e.target.value })
							}
							className="w-14 h-10 p-1 cursor-pointer"
						/>
						<Input
							id="bg-color-text"
							placeholder="#e0e7ff"
							value={styles.backgroundColor || ''}
							onChange={(e) =>
								updateStyles(selectedItem?.id || '', { backgroundColor: e.target.value })
							}
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
						onChange={(e) => updateStyles(selectedItem?.id || '', { border: e.target.value })}
					/>
					<p className="text-xs text-muted-foreground">e.g., 2px solid #000, 1px dashed blue</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="border-radius">Border Radius</Label>
					<Input
						id="border-radius"
						placeholder="8px"
						value={styles.borderRadius || ''}
						onChange={(e) => updateStyles(selectedItem?.id || '', { borderRadius: e.target.value })}
					/>
					<p className="text-xs text-muted-foreground">e.g., 4px, 8px, 50%</p>
				</div>
			</div>

			{/* Spacing */}
			<div className="space-y-4">
				<h3 className="text-xs font-semibold text-primary uppercase tracking-wide">Spacing</h3>

				<div className="space-y-2">
					<Label htmlFor="padding">Padding</Label>
					<Input
						id="padding"
						placeholder="1rem"
						value={styles.padding || ''}
						onChange={(e) => updateStyles(selectedItem?.id || '', { padding: e.target.value })}
					/>
					<p className="text-xs text-muted-foreground">e.g., 16px, 1rem, 10px 20px</p>
				</div>
			</div>
		</TabsContent>
	)
}
