import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContainerTab } from './containerTab'
import { ItemsTab } from './itemsTab'
import { StylingTab } from './stylingTab'

export const SidebarTabs = () => {
	return (
		<Tabs color="default" defaultValue="container">
			<TabsList className="w-full mb-2">
				<TabsTrigger value="container" className="flex-1">
					Container
				</TabsTrigger>
				<TabsTrigger value="items" className="flex-1">
					Items
				</TabsTrigger>
				<TabsTrigger value="styling" className="flex-1">
					Styling
				</TabsTrigger>
			</TabsList>
			<ContainerTab />
			<ItemsTab />
			<StylingTab />
		</Tabs>
	)
}
