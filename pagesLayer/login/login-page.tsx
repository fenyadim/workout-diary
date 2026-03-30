'use client'

import { useForm } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { sendOTP } from '@/actions/login'
import { cn } from '@/lib/utils'
import { Field, FieldError } from '@/shared/ui/field'

const formSchema = z.object({
  email: z.email('Неверный email'),
})

export const LoginPage = () => {
  const router = useRouter()
  const form = useForm({
    defaultValues: { email: '' },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { success, message } = await sendOTP(value.email)
      if (success) {
        toast.success(message as string)
        router.replace(`/login/verify?email=${value.email}`)
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
      {/* Hero section */}
      <div className="flex flex-col gap-3 px-7 pt-10 pb-0">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-9 h-9 rounded-4xl bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 9h4m4 0h4M9 5v8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[13px] font-bold tracking-[0.15em] text-foreground">WORKDI</span>
        </div>

        <h1
          className="text-[48px] font-extrabold leading-none text-foreground"
          style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
        >
          Войдите{'\n'}в аккаунт.
        </h1>

        <p className="text-base text-muted-foreground leading-relaxed">
          Введите email — мы пришлём
          <br />
          одноразовый код для входа.
        </p>
      </div>

      {/* Form section */}
      <div className="flex flex-col gap-4 px-7 pb-12 mt-10">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field className="flex flex-col gap-1.5">
                  <label
                    htmlFor={field.name}
                    className="text-xs font-semibold tracking-[0.08em] text-muted-foreground uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="your@email.com"
                    aria-invalid={isInvalid}
                    className={cn(
                      'h-13 w-full rounded-2xl bg-muted px-4 text-[15px] text-foreground placeholder:text-muted-foreground',
                      'outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all',
                      isInvalid && 'ring-2 ring-destructive/50'
                    )}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          />

          <div className="h-2" />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button
                disabled={!canSubmit}
                type="submit"
                className="h-14 w-full rounded-[20px] bg-primary text-white text-base font-bold disabled:opacity-50 transition-opacity active:scale-[0.98]"
                style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
              >
                {isSubmitting ? 'Отправляем...' : 'Отправить код'}
              </button>
            )}
          />
        </form>

        <div className="flex items-center justify-center gap-1">
          <span className="text-sm text-muted-foreground">Нет аккаунта?</span>
          <button className="text-sm font-semibold text-primary">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}
