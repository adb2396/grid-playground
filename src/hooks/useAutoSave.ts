import { useEffect, useRef } from 'react'
import { useGridStore } from '@/stores/gridStore'
import { saveToLocalStorage } from '@/utils/storageUtils'

/**
 * Auto-save grid state to localStorage with debouncing
 */
export function useAutoSave(delay = 500) {
	const grids = useGridStore((state) => state.grids)
	const showGridLines = useGridStore((state) => state.showGridLines)
	const timeoutRef = useRef<number | null>(null)

	useEffect(() => {
		// Clear existing timeout
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}

		// Debounce: save after delay ms of inactivity
		timeoutRef.current = setTimeout(() => {
			if (grids.length > 0) {
				const success = saveToLocalStorage(grids, showGridLines)
				if (success) {
					console.log('✅ Auto Saved')
				}
			}
		}, delay)

		// Cleanup
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [grids, showGridLines, delay])
}
