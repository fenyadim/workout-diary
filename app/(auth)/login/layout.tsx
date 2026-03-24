import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
	return (
		<div className='relative flex min-h-screen flex-col items-center justify-center px-10'>
			<header>
				<p className='absolute top-5 left-10 font-syne font-bold uppercase text-2xl'>
					Workdi
				</p>
			</header>
			{children}
		</div>
	)
}
