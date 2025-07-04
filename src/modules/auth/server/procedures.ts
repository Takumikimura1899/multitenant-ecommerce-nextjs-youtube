import { headers as getHeaders, cookies as getCookies } from 'next/headers';

import { baseProcedure, createTRPCRouter } from '@/trpc/init';
import { Category } from '@/payload-types';
import z from 'zod';
import { TRPCError } from '@trpc/server';
import { AUTH_COOKIE } from '../constants';
import { registerSchema } from '../schemas';

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.db.auth({ headers });

    return session;
  }),
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
  register: baseProcedure
    .input(registerSchema)
    .mutation(async ({ input, ctx }) => {
      await ctx.db.create({
        collection: 'users',
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });
      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to login',
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: '/',
        // @TODO: Ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: ""
      });
    }),
  login: baseProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.db.login({
        collection: 'users',
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Failed to login',
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: '/',
        // @TODO: Ensure cross-domain cookie sharing
        // sameSite: "none",
        // domain: ""
      });
    }),
});
