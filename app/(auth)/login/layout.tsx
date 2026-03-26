import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
	return (
		<div className='relative flex  flex-col items-center justify-center'>
			<header>
				<p className='absolute top-5 left-10 font-syne font-bold uppercase text-2xl'>
					Workdi
				</p>
			</header>
			{children}
		</div>
	)
}
