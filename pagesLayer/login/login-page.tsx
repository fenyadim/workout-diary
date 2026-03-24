'use client'

import { sendOTP } from '@/actions/login'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription } from '@/components/ui/field'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group'
import { MailIcon } from 'lucide-react'
import { useActionState } from 'react'

export const LoginPage = () => {
	const [state, formAction, pending] = useActionState(sendOTP, {
		message: '',
	})

	return (
		<div className='space-y-5'>
			<div className='space-y-2'>
				<h1 className='text-4xl font-extrabold font-syne'>
					Твой <span className='block text-[#D4421A]'>прогресс</span> в одном
					месте
				</h1>
				<p className='text-sm opacity-50'>
					Создавай программы, тренируйся с партнёром, следи за результатами
				</p>
			</div>
			<form action={formAction}>
				<Field className='mb-3'>
					<InputGroup>
						<InputGroupInput
							type='email'
							placeholder='your@email.com'
							name='email'
							aria-invalid={!!state.message}
						/>
						<InputGroupAddon>
							<MailIcon />
						</InputGroupAddon>
					</InputGroup>
					{state?.message && (
						<FieldDescription className='text-destructive'>
							{state.message}
						</FieldDescription>
					)}
				</Field>
				<Button
					disabled={pending}
					type='submit'
					className='w-full bg-black text-white rounded-xl py-3'
				>
					{pending ? 'Отправляем...' : 'Получить код'}
				</Button>
			</form>
		</div>
	)
}
