'use client'

import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

export const LoginPage = () => {
	const [email, setEmail] = useState('')
	const [otp, setOtp] = useState('')
	const [step, setStep] = useState<'email' | 'otp'>('email')
	const [loading, setLoading] = useState(false)

	const sendOTP = async () => {
		setLoading(true)
		await authClient.emailOtp.sendVerificationOtp({
			email,
			type: 'sign-in',
		})
		setStep('otp')
		setLoading(false)
	}

	const verifyOTP = async () => {
		setLoading(true)
		await authClient.signIn.emailOtp({
			email,
			otp,
		})
		setLoading(false)
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-full max-w-sm space-y-4'>
				<h1 className='text-2xl font-semibold'>Войти</h1>

				{step === 'email' ? (
					<>
						<input
							type='email'
							placeholder='your@email.com'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full border rounded-xl px-4 py-3'
						/>
						<button
							onClick={sendOTP}
							disabled={loading || !email}
							className='w-full bg-black text-white rounded-xl py-3'
						>
							{loading ? 'Отправляем...' : 'Получить код'}
						</button>
					</>
				) : (
					<>
						<p className='text-sm text-gray-500'>Код отправлен на {email}</p>
						<input
							type='text'
							placeholder='000000'
							value={otp}
							onChange={e => setOtp(e.target.value)}
							maxLength={6}
							className='w-full border rounded-xl px-4 py-3 text-center text-2xl tracking-widest'
						/>
						<button
							onClick={verifyOTP}
							disabled={loading || otp.length < 6}
							className='w-full bg-black text-white rounded-xl py-3'
						>
							{loading ? 'Проверяем...' : 'Войти'}
						</button>
						<button
							onClick={() => setStep('email')}
							className='w-full text-sm text-gray-400'
						>
							Изменить email
						</button>
					</>
				)}
			</div>
		</div>
	)
}
