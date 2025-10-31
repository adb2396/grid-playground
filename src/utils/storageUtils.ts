import type { GridItem } from '@/stores/types'

const STORAGE_KEY = 'css-grid-playground-state'
const STORAGE_VERSION = 1 // For future migrations

export interface StoredState {
	version: number
	grids: GridItem[]
	showGridLines: boolean
	timestamp: number
}

/**
 * Save state to localStorage
 */
export function saveToLocalStorage(grids: GridItem[], showGridLines: boolean): boolean {
	try {
		const state: StoredState = {
			version: STORAGE_VERSION,
			grids,
			showGridLines,
			timestamp: Date.now(),
		}

		const serialized = JSON.stringify(state)
		localStorage.setItem(STORAGE_KEY, serialized)
		return true
	} catch (error) {
		console.error('Failed to save to localStorage:', error)
		// Handle quota exceeded
		if (error instanceof DOMException && error.name === 'QuotaExceededError') {
			console.warn('localStorage quota exceeded')
		}
		return false
	}
}

/**
 * Load state from localStorage
 */
export function loadFromLocalStorage(): StoredState | null {
	try {
		const serialized = localStorage.getItem(STORAGE_KEY)
		if (!serialized) return null

		const state = JSON.parse(serialized) as StoredState

		// Validate structure
		if (!state.grids || !Array.isArray(state.grids)) {
			console.warn('Invalid stored state structure')
			return null
		}

		// Version check (for future migrations)
		if (state.version !== STORAGE_VERSION) {
			console.warn('Stored state version mismatch')
			// Could implement migration logic here
			return null
		}

		return state
	} catch (error) {
		console.error('Failed to load from localStorage:', error)
		return null
	}
}

/**
 * Clear saved state
 */
export function clearLocalStorage(): void {
	try {
		localStorage.removeItem(STORAGE_KEY)
	} catch (error) {
		console.error('Failed to clear localStorage:', error)
	}
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
	try {
		const test = '__storage_test__'
		localStorage.setItem(test, test)
		localStorage.removeItem(test)
		return true
	} catch {
		return false
	}
}
