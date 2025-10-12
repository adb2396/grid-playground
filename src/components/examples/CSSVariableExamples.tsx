import React from 'react'

export const CSSVariableExamples: React.FC = () => {
	return (
		<div className="p-8 space-y-8">
			<h2 className="text-2xl font-bold mb-4">CSS Variable Usage Examples</h2>

			{/* Method 1: Using Tailwind classes from config */}
			<section>
				<h3 className="text-lg font-semibold mb-2">1. Using Tailwind Config Classes</h3>
				<div className="bg-grid-container p-4 rounded-lg">
					<div className="bg-grid-item-bg border-2 border-grid-item p-4 mb-2">
						Grid Item with Tailwind classes
					</div>
					<div className="text-grid-line hover:text-grid-line-hover transition-colors">
						Hover me to see color change
					</div>
				</div>
			</section>

			{/* Method 2: Using arbitrary values */}
			<section>
				<h3 className="text-lg font-semibold mb-2">2. Using Arbitrary Values</h3>
				<div className="bg-[var(--grid-bg)] p-4 rounded-lg">
					<div className="bg-[var(--grid-item-bg)] border-2 border-[var(--grid-item-border)] p-4">
						Grid Item with arbitrary values
					</div>
				</div>
			</section>

			{/* Method 3: In inline styles */}
			<section>
				<h3 className="text-lg font-semibold mb-2">3. Using Inline Styles</h3>
				<div
					style={{
						backgroundColor: 'var(--grid-bg)',
						padding: '1rem',
						borderRadius: '0.5rem',
					}}
				>
					<div
						style={{
							backgroundColor: 'var(--grid-item-bg)',
							border: '2px solid var(--grid-item-border)',
							padding: '1rem',
						}}
					>
						Grid Item with inline styles
					</div>
				</div>
			</section>

			{/* Method 4: Using CSS classes with hover states */}
			<section>
				<h3 className="text-lg font-semibold mb-2">4. Complex Hover States</h3>
				<div className="bg-[var(--grid-bg)] p-4 rounded-lg">
					<div className="bg-[var(--grid-item-bg)] border-2 border-[var(--grid-item-border)] p-4 transition-all hover:border-[var(--grid-item-selected)] hover:shadow-[0_0_0_3px_var(--grid-item-selected)]">
						Hover me for selected state
					</div>
				</div>
			</section>

			{/* Method 5: Dynamic usage with state */}
			<section>
				<h3 className="text-lg font-semibold mb-2">5. Dynamic Usage</h3>
				<div className="space-y-2">
					{['line', 'line-hover', 'bg', 'item-bg', 'item-border', 'item-selected'].map(
						(variant) => (
							<div
								key={variant}
								className="p-2 rounded"
								style={{
									backgroundColor: `var(--grid-${variant})`,
									color: variant.includes('bg') ? 'black' : 'white',
								}}
							>
								--grid-{variant}
							</div>
						)
					)}
				</div>
			</section>
		</div>
	)
}
