import { create } from 'zustand'
import type { GridStore, GridItem, GridPlacement, GridContainerProps, VisualStyles } from './types'
import {
	countAllItems,
	findItemById,
	addItemToParent,
	removeItemFromTree,
	updateItemInTree,
	toggleItemAsGridInTree,
	createGridItem,
	updateItemStyles,
} from './helpers'
import { gridTemplates, type GridTemplate } from '@/utils/templates'

export const useGridStore = create<GridStore>((set, get) => ({
	// Initial state
	grids: [],
	selectedItemId: null,
	showGridLines: false,

	// reset store
	resetStore: () => set({ grids: [], selectedItemId: null, showGridLines: true }),

	// Grid management actions
	addGrid: () =>
		set((state) => {
			const gridCount = state.grids.length + 1
			const newGrid: GridItem = {
				id: crypto.randomUUID(),
				name: `Grid ${gridCount}`,
				isGridContainer: true, // Root items are ALWAYS grids
				children: [],

				// Visual defaults
				styles: {
					backgroundColor: '#f8fafc',
					border: '2px dashed #cbd5e1',
					borderRadius: '8px',
					padding: '16px',
					minHeight: '200px',
				},
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

	updateStyles: (id: string, styles: Partial<VisualStyles>) =>
		set((state) => ({
			grids: updateItemStyles(state.grids, id, styles),
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

	loadTemplate: (templateId: string) => {
		const template = gridTemplates.find((t: GridTemplate) => t.id === templateId)
		if (!template) return

		set({
			grids: template.grids,
			selectedItemId: null,
		})
	},
}))
