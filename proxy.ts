import { getSessionCookie } from 'better-auth/cookies'
import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
	const session = getSessionCookie(request)
	const regexEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/

	if (!session && !request.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (request.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	if (
		request.nextUrl.pathname === '/login/verify' &&
		!regexEmail.test(request.nextUrl.searchParams.get('email')!)
	) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon).*)'],
}
