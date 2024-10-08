import { backButton } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

/**
 * The back button is a native telegram button that is displayed at the top-left
 * of the screen/view. It is used to navigate back in the app. This hook
 * activates the back button and sets up an event listener for the click event.
 * The button will be deactivated during clean-up.
 *
 * @param url - The URL to navigate to when the back button is clicked. If not
 * provided, the browser's default back button behavior will be used.
 */
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
