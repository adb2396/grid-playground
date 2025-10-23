import { create } from 'zustand'
import type {
	GridStore,
	GridItem,
	GridPlacement,
	GridContainerProps,
	ItemSize,
	ItemStyle,
} from './types'
import {
	countAllItems,
	findItemById,
	addItemToParent,
	removeItemFromTree,
	updateItemInTree,
	toggleItemAsGridInTree,
	createGridItem,
} from './helpers'

export const useGridStore = create<GridStore>((set, get) => ({
	// Initial state
	grids: [], // Changed from 'items' to 'grids'
	selectedItemId: null,
	showGridLines: true,

	// Grid management actions
	addGrid: () =>
		set((state) => {
			const gridCount = state.grids.length + 1
			const newGrid: GridItem = {
				id: crypto.randomUUID(),
				name: `Grid ${gridCount}`,
				isGridContainer: true, // Root items are ALWAYS grids
				children: [],

				// Default grid properties
				gridTemplateColumns: '1fr 1fr 1fr',
				gridTemplateRows: 'auto',
				gap: '1rem',
				justifyItems: 'stretch',
				alignItems: 'stretch',

				// Visual defaults
				backgroundColor: '#f8fafc',
				border: '2px dashed #cbd5e1',
				borderRadius: '8px',
				padding: '1rem',
				minHeight: '200px',
			}
			return { grids: [...state.grids, newGrid] }
		}),

	removeGrid: (id) =>
		set((state) => ({
			grids: state.grids.filter((grid) => grid.id !== id),
			selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
		})),

	// Item management (for items INSIDE grids)
	addItem: (parentId) =>
		set((state) => {
			const itemCount = countAllItems(state.grids) + 1
			const newItem = createGridItem(`Item ${itemCount}`)

			// Add to the specified parent grid
			return { grids: addItemToParent(state.grids, parentId, newItem) }
		}),

	removeItem: (id) =>
		set((state) => ({
			grids: removeItemFromTree(state.grids, id),
			selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
		})),

	selectItem: (id) => set({ selectedItemId: id }),

	// Generic update
	updateItem: (id, updates) =>
		set((state) => ({
			grids: updateItemInTree(state.grids, id, updates),
		})),

	// Specific update functions for better type safety
	updateGridPlacement: (id: string, placement: Partial<GridPlacement>) =>
		set((state) => ({
			grids: updateItemInTree(state.grids, id, placement),
		})),

	updateGridContainer: (id: string, props: Partial<GridContainerProps>) =>
		set((state) => ({
			grids: updateItemInTree(state.grids, id, props),
		})),

	updateItemSize: (id: string, size: Partial<ItemSize>) =>
		set((state) => ({
			grids: updateItemInTree(state.grids, id, size),
		})),

	updateItemStyle: (id: string, style: Partial<ItemStyle>) =>
		set((state) => ({
			grids: updateItemInTree(state.grids, id, style),
		})),

	toggleItemAsGrid: (id: string) =>
		set((state) => ({
			grids: toggleItemAsGridInTree(state.grids, id),
		})),

	// View actions
	setShowGridLines: (show: boolean) => set({ showGridLines: show }),

	getSelectedItem: () => {
		const state = get()
		if (!state.selectedItemId) return null
		return findItemById(state.grids, state.selectedItemId)
	},
}))
