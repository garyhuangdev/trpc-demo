import { isAdminProcedure, t } from "../trpc";
import { userRouter } from "./users";

export const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Test";
  }),
  logToServer: t.procedure
    .input((v) => {
      if (typeof v === "string") return v;

      throw new Error("Invalid input, Expected string");
    })
    .mutation((req) => {
      console.log(`Client says ${req.input}`);
    }),
  secretData: isAdminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return "secure admin data";
  }),
  users: userRouter,
});

// merge routers
export const mergeRouter = t.mergeRouters(appRouter, userRouter);
