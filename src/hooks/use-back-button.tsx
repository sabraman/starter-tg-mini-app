import { backButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useBackButton(url?: string) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  }, [router, url]);

  useEffect(() => {
    backButton.show();
    backButton.onClick(handleClick);

    return () => {
      backButton.hide();
      backButton.offClick(handleClick);
    };
  }, [handleClick, router]);
}
