import { mainButton } from "@telegram-apps/sdk-react";
import { useEffect } from "react";

/**
 * The main button is a native telegram button that is displayed at the bottom
 * of the screen. It is used to perform actions in the app. This hook activates
 * the main button and sets up an event listener for the click event. The button
 * will be deactivated during clean-up.
 *
 * @param onClick - The function to be called when the main button is clicked.
 * Make sure the function is either defined outside of the react rendering
 * life-cycle or memoized (using useCallback) to avoid unnecessary re-renders.
 */
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
