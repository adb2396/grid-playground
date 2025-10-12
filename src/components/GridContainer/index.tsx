import React from 'react'

export const GridContainer: React.FC = () => {
	return (
		<div className="w-full h-full p-8 bg-gray-50">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
				<h2 className="text-lg font-semibold text-gray-900 mb-4">Grid Preview</h2>

				{/* Grid Container */}
				<div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[400px]">
					<div className="grid grid-cols-3 gap-4">
						{/* Grid Items */}
						{[1, 2, 3, 4, 5, 6].map((item) => (
							<div
								key={item}
								className="bg-blue-50 border-2 border-blue-200 rounded-md p-4 text-center hover:border-blue-400 transition-colors cursor-pointer"
							>
								<span className="text-gray-700 font-medium">Item {item}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
