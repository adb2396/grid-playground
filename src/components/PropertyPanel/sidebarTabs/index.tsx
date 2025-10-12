import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContainerTab } from './containerTab'
import { ItemsTab } from './itemsTab'

export const SidebarTabs = () => {
	return (
		<Tabs color="default" defaultValue="container" className="w-full">
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger value="container">Container</TabsTrigger>
				<TabsTrigger value="items">Items</TabsTrigger>
			</TabsList>
			<ContainerTab />
			<ItemsTab />
		</Tabs>
	)
}
