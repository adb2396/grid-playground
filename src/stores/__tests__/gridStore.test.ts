import { gridTemplates, type GridTemplate } from '@/utils/templates'
import { beforeEach, describe, expect, it } from 'vitest'
import { useGridStore } from '../gridStore'

describe('GridStore', () => {
	beforeEach(() => {
		useGridStore.getState().resetStore()
	})

	describe('Grid Management', () => {
		it('should start with empty grids array', () => {
			const { grids } = useGridStore.getState()
			expect(grids).toEqual([])
		})

		it('should add a grid container', () => {
			const { addGrid } = useGridStore.getState()

			addGrid()

			const { grids } = useGridStore.getState()
			expect(grids).toHaveLength(1)
			expect(grids[0].name).toBe('Grid 1')
			expect(grids[0].isGridContainer).toBe(true)
		})

		it('should remove a grid', () => {
			const { addGrid, removeGrid } = useGridStore.getState()

			addGrid()
			const gridId = useGridStore.getState().grids[0].id

			removeGrid(gridId)

			const { grids } = useGridStore.getState()
			expect(grids).toHaveLength(0)
		})
	})

	describe('Undo/Redo', () => {
		it('should enable undo after adding a grid', () => {
			const { addGrid, canUndo } = useGridStore.getState()

			expect(canUndo()).toBe(false)

			addGrid()

			expect(useGridStore.getState().canUndo()).toBe(true)
		})

		it('should undo grid addition', () => {
			const { addGrid, undo } = useGridStore.getState()

			addGrid()
			expect(useGridStore.getState().grids).toHaveLength(1)

			undo()

			expect(useGridStore.getState().grids).toHaveLength(0)
		})

		it('should redo grid addition', () => {
			const { addGrid, undo, redo } = useGridStore.getState()

			addGrid()
			undo()
			redo()

			expect(useGridStore.getState().grids).toHaveLength(1)
		})
	})

	describe('Item Management', () => {
		it('should add item to grid container', () => {
			const { addGrid, addItem } = useGridStore.getState()

			addGrid()
			const gridId = useGridStore.getState().grids[0].id

			addItem(gridId)

			const { grids } = useGridStore.getState()
			expect(grids[0].children).toHaveLength(1)
			expect(grids[0].children[0].name).toBe('Item 2') // Grid 1 counts as Item 1
		})
	})

	describe('Updates', () => {
		it('should update grid placement', () => {
			// add a grid
			const { addGrid, addItem, updateGridPlacement } = useGridStore.getState()
			addGrid()

			// add an item to the grid
			const gridId = useGridStore.getState().grids[0].id
			addItem(gridId)
			const itemId = useGridStore.getState().grids[0].children[0].id

			// update the item's grid placement
			updateGridPlacement(itemId, {
				gridColumn: '1 / 2',
			})

			// expect the item's grid placement to be updated
			const { grids } = useGridStore.getState()
			expect(grids[0].children[0].gridColumn).toBe('1 / 2')
		})

		it('should update grid container properties', () => {
			// add a grid
			const { addGrid, updateGridContainer } = useGridStore.getState()
			addGrid()

			// update the grid container's properties
			const gridId = useGridStore.getState().grids[0].id
			updateGridContainer(gridId, {
				gridTemplateColumns: '4',
			})

			// expect the grid container's properties to be updated
			const { grids } = useGridStore.getState()
			expect(grids[0].gridTemplateColumns).toBe('4')
		})
		it('should update item styles', () => {
			// add a grid
			const { addGrid, addItem, updateStyles } = useGridStore.getState()
			addGrid()

			// add an item to the grid
			const gridId = useGridStore.getState().grids[0].id
			addItem(gridId)
			const itemId = useGridStore.getState().grids[0].children[0].id

			// update the item's styles
			updateStyles(itemId, {
				backgroundColor: '#ff0000',
			})

			// expect the item's styles to be updated
			const { grids } = useGridStore.getState()
			expect(grids[0].children[0].styles.backgroundColor).toBe('#ff0000')
		})
		it('should select an item', () => {
			// add a grid
			const { addGrid, addItem, selectItem } = useGridStore.getState()
			addGrid()

			// add an item to the grid
			const gridId = useGridStore.getState().grids[0].id
			addItem(gridId)
			const itemId = useGridStore.getState().grids[0].children[0].id

			// select the item
			selectItem(itemId)

			// expect the selectedItemId to be updated
			const { selectedItemId } = useGridStore.getState()
			expect(selectedItemId).toBe(itemId)
		})
	})

	describe('Undo/Redo Edge Cases', () => {
		it('should handle multiple undo operations', () => {
			const { addGrid, undo } = useGridStore.getState()

			addGrid()
			addGrid()
			addGrid()

			expect(useGridStore.getState().grids).toHaveLength(3)

			undo()
			undo()

			expect(useGridStore.getState().grids).toHaveLength(1)
		})
		it('should clear redo stack on new action', () => {
			const { addGrid, undo, redo, canRedo, addItem } = useGridStore.getState()

			addGrid()
			const gridId = useGridStore.getState().grids[0].id

			addItem(gridId)

			expect(useGridStore.getState().grids[0].children).toHaveLength(1)

			undo() // remove item
			expect(useGridStore.getState().grids[0].children).toHaveLength(0)

			redo() // redo item addition
			expect(useGridStore.getState().grids[0].children).toHaveLength(1)

			undo() // remove item again
			expect(useGridStore.getState().grids[0].children).toHaveLength(0)

			// check if redo stack is still intact
			expect(canRedo()).toBe(true)

			// now add a new item, which should clear the redo stack
			addItem(gridId)
			expect(useGridStore.getState().grids[0].children).toHaveLength(1)

			// redo should no longer be possible
			expect(canRedo()).toBe(false)
		})
		it('should respect history limit of 50 states', () => {
			const { addGrid, undo } = useGridStore.getState()

			// Add 51 grids
			for (let i = 0; i < 51; i++) {
				addGrid()
			}

			expect(useGridStore.getState().grids).toHaveLength(51)

			// Undo 51 times
			for (let i = 0; i < 51; i++) {
				undo()
			}

			// Should only be able to undo 50 times, so 1 grid should remain
			expect(useGridStore.getState().grids).toHaveLength(1)
		})
	})

	describe('Template & Sharing', () => {
		it('should load a template', () => {
			const { loadTemplate } = useGridStore.getState()
			const template = gridTemplates[0] as GridTemplate

			loadTemplate(template.id)

			const { grids } = useGridStore.getState()
			expect(grids).toHaveLength(1)
			expect(grids[0].id).toBe(template.grids[0].id)
		})
		it('should get shareable state', () => {
			const { addGrid, getShareableState } = useGridStore.getState()

			addGrid()

			const shareableState = getShareableState()
			expect(shareableState).toHaveProperty('grids')
			expect(Array.isArray(shareableState.grids)).toBe(true)
		})
		it('should load from shareable state', () => {
			const { addGrid, getShareableState, loadFromShareableState } = useGridStore.getState()

			addGrid()
			const shareableState = getShareableState()

			// Reset store
			useGridStore.getState().resetStore()
			expect(useGridStore.getState().grids).toHaveLength(0)

			// Load from shareable state
			loadFromShareableState(shareableState)
			expect(useGridStore.getState().grids).toHaveLength(1)
		})
	})
})
