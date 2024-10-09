import { isErrorOfType, parse, validate } from "@telegram-apps/init-data-node";
import { cookies } from "next/headers";
import { env } from "~/env";

export const COOKIE_NAME = "tg-init-data";

function authenticate(initDataRaw: string) {
  const apiToken = env.TG_API_TOKEN;

  try {
    validate(initDataRaw, apiToken);

    const initData = parse(initDataRaw);

    return {
      isAuthorized: true,
      initData,
    } as const;
  } catch (e) {
    if (isErrorOfType(e, "ERR_SIGN_INVALID")) {
      console.log("Sign is invalid");
    } else if (isErrorOfType(e, "ERR_AUTH_DATE_INVALID")) {
      console.log("Auth date is invalid");
    } else if (isErrorOfType(e, "ERR_HASH_INVALID")) {
      console.log("Hash is invalid");
    } else if (isErrorOfType(e, "ERR_EXPIRED")) {
      console.log("Init data is expired");
    } else {
      console.log("Unknown error", e);
    }
    return {
      isAuthorized: false,
      initData: null,
    } as const;
  }
}

export async function signIn(initDataRaw: string) {
  const result = authenticate(initDataRaw);

  if (result.isAuthorized) {
    cookies().set(COOKIE_NAME, initDataRaw);
  }

  return result;
}

export async function getAuth() {
  const initDataRaw = cookies().get(COOKIE_NAME)?.value;
  if (!initDataRaw) {
    return {
      isAuthorized: false,
      userData: null,
    } as const;
  }

  const { initData, isAuthorized } = authenticate(initDataRaw);

  return {
    isAuthorized,
    userData: initData?.user ?? null,
  } as const;
}
