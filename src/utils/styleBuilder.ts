import type { GridItem } from '@/stores/types'
import type { CSSProperties } from 'react'

/**
 * Builds inline styles for a grid item from its properties
 */
export function buildGridItemStyles(item: GridItem): CSSProperties {
	return {
		// Grid container properties (only if it's a grid)
		...(item.isGridContainer && {
			display: 'grid',
			gridTemplateColumns: item?.gridTemplateColumns || 'auto',
			gridTemplateRows: item?.gridTemplateRows || 'auto',
			gridTemplateAreas: item?.gridTemplateAreas || '',
			gridAutoFlow: item?.gridAutoFlow || 'row',
			gridAutoColumns: item?.gridAutoColumns || 'auto',
			gridAutoRows: item?.gridAutoRows || 'auto',
			rowGap: item?.rowGap || '16px',
			columnGap: item?.columnGap || '16px',
			justifyContent: item?.justifyContent || 'stretch',
			alignContent: item?.alignContent || 'stretch',
			justifyItems: item?.justifyItems || 'stretch',
			alignItems: item?.alignItems || 'stretch',
		}),

		// Grid placement (where item sits in parent grid)
		gridColumn: item.gridColumn,
		gridRow: item.gridRow,
		gridColumnStart: item.gridColumnStart,
		gridColumnEnd: item.gridColumnEnd,
		gridRowStart: item.gridRowStart,
		gridRowEnd: item.gridRowEnd,
		justifySelf: item.justifySelf,
		alignSelf: item.alignSelf,

		// Visual styles (spread the nested object)
		...item.styles,
	}
}
