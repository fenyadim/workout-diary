'use server'

import { auth } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function sendOTP(prevState: unknown, formData: FormData) {
	const email = formData.get('email') as string
	const cookieStore = await cookies()

	if (!email) {
		return { message: 'Введите email' }
	}

	const data = await auth.api.sendVerificationOTP({
		body: {
			email: email,
			type: 'sign-in',
		},
	})

	if (data.success) {
		cookieStore.set('email', email)
		redirect('/login/verify')
	}

	return { message: 'Что-то пошло не так' }
}

export async function verifyOTP(prevState: unknown, formData: FormData) {
	const otp = formData.get('otp') as string
	const cookieStore = await cookies()
	const email = cookieStore.get('email')?.value as string

	const data = await auth.api.verifyEmailOTP({
		body: {
			email: email,
			otp: otp,
		},
	})

	console.log(data)

	if (data) {
		redirect('/')
	}

	return {
		message: 'Неверный код',
	}
}
