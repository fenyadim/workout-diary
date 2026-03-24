import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { emailOTP } from 'better-auth/plugins'
import { db } from './prisma'

export const auth = betterAuth({
	database: prismaAdapter(db, {
		provider: 'postgresql',
	}),
	emailAndPassword: {
		enabled: false,
	},
	plugins: [
		emailOTP({
			sendVerificationOTP: async ({ email, otp, type }) => {
				await fetch('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						from: 'onboarding@resend.dev',
						to: email,
						subject: 'Код для входа — Дневник тренировок',
						html: `
            <div style="font-family:sans-serif;max-width:480px;margin:auto">
              <h2>Ваш код для входа</h2>
              <p style="font-size:32px;font-weight:bold;letter-spacing:8px">${otp}</p>
              <p style="color:gray;font-size:12px">Код действует 10 минут</p>
            </div>
          `,
					}),
				})
			},
		}),
	],
})

export type Session = typeof auth.$Infer.Session
