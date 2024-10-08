import { env } from "~/env";

export const GET = () => {
  return Response.json({
    url: env.NEXT_PUBLIC_TG_APP_URL,
    name: "MiniApp Starter",
    iconUrl: `${env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  });
};
