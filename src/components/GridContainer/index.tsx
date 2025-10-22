import { Plus } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Switch } from '../ui/switch'

export const GridContainer: React.FC = () => {
	return (
		<main className="flex-1 flex flex-col bg-muted/60">
			{/* Toolbar */}
			<div className="h-14 flex items-center justify-between px-4 gap-4">
				<div className="flex items-center gap-2">
					<Button variant="default" size="sm">
						<Plus className="h-4 w-4 mr-1" />
						Add Container
					</Button>
				</div>
				<div className="flex items-center gap-6">
					{/* Show Grid Lines Toggle */}
					<div className="flex items-center space-x-2">
						<Switch id="show-grid" defaultChecked />
						<Label htmlFor="show-grid" className="text-sm text-muted-foreground cursor-pointer">
							Show Grid Lines
						</Label>
					</div>
				</div>
			</div>
			{/* Grid Visualization Area */}
			<div className="flex-1 overflow-auto p-8">
				{/* Your grid items will go here */}
				<div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
					{/* Grid items */}
				</div>
			</div>
		</main>
	)
}
