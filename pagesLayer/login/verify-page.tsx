'use client'

import { useForm } from '@tanstack/react-form'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { verifyOTP } from '@/actions/login'
import { Button } from '@/shared/ui/button'
import { Field, FieldError } from '@/shared/ui/field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shared/ui/input-otp'

const formSchema = z.object({
  otp: z
    .string()
    .regex(/^[0-9]*$/)
    .min(1, 'Неверный код'),
})

export const VerifyPage = () => {
  const queryParams = useSearchParams()
  const query = queryParams.get('email')
  const router = useRouter()

  const form = useForm({
    defaultValues: { otp: '' },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { success, message } = await verifyOTP(value.otp, query!)
      if (success) {
        toast.success(message as string)
        router.replace('/')
      } else {
        toast.error(message as string)
      }
    },
  })

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-500">Код отправлен на email</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <form.Field
            name="otp"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field>
                  <InputOTP
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value)}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                      <InputOTPSlot index={0} aria-invalid={isInvalid} />
                      <InputOTPSlot index={1} aria-invalid={isInvalid} />
                      <InputOTPSlot index={2} aria-invalid={isInvalid} />
                      <InputOTPSlot index={3} aria-invalid={isInvalid} />
                      <InputOTPSlot index={4} aria-invalid={isInvalid} />
                      <InputOTPSlot index={5} aria-invalid={isInvalid} />
                    </InputOTPGroup>
                  </InputOTP>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit} className="w-full">
                {isSubmitting ? 'Проверяем...' : 'Войти'}
              </Button>
            )}
          />
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
