// src/stores/types.ts

// Base item info
export interface BaseItem {
	id: string
	name: string
	isGridContainer: boolean
	children: GridItem[]
}

// Grid positioning (where item sits in parent grid)
export interface GridPlacement {
	gridColumn?: string
	gridRow?: string
	gridColumnStart?: string
	gridColumnEnd?: string
	gridRowStart?: string
	gridRowEnd?: string
}

// Grid container properties
export interface GridContainerProps {
	gridTemplateColumns?: string
	gridTemplateRows?: string
	gridTemplateAreas?: string
	gridAutoFlow?: string
	gridAutoColumns?: string
	gridAutoRows?: string
	gap?: string
	rowGap?: string
	columnGap?: string
	justifyContent?: string
	alignContent?: string
	justifyItems?: string
	alignItems?: string
}

// Item self-alignment properties
export interface GridItemAlignment {
	justifySelf?: string
	alignSelf?: string
}

// Sizing properties
export interface ItemSize {
	width?: string
	height?: string
	minWidth?: string
	maxWidth?: string
	minHeight?: string
	maxHeight?: string
}

// Visual styling
export interface ItemStyle {
	backgroundColor?: string
	border?: string
	borderRadius?: string
	padding?: string
	margin?: string
}

// Combined GridItem type
export type GridItem = BaseItem &
	GridPlacement &
	GridContainerProps &
	GridItemAlignment &
	ItemSize &
	ItemStyle

// Root grid state
export interface RootGridState {
	grids: GridItem[]
	selectedItemId: string | null
	showGridLines: boolean
}

// Actions
export interface GridActions {
	// Grid management
	addGrid: () => void
	removeGrid: (id: string) => void

	// Item management
	addItem: (parentId: string) => void
	removeItem: (id: string) => void
	selectItem: (id: string | null) => void

	// Update items
	updateItem: (id: string, updates: Partial<GridItem>) => void
	updateGridPlacement: (id: string, placement: Partial<GridPlacement>) => void
	updateGridContainer: (id: string, props: Partial<GridContainerProps>) => void
	updateItemSize: (id: string, size: Partial<ItemSize>) => void
	updateItemStyle: (id: string, style: Partial<ItemStyle>) => void

	// Toggle
	toggleItemAsGrid: (id: string) => void

	// View
	setShowGridLines: (show: boolean) => void

	// Helper
	getSelectedItem: () => GridItem | null
}

export type GridStore = RootGridState & GridActions
