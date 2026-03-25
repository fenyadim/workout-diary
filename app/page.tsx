import { auth } from '@/lib/auth'
import { Button } from '@/shared/ui/button'
import { headers } from 'next/headers'

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	return (
		<div className='flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
			<Button>Test</Button>
		</div>
	)
}
