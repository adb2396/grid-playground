import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { GridItem } from '@/stores/types'

export interface ShareableState {
	grids: GridItem[]
	showGridLines: boolean
}

/**
 * Encode state to URL-safe string
 */
export function encodeStateToURL(state: ShareableState): string {
	try {
		const json = JSON.stringify(state)
		// Use compressToEncodedURIComponent which is already URI-safe
		const compressed = compressToEncodedURIComponent(json)
		return compressed
	} catch (error) {
		console.error('Failed to encode state:', error)
		throw new Error('Failed to encode state for sharing')
	}
}

/**
 * Decode state from URL string
 */
export function decodeStateFromURL(encoded: string): ShareableState | null {
	try {
		// Use decompressFromEncodedURIComponent to decode
		const decompressed = decompressFromEncodedURIComponent(encoded)
		if (!decompressed) return null

		const state = JSON.parse(decompressed) as ShareableState

		// Validate structure
		if (!state.grids || !Array.isArray(state.grids)) {
			return null
		}

		return state
	} catch (error) {
		console.error('Failed to decode state:', error)
		return null
	}
}

/**
 * Generate shareable URL with current state
 */
export function generateShareURL(state: ShareableState): string {
	const encoded = encodeStateToURL(state)
	const url = new URL(window.location.href)
	url.searchParams.set('grid', encoded)
	return url.toString()
}

/**
 * Get state from current URL if present
 */
export function getStateFromURL(): ShareableState | null {
	const params = new URLSearchParams(window.location.search)
	const encoded = params.get('grid')

	if (!encoded) return null

	return decodeStateFromURL(encoded)
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		if (!navigator.clipboard) {
			console.warn('Clipboard API not available')
			return false
		}

		await navigator.clipboard.writeText(text)
		return true
	} catch (error) {
		console.error('Failed to copy to clipboard:', error)
		return false
	}
}
