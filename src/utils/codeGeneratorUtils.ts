import type { GridItem } from '@/stores/types'

/**
 * Generates CSS code for a grid container
 */
export function generateGridContainerCSS(item: GridItem): string {
	if (!item.isGridContainer) return ''

	const css: string[] = []

	css.push(`/* ${item.name} */`)
	css.push(`.${item.name.toLowerCase().replace(/\s+/g, '-')} {`)
	css.push(`  display: grid;`)

	// Grid template
	if (item.gridTemplateColumns) {
		css.push(`  grid-template-columns: ${item.gridTemplateColumns};`)
	}
	if (item.gridTemplateRows) {
		css.push(`  grid-template-rows: ${item.gridTemplateRows};`)
	}
	if (item.gridTemplateAreas) {
		css.push(`  grid-template-areas: ${item.gridTemplateAreas};`)
	}

	// Auto properties
	if (item.gridAutoFlow && item.gridAutoFlow !== 'row') {
		css.push(`  grid-auto-flow: ${item.gridAutoFlow};`)
	}
	if (item.gridAutoColumns) {
		css.push(`  grid-auto-columns: ${item.gridAutoColumns};`)
	}
	if (item.gridAutoRows) {
		css.push(`  grid-auto-rows: ${item.gridAutoRows};`)
	}

	// Gap
	if (item.gap) {
		css.push(`  gap: ${item.gap};`)
	} else if (item.rowGap || item.columnGap) {
		if (item.rowGap) css.push(`  row-gap: ${item.rowGap};`)
		if (item.columnGap) css.push(`  column-gap: ${item.columnGap};`)
	}

	// Alignment
	if (item.justifyContent && item.justifyContent !== 'start') {
		css.push(`  justify-content: ${item.justifyContent};`)
	}
	if (item.alignContent && item.alignContent !== 'start') {
		css.push(`  align-content: ${item.alignContent};`)
	}
	if (item.justifyItems && item.justifyItems !== 'stretch') {
		css.push(`  justify-items: ${item.justifyItems};`)
	}
	if (item.alignItems && item.alignItems !== 'stretch') {
		css.push(`  align-items: ${item.alignItems};`)
	}

	// Visual styles
	if (item.styles.backgroundColor) {
		css.push(`  background-color: ${item.styles.backgroundColor};`)
	}
	if (item.styles.border) {
		css.push(`  border: ${item.styles.border};`)
	}
	if (item.styles.borderRadius) {
		css.push(`  border-radius: ${item.styles.borderRadius};`)
	}
	if (item.styles.padding) {
		css.push(`  padding: ${item.styles.padding};`)
	}
	if (item.styles.minHeight) {
		css.push(`  min-height: ${item.styles.minHeight};`)
	}

	css.push(`}`)

	return css.join('\n')
}

/**
 * Generates CSS code for a grid item
 */
export function generateGridItemCSS(item: GridItem): string {
	if (item.isGridContainer) return ''

	const css: string[] = []

	css.push(`/* ${item.name} */`)
	css.push(`.${item.name.toLowerCase().replace(/\s+/g, '-')} {`)

	// Grid placement
	if (item.gridColumn) {
		css.push(`  grid-column: ${item.gridColumn};`)
	} else {
		if (item.gridColumnStart) css.push(`  grid-column-start: ${item.gridColumnStart};`)
		if (item.gridColumnEnd) css.push(`  grid-column-end: ${item.gridColumnEnd};`)
	}

	if (item.gridRow) {
		css.push(`  grid-row: ${item.gridRow};`)
	} else {
		if (item.gridRowStart) css.push(`  grid-row-start: ${item.gridRowStart};`)
		if (item.gridRowEnd) css.push(`  grid-row-end: ${item.gridRowEnd};`)
	}

	// Self alignment
	if (item.justifySelf && item.justifySelf !== 'auto') {
		css.push(`  justify-self: ${item.justifySelf};`)
	}
	if (item.alignSelf && item.alignSelf !== 'auto') {
		css.push(`  align-self: ${item.alignSelf};`)
	}

	// Visual styles
	if (item.styles.width) css.push(`  width: ${item.styles.width};`)
	if (item.styles.height) css.push(`  height: ${item.styles.height};`)
	if (item.styles.backgroundColor) css.push(`  background-color: ${item.styles.backgroundColor};`)
	if (item.styles.border) css.push(`  border: ${item.styles.border};`)
	if (item.styles.borderRadius) css.push(`  border-radius: ${item.styles.borderRadius};`)
	if (item.styles.padding) css.push(`  padding: ${item.styles.padding};`)

	css.push(`}`)

	return css.join('\n')
}

/**
 * Generates complete CSS for all grids and their children
 */
export function generateCompleteCSS(grids: GridItem[]): string {
	const allCSS: string[] = []

	const processItem = (item: GridItem) => {
		// Generate CSS for this item
		if (item.isGridContainer) {
			allCSS.push(generateGridContainerCSS(item))
		} else {
			allCSS.push(generateGridItemCSS(item))
		}

		// Process children recursively
		item.children.forEach(processItem)
	}

	grids.forEach(processItem)

	return allCSS.filter(Boolean).join('\n\n')
}

// ============================================
// HTML GENERATION
// ============================================

/**
 * Helper to convert item name to class name
 */
function toClassName(name: string): string {
	return name.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Generates HTML for a single item (recursively)
 */
function generateItemHTML(item: GridItem, indent = 2): string {
	const spaces = ' '.repeat(indent)
	const className = toClassName(item.name)
	const html: string[] = []

	if (item.isGridContainer) {
		html.push(`${spaces}<div class="${className}">`)

		if (item.children.length > 0) {
			item.children.forEach((child) => {
				html.push(generateItemHTML(child, indent + 2))
			})
		} else {
			html.push(`${spaces}  <!-- Add grid items here -->`)
		}

		html.push(`${spaces}</div>`)
	} else {
		html.push(`${spaces}<div class="${className}">`)
		html.push(`${spaces}  ${item.name}`)
		html.push(`${spaces}</div>`)
	}

	return html.join('\n')
}

/**
 * Generates complete HTML structure for all grids
 */
export function generateCompleteHTML(grids: GridItem[]): string {
	if (grids.length === 0) {
		return '<!-- No grids created yet -->'
	}

	const html: string[] = []

	grids.forEach((grid) => {
		html.push(generateItemHTML(grid, 0))
		html.push('') // Empty line between grids
	})

	return html.join('\n').trim()
}

/**
 * Generates a full HTML page with CSS embedded
 */
export function generateFullHTMLPage(grids: GridItem[]): string {
	const css = generateCompleteCSS(grids)
	const bodyHTML = generateCompleteHTML(grids)

	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }

${css
	.split('\n')
	.map((line) => '    ' + line)
	.join('\n')}
  </style>
</head>
<body>
${bodyHTML
	.split('\n')
	.map((line) => '  ' + line)
	.join('\n')}
</body>
</html>`
}
