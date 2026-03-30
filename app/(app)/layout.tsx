'use client'

import {
	BarChart2,
	Compass,
	House,
	Plus,
	User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const navItems = [
	{ href: '/dashboard', icon: House, label: 'Главная' },
	{ href: '/exercises', icon: Compass, label: 'Обзор' },
	{ href: '/workout', icon: null, label: '' },
	{ href: '/history', icon: BarChart2, label: 'Статы' },
	{ href: '/profile', icon: User, label: 'Профиль' },
]

export default function AppLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname()

	return (
		<div className='min-h-screen bg-white flex flex-col max-w-[390px] mx-auto relative'>
			<div className='flex-1 pb-[82px]'>{children}</div>

			{/* Bottom Navigation */}
			<nav className='fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] h-[82px] bg-white flex items-start justify-between px-0 pt-3 pb-5 border-t border-border z-50'>
				{navItems.map((item) => {
					const isActive = pathname.startsWith(item.href)

					if (!item.icon) {
						return (
							<Link
								key={item.href}
								href={item.href}
								className='flex-1 flex items-center justify-center'
							>
								<div className='w-11 h-11 rounded-full bg-primary flex items-center justify-center'>
									<Plus size={22} className='text-white' />
								</div>
							</Link>
						)
					}

					const Icon = item.icon
					return (
						<Link
							key={item.href}
							href={item.href}
							className='flex-1 flex flex-col items-center gap-1 justify-center'
						>
							<Icon
								size={24}
								className={cn(isActive ? 'text-primary' : 'text-muted-foreground')}
							/>
							<span
								className={cn(
									'text-[10px]',
									isActive
										? 'text-primary font-semibold'
										: 'text-muted-foreground font-medium',
								)}
							>
								{item.label}
							</span>
						</Link>
					)
				})}
			</nav>
		</div>
	)
}
