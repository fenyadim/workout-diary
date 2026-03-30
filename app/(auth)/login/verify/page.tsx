import { Suspense } from 'react'

import { VerifyPage } from '@/pagesLayer/login/verify-page'

export default function LoginVerifyRoute() {
	return (
		<Suspense>
			<VerifyPage />
		</Suspense>
	)
}
