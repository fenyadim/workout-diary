'use client'

import { verifyOTP } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription } from '@/components/ui/field'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useActionState } from 'react'

export const VerifyPage = () => {
	const [state, formAction, pending] = useActionState(verifyOTP, {
		message: '',
	})

	return (
		<div className='flex flex-col items-center gap-3'>
			<div className='space-y-2 mb-4'>
				<p className='text-sm text-gray-500'>Код отправлен на email</p>
				<form action={formAction} className='space-y-3'>
					<Field>
						<InputOTP name='otp' maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
							<InputOTPGroup className='*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl'>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
						{state?.message && (
							<FieldDescription className='text-destructive'>
								{state.message}
							</FieldDescription>
						)}
					</Field>
					<Button type='submit' disabled={pending} className='w-full'>
						{pending ? 'Проверяем...' : 'Войти'}
					</Button>
				</form>
			</div>

			{/* <Button
				className='text-center'
				variant='link'
				onClick={() => setStep('email')}
			>
				Изменить email
			</Button> */}
		</div>
	)
}
