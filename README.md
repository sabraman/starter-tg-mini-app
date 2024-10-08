# Telegram Mini App Starter

This project is a starter for building Telegram Mini Apps using Next.js.

## Stack

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Telegram Mini App SDK](https://docs.telegram-mini-apps.com/)
- [Shadcn UI](https://ui.shadcn.com/)

## Local Development

1. Install dependencies:

   ```bash
   pnpm install
   ```
2. Create a bot in Telegram (via **@BotFather** and using the command `/newbot`).

3. Set the `TG_API_TOKEN` in `.env` to the API token of your bot.

4. Configure a publicly accessible URL to your local machine using *ngrok* or *cloudflare tunnel*.

5. Configure the bot using **@BotFather** and the command `/newapp`. Use the public URL you configured in the previous step as the "App link". This step will let you choose an App name, it can be used with the bot url to directly open the app. e.g. `https://t.me/{bot_name}/{app_name}`.

6. Configure the bot's menu button to point to the mini app's url.

7. Run the development server:

```bash
pnpm dev
```

7. Open the mini app via either the Mini App's URL or the clicking on the menu button in the bot.
