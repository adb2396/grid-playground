import { SidebarTabs } from './sidebarTabs'

export function PropertyPanel() {
	return (
		<aside className="w-80 bg-card border-r border-border overflow-y-auto no-scrollbar">
			<div className="p-4 border-b border-border">
				<h2 className="text-sm font-semibold text-muted-foreground">Grid Properties</h2>
			</div>
			<div className="h-full flex flex-col p-4">
				<SidebarTabs />
			</div>
		</aside>
	)
}
