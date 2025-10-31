import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Share2, Check } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useGridStore } from '@/stores/gridStore'
import { generateShareURL, copyToClipboard } from '@/utils/shareUtils'

export const ShareButton = () => {
	const [copied, setCopied] = useState(false)
	const getShareableState = useGridStore((state) => state.getShareableState)
	const grids = useGridStore((state) => state.grids)

	const handleShare = async () => {
		try {
			const state = getShareableState()
			const url = generateShareURL(state)
			const success = await copyToClipboard(url)

			if (success) {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			}
		} catch (error) {
			console.error('Failed to generate share link:', error)
			// Could show error toast here
		}
	}

	const hasGrids = grids.length > 0

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="secondary"
						size="sm"
						onClick={handleShare}
						disabled={!hasGrids}
						className="gap-1"
					>
						{copied ? (
							<>
								<Check className="h-4 w-4" />
								<span className="hidden sm:inline">Copied!</span>
							</>
						) : (
							<>
								<Share2 className="h-4 w-4 text-primary" />
								<span className="hidden sm:inline text-primary">Share</span>
							</>
						)}
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{copied ? 'Link copied to clipboard!' : 'Copy shareable link'}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
