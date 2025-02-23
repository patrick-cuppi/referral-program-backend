import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'
import { redis } from '../redis/client'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access invite link and redirects user',
        tags: ['referral'],
        // description: '',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      console.log(await redis.hgetall('referral:access-count')) // Verificar a somatória do Redis sem um Client para o Redis

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    }
  )
}
