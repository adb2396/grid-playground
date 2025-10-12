import { Button } from '@/components/ui/button'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { TabsContent } from '@/components/ui/tabs'
import { Plus, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export const ItemsTab = () => {
	return (
		<TabsContent value="items" className="space-y-4">
			{/* Item List */}
			<div>
				<SidebarGroupLabel>Grid Items</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-2">
					<Button variant="outline" className="w-full justify-start">
						<Plus className="mr-2 h-4 w-4" />
						Add Item
					</Button>

					{/* Example items - would be dynamic */}
					<div className="space-y-2">
						<div className="flex items-center justify-between p-2 rounded border bg-muted/50">
							<span className="text-sm">Item 1</span>
							<Button variant="ghost" size="icon" className="h-6 w-6">
								<Trash2 className="h-3 w-3" />
							</Button>
						</div>
					</div>
				</SidebarGroupContent>
			</div>

			{/* Selected Item Properties */}
			<SidebarGroup>
				<SidebarGroupLabel>Selected Item Properties</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-4">
					<div className="space-y-2">
						<Label>Grid Column</Label>
						<div className="flex flex-col gap-2">
							<Input placeholder="start" className="flex-1" />
							<Input placeholder="end" className="flex-1" />
						</div>
					</div>

					<div className="space-y-2">
						<Label>Grid Row</Label>
						<div className="flex flex-col gap-2">
							<Input placeholder="start" className="flex-1" />
							<Input placeholder="end" className="flex-1" />
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
				</SidebarGroupContent>
			</SidebarGroup>
		</TabsContent>
	)
}
