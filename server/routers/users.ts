import { t } from "../trpc";
import { z } from "zod";

// routers
// procedures
// input, output
// context

const userProcedure = t.procedure.input(
  z.object({
    userId: z.string(),
  }),
);

export const userRouter = t.router({
  get: userProcedure.query((input) => {
    return {
      id: input.input,
    };
  }),
  update: userProcedure
    // two input procedures, will merge together so we can do nested
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation((req) => {
      console.log(req.ctx.isAdmin);
      console.log(`Updating user ${req.input.userId} ${req.input.name}`);
    }),
  getUsers: t.procedure.input(z.string()).query(() => {
    return [
      { name: "Gaza", id: 1 },
      { name: "Minying", id: 2 },
    ];
  }),

  getUser: t.procedure.query(() => {
    return { name: "Gaza", id: 1 };
  }),
});
