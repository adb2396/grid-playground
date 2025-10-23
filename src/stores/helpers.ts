import type { GridItem } from './types'

/**
 * Count all items recursively in the tree
 */
export function countAllItems(items: GridItem[]): number {
	return items.reduce((count, item) => {
		return count + 1 + countAllItems(item.children)
	}, 0)
}

/**
 * Find an item by ID in the tree
 */
export function findItemById(items: GridItem[], id: string): GridItem | null {
	for (const item of items) {
		if (item.id === id) return item
		if (item.children.length > 0) {
			const found = findItemById(item.children, id)
			if (found) return found
		}
	}
	return null
}

/**
 * Add item to a specific parent in the tree
 */
export function addItemToParent(
	items: GridItem[],
	parentId: string,
	newItem: GridItem
): GridItem[] {
	return items.map((item) => {
		if (item.id === parentId) {
			return { ...item, children: [...item.children, newItem] }
		}
		if (item.children.length > 0) {
			return { ...item, children: addItemToParent(item.children, parentId, newItem) }
		}
		return item
	})
}

/**
 * Remove item from tree by ID
 */
export function removeItemFromTree(items: GridItem[], id: string): GridItem[] {
	return items
		.filter((item) => item.id !== id)
		.map((item) => ({
			...item,
			children: removeItemFromTree(item.children, id),
		}))
}

/**
 * Update item in tree by ID
 */
export function updateItemInTree(
	items: GridItem[],
	id: string,
	updates: Partial<GridItem>
): GridItem[] {
	return items.map((item) => {
		if (item.id === id) {
			return { ...item, ...updates }
		}
		if (item.children.length > 0) {
			return { ...item, children: updateItemInTree(item.children, id, updates) }
		}
		return item
	})
}

/**
 * Toggle item as grid container
 */
export function toggleItemAsGridInTree(items: GridItem[], id: string): GridItem[] {
	return items.map((item) => {
		if (item.id === id) {
			const willBeGrid = !item.isGridContainer
			return {
				...item,
				isGridContainer: willBeGrid,
				gridTemplateColumns: willBeGrid ? '1fr 1fr' : undefined,
				gridTemplateRows: willBeGrid ? 'auto' : undefined,
				gap: willBeGrid ? '0.5rem' : undefined,
				justifyItems: willBeGrid ? 'stretch' : undefined,
				alignItems: willBeGrid ? 'stretch' : undefined,
			}
		}
		if (item.children.length > 0) {
			return { ...item, children: toggleItemAsGridInTree(item.children, id) }
		}
		return item
	})
}

/**
 * Create a new grid item with default values
 */
export function createGridItem(name: string): GridItem {
	return {
		id: crypto.randomUUID(),
		name,
		isGridContainer: false,
		children: [],
		backgroundColor: '#e0e7ff',
		minHeight: '100px',
	}
}
