'use client'

import { useForm } from '@tanstack/react-form'

interface ILoginForm {
	defaultValues: Record<string, string>
	onSubmit: () => void
}

export const LoginForm = ({ defaultValues }: ILoginForm) => {
	const form = useForm({
		defaultValues,
	})
}
