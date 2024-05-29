import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      // pass custom headers
      headers: {
        Authorization: "CUSTOM_TOKEN",
      },
    }),
  ],
});

const main = async () => {
  const result = await client.users.getUser.query();
  await client.users.getUsers.query("qwe");
  console.log(result);
};
main();
