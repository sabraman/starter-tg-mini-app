"use client";

import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { Copy, Unplug, Wallet2 } from "lucide-react";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import { toast } from "sonner";

export default function WalletButton({ className, ...props }: ButtonProps) {
  const [tonConnectUI] = useTonConnectUI();
  const tonAddress = useTonAddress();

  if (tonConnectUI.connected) {
    const fullAddress = tonAddress ?? "";
    const compactAddress = `${fullAddress.slice(0, 4)}...${fullAddress.slice(-4)}`;

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button {...props} className={cn("gap-2", className)}>
            <Wallet2 className="size-4" /> {compactAddress}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="">
          <div className="flex flex-col gap-2 p-4">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => {
                  void navigator.clipboard.writeText(fullAddress).then(
                    () => {
                      toast.success("Address copied");
                    },
                    () => {
                      toast.error("Failed to copy address");
                    },
                  );
                }}
              >
                <Copy className="size-4" />
                Copy Address
              </Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                className="gap-2"
                onClick={() => tonConnectUI.disconnect()}
              >
                <Unplug className="size-4" />
                Disconnect
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Button
        {...props}
        className={cn("gap-2", className)}
        onClick={() => {
          void tonConnectUI.openModal();
        }}
      >
        <Wallet2 className="size-4" /> Connect Wallet
      </Button>
    );
  }

  // if (!) {
  //   return (
  //     <Button {...props}>
  //       <Loader2 className="size-4 animate-spin" />
  //     </Button>
  //   );
  // }
}
