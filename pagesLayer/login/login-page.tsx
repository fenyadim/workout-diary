'use client'

import { useForm } from '@tanstack/react-form'
import { MailIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SyntheticEvent } from 'react'
import { toast } from 'sonner'
import * as z from 'zod'

import { sendOTP } from '@/actions/login'
import { Button } from '@/shared/ui/button'
import { Field, FieldError } from '@/shared/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/shared/ui/input-group'

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
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold font-syne">
          Твой <span className="block text-[#D4421A]">прогресс</span> в одном месте
        </h1>
        <p className="text-sm opacity-50">
          Создавай программы, тренируйся с партнёром, следи за результатами
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field className="mb-2">
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    placeholder="your@email.com"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              disabled={!canSubmit}
              type="submit"
              className="w-full bg-black text-white rounded-xl py-3"
            >
              {isSubmitting ? 'Отправляем...' : 'Получить код'}
            </Button>
          )}
        />
      </form>
    </div>
  )
}
