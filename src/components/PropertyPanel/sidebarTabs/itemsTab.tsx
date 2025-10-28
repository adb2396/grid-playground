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
import { Button } from '@/components/ui/button'
import { useGridStore } from '@/stores/gridStore'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'

export const ItemsTab = () => {
	const selectedItem = useGridStore((state) => state.getSelectedItem())
	const addItem = useGridStore((state) => state.addItem)

	return (
		<TabsContent value="items" className="space-y-4">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<span>
							<Button
								variant="outline"
								size="sm"
								className="w-full"
								onClick={() => selectedItem && addItem(selectedItem.id)}
								disabled={!selectedItem?.isGridContainer}
							>
								<Plus />
								Add Item
							</Button>
						</span>
					</TooltipTrigger>
					{!selectedItem?.isGridContainer && (
						<TooltipContent>
							<p>Select a grid container to add an item</p>
						</TooltipContent>
					)}
				</Tooltip>
			</TooltipProvider>

			{/* Selected Item Properties */}
			<div className="space-y-2">
				<Label>Grid Column</Label>
				<div className="flex flex-col gap-2">
					<Input placeholder="start" />
					<Input placeholder="end" />
				</div>
			</div>

			<div className="space-y-2">
				<Label>Grid Row</Label>
				<div className="flex flex-col gap-2">
					<Input placeholder="start" />
					<Input placeholder="end" />
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="align-self">Align Self</Label>
				<Select defaultValue="auto">
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
			</div>
		</TabsContent>
	)
}
