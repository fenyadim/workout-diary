'use server'

import { auth } from '@/lib/auth'

export const sendOTP = async (email: string) => {
	try {
		await auth.api.sendVerificationOTP({
			body: {
				email: email,
				type: 'sign-in',
			},
		})
		return {
			success: true,
			message: `Код отправлен на почту ${email}`,
		}
	} catch (e) {
		console.log(e)
		return {
			success: false,
			message: 'Что-то пошло не так',
		}
	}
}

export const verifyOTP = async (otp: string, email: string) => {
	try {
		await auth.api.signInEmailOTP({
			body: {
				email: email,
				otp: otp,
			},
		})

		return {
			success: true,
			message: 'Успешный вход!',
		}
	} catch (e) {
		console.log(e)
		return {
			success: false,
			message: 'Неверный код',
		}
	}
}
