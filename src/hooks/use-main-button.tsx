import { mainButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

export function useMainButton(onClick: () => void) {
  useEffect(() => {
    mainButton.setParams({
      isEnabled: true,
      isVisible: true,
      text: "Demo",
      hasShineEffect: false,
    });
    mainButton.onClick(onClick);

    return () => {
      mainButton.offClick(onClick);
      mainButton.setParams({
        isEnabled: false,
        isVisible: false,
      });
    };
  }, [onClick]);
}
