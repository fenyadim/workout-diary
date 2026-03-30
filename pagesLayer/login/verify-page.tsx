'use client'

import { useForm } from '@tanstack/react-form'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { ArrowLeft } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { verifyOTP } from '@/actions/login'
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
  const email = queryParams.get('email')
  const router = useRouter()

  const form = useForm({
    defaultValues: { otp: '' },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { success, message } = await verifyOTP(value.otp, email!)
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
    <div className="flex flex-col flex-1">
      {/* Top bar with back button */}
      <div className="flex items-center h-12 px-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-foreground" />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2.5 px-7 pt-8 pb-12">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h3m3 0h4M7 3v8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xs font-bold tracking-[0.15em] text-foreground">WORKDI</span>
        </div>

        <h1
          className="text-[38px] font-extrabold leading-none text-foreground mt-2"
          style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
        >
          Проверьте{'\n'}почту.
        </h1>

        <p className="text-[15px] text-muted-foreground leading-relaxed mt-1">
          Мы отправили 6-значный код на
          <br />
          <span className="text-foreground font-medium">{email ?? 'ваш email'}</span>
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-6 mt-4">
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
                    containerClassName="justify-between gap-2"
                  >
                    <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:h-14 *:data-[slot=input-otp-slot]:flex-1 *:data-[slot=input-otp-slot]:rounded-2xl *:data-[slot=input-otp-slot]:border-0 *:data-[slot=input-otp-slot]:bg-muted *:data-[slot=input-otp-slot]:text-xl *:data-[slot=input-otp-slot]:font-bold *:data-[slot=input-otp-slot]:text-foreground">
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
              <button
                type="submit"
                disabled={!canSubmit}
                className="h-14 w-full rounded-[20px] bg-primary text-white text-base font-bold disabled:opacity-50 transition-opacity active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                {isSubmitting ? 'Проверяем...' : 'Подтвердить'}
              </button>
            )}
          />

          <div className="flex items-center justify-center gap-1">
            <span className="text-sm text-muted-foreground">Не получили письмо?</span>
            <button type="button" className="text-sm font-semibold text-primary">
              Отправить снова
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
