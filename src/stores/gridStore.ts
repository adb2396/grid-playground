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

const MAX_HISTORY = 50

export const useGridStore = create<GridStore>((set, get) => ({
	// Initial state
	grids: [],
	selectedItemId: null,
	showGridLines: false,
	history: {
		past: [],
		future: [],
	},

	// Helper to save state to history
	// Example:
	// [grid] -> create a new grid
	// [grid, (item1+grid)] -> add an item to the grid
	// [grid, (item1+grid), (item2+item1+grid)] -> add another item to the grid
	// Here the current grid will be a grid with 2 items inside it.
	_saveToHistory: () => {
		const state = get()
		const currentGrids = JSON.parse(JSON.stringify(state.grids)) // Deep clone

		set((state) => ({
			history: {
				past: [...state.history.past, currentGrids].slice(-MAX_HISTORY),
				future: [], // Clear future on new action
			},
		}))
	},

	// Undo: Go back in time
	undo: () => {
		const state = get()
		if (state.history.past.length === 0) return

		const past = [...state.history.past]
		const current = JSON.parse(JSON.stringify(state.grids))
		const previous = past.pop()!

		set({
			// removed the last item from the past and added here
			grids: previous,
			history: {
				// current past with the last item removed
				past,
				// future with the current state added to the front
				future: [current, ...state.history.future],
			},
		})
	},

	// Redo: Go forward in time
	redo: () => {
		const state = get()
		if (state.history.future.length === 0) return

		const future = [...state.history.future]
		const current = JSON.parse(JSON.stringify(state.grids))
		const next = future.shift()!

		set({
			// removed the first item from the future and added here
			grids: next,
			history: {
				// current past with the current state added to the end
				past: [...state.history.past, current],
				// future with the first item removed
				future,
			},
		})
	},

	canUndo: () => get().history.past.length > 0,
	canRedo: () => get().history.future.length > 0,

	// reset store
	resetStore: () =>
		set({
			grids: [],
			selectedItemId: null,
			showGridLines: false,
			history: {
				past: [],
				future: [],
			},
		}),

	// Grid management actions
	addGrid: () => {
		get()._saveToHistory()
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
		})
	},

	removeGrid: (id) => {
		get()._saveToHistory()
		set((state) => ({
			grids: state.grids.filter((grid) => grid.id !== id),
			selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
		}))
	},

	// Item management (for items INSIDE grids)
	addItem: (parentId) => {
		get()._saveToHistory()
		set((state) => {
			const itemCount = countAllItems(state.grids) + 1
			const newItem = createGridItem(`Item ${itemCount}`)

			// Add to the specified parent grid
			return { grids: addItemToParent(state.grids, parentId, newItem) }
		})
	},

	removeItem: (id) => {
		get()._saveToHistory()
		set((state) => ({
			grids: removeItemFromTree(state.grids, id),
			selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
		}))
	},

	selectItem: (id) => set({ selectedItemId: id }),

	// Generic update
	updateItem: (id, updates) => {
		get()._saveToHistory()
		set((state) => ({
			grids: updateItemInTree(state.grids, id, updates),
		}))
	},

	// Specific update functions for better type safety
	updateGridPlacement: (id: string, placement: Partial<GridPlacement>) => {
		get()._saveToHistory()
		set((state) => ({
			grids: updateItemInTree(state.grids, id, placement),
		}))
	},

	updateGridContainer: (id: string, props: Partial<GridContainerProps>) => {
		get()._saveToHistory()
		set((state) => ({
			grids: updateItemInTree(state.grids, id, props),
		}))
	},

	updateStyles: (id: string, styles: Partial<VisualStyles>) => {
		get()._saveToHistory()
		set((state) => ({
			grids: updateItemStyles(state.grids, id, styles),
		}))
	},

	toggleItemAsGrid: (id: string) => {
		get()._saveToHistory()
		set((state) => ({
			grids: toggleItemAsGridInTree(state.grids, id),
		}))
	},

	// View actions
	setShowGridLines: (show: boolean) => set({ showGridLines: show }),

	getSelectedItem: () => {
		const state = get()
		if (!state.selectedItemId) return null
		return findItemById(state.grids, state.selectedItemId)
	},

	loadTemplate: (templateId: string) => {
		get()._saveToHistory()
		const template = gridTemplates.find((t: GridTemplate) => t.id === templateId)
		if (!template) return

		set({
			grids: template.grids,
			selectedItemId: null,
		})
	},
}))
