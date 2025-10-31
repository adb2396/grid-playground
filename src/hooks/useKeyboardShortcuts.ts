import { useEffect } from 'react'
import { useGridStore } from '@/stores/gridStore'

export const useKeyboardShortcuts = () => {
	const undo = useGridStore((state) => state.undo)
	const redo = useGridStore((state) => state.redo)

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const isMod = e.metaKey || e.ctrlKey

			if (isMod && e.key === 'z') {
				e.preventDefault()
				if (e.shiftKey) {
					redo()
				} else {
					undo()
				}
			}

			if (isMod && e.key === 'y') {
				e.preventDefault()
				redo()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [undo, redo])
}
