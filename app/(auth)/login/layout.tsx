import { ReactNode } from 'react'

export default function LoginLayout({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-white flex flex-col max-w-[390px] mx-auto'>
			{children}
		</div>
	)
}
