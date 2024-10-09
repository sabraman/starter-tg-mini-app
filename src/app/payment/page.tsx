"use client";

import WalletButton from "~/components/common/wallet-button";
import { useBackButton } from "~/hooks/use-back-button";

export default function PaymentPage() {
  useBackButton();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 px-8">
      <h1 className="text-3xl font-bold">Wallet Test</h1>

      <WalletButton />
    </div>
  );
}
