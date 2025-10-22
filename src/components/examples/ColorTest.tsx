import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectGroup,
} from '@/components/ui/select'

export function ColorTest() {
	return (
		<div className="space-y-8">
			{/* Primary Color Usage */}
			<Card>
				<CardHeader>
					<CardTitle>Primary Color (Deep Blue)</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-3 gap-4">
						<div className="bg-primary text-primary-foreground p-4 rounded">bg-primary</div>
						<div className="text-primary p-4 rounded">text-primary</div>
						<div className="border-primary border-2 p-4 rounded">border-primary</div>
					</div>
				</CardContent>
			</Card>

			{/* Buttons */}
			<Card>
				<CardHeader>
					<CardTitle>Button Variants</CardTitle>
				</CardHeader>
				<CardContent className="flex gap-4 flex-wrap">
					<Button>Default (Primary)</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="link">Link</Button>
					<Button variant="destructive">Destructive</Button>
				</CardContent>
			</Card>

			{/* Text & Backgrounds */}
			<Card>
				<CardHeader>
					<CardTitle>Text & Background Combinations</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-2 gap-4">
					<div className="bg-background text-foreground p-4 border rounded">
						Default: bg-background + text-foreground
					</div>
					<div className="bg-primary text-primary-foreground p-4 rounded">
						Primary: bg-primary + text-primary-foreground
					</div>
					<div className="bg-secondary text-secondary-foreground p-4 rounded">
						Secondary: bg-secondary + text-secondary-foreground
					</div>
					<div className="bg-accent text-accent-foreground p-4 rounded">
						Accent: bg-accent + text-accent-foreground
					</div>
					<div className="bg-muted text-muted-foreground p-4 rounded">
						Muted: bg-muted + text-muted-foreground
					</div>
					<div className="bg-card text-card-foreground p-4 border rounded">
						Card: bg-card + text-card-foreground
					</div>
				</CardContent>
			</Card>

			{/* Interactive Elements */}
			<Card>
				<CardHeader>
					<CardTitle>Interactive Elements</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div>
						<Label htmlFor="test-input">Input with Focus Ring</Label>
						<Input id="test-input" placeholder="Focus me to see ring color" />
					</div>
					<div>
						<Label htmlFor="test-select">Input Select</Label>
						<Select>
							<SelectTrigger id="test-select">
								<SelectValue placeholder="Select an option" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="start">Start</SelectItem>
									<SelectItem value="center">Center</SelectItem>
									<SelectItem value="end">End</SelectItem>
									<SelectItem value="stretch">Stretch</SelectItem>
									<SelectItem value="space-between">Space Between</SelectItem>
									<SelectItem value="space-around">Space Around</SelectItem>
									<SelectItem value="space-evenly">Space Evenly</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className="flex gap-2">
						<Badge>Default Badge</Badge>
						<Badge variant="secondary">Secondary</Badge>
						<Badge variant="outline">Outline</Badge>
					</div>
					<Alert>
						<AlertDescription>This is an alert using default colors</AlertDescription>
					</Alert>
				</CardContent>
			</Card>

			{/* Your App-Specific Colors */}
			<Card>
				<CardHeader>
					<CardTitle>Where Colors Apply in Your App</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<div className="flex items-center gap-4">
							<div className="w-20 h-10 bg-primary rounded"></div>
							<span>Header/Navigation Bar</span>
						</div>
						<div className="flex items-center gap-4">
							<Button>Primary Button</Button>
							<span>All primary action buttons</span>
						</div>
						<div className="flex items-center gap-4">
							<div className="w-20 h-10 border-2 border-primary rounded"></div>
							<span>Focus states, selected items</span>
						</div>
						<div className="flex items-center gap-4">
							<span className="text-primary font-semibold">Link Text</span>
							<span>Links and interactive text</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
