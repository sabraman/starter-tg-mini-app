import { backButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useBackButton(onClick?: () => void | undefined) {
  const router = useRouter();

  useEffect(() => {
    const _onClick =
      onClick ??
      (() => {
        router.back();
      });

    backButton.show();
    backButton.onClick(_onClick);

    return () => {
      backButton.hide();
      backButton.offClick(_onClick);
    };
  }, [onClick, router]);
}
