import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { SidebarTabs } from './sidebarTabs'

export function PropertyPanel() {
	return (
		<div className="w-1/5 overflow-y-auto no-scrollbar p-4 bg-slate-50 border-r border-slate-200">
			<SidebarTabs />
			<div className="flex items-center space-x-2 px-3 py-2">
				<Switch id="show-grid" />
				<Label htmlFor="show-grid" className="text-sm">
					Show Grid Lines
				</Label>
			</div>
		</div>
	)
}
