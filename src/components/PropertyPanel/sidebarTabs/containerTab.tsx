import { TabsContent } from '@/components/ui/tabs'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
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
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const ContainerTab = () => {
	return (
		<TabsContent value="container" className="space-y-4">
			{/* Add grid container */}
			<SidebarGroup>
				<SidebarGroupLabel>Grid Container</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-2">
					<Button variant="outline" className="w-full justify-start">
						<Plus className="mr-2 h-4 w-4" />
						Add Grid Container
					</Button>
				</SidebarGroupContent>
			</SidebarGroup>
			{/* Grid Template */}
			<SidebarGroup>
				<SidebarGroupLabel>Grid Template</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="grid-columns">Template Columns</Label>
						<Input id="grid-columns" placeholder="1fr 1fr 1fr" defaultValue="1fr 1fr 1fr" />
						<p className="text-xs text-muted-foreground">
							e.g., 1fr 1fr, 200px 1fr, repeat(3, 1fr)
						</p>
					</div>

					<div className="space-y-2">
						<Label htmlFor="grid-rows">Template Rows</Label>
						<Input id="grid-rows" placeholder="auto" defaultValue="auto" />
					</div>
				</SidebarGroupContent>
			</SidebarGroup>

			{/* Gap Controls */}
			<SidebarGroup>
				<SidebarGroupLabel>Gap</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex justify-between">
							<Label>Row Gap</Label>
							<span className="text-sm text-muted-foreground">16px</span>
						</div>
						<Slider defaultValue={[16]} max={100} step={4} className="w-full" />
					</div>

					<div className="space-y-2">
						<div className="flex justify-between">
							<Label>Column Gap</Label>
							<span className="text-sm text-muted-foreground">16px</span>
						</div>
						<Slider defaultValue={[16]} max={100} step={4} className="w-full" />
					</div>
				</SidebarGroupContent>
			</SidebarGroup>

			{/* Alignment */}
			<SidebarGroup>
				<SidebarGroupLabel>Alignment</SidebarGroupLabel>
				<SidebarGroupContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="justify-content">Justify Content</Label>
						<Select defaultValue="start">
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
					</div>

					<div className="space-y-2">
						<Label htmlFor="align-content">Align Content</Label>
						<Select defaultValue="start">
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
					</div>
				</SidebarGroupContent>
			</SidebarGroup>

			{/* Auto Flow */}
			<SidebarGroup>
				<SidebarGroupLabel>Auto Flow</SidebarGroupLabel>
				<SidebarGroupContent>
					<Select defaultValue="row">
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="row">Row</SelectItem>
							<SelectItem value="column">Column</SelectItem>
							<SelectItem value="row dense">Row Dense</SelectItem>
							<SelectItem value="column dense">Column Dense</SelectItem>
						</SelectContent>
					</Select>
				</SidebarGroupContent>
			</SidebarGroup>
		</TabsContent>
	)
}
