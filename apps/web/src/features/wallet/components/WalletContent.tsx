"use client";
import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import { injected } from "wagmi/connectors";
import { Blockchain } from "@/types/global";
import { WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { useAtom, useAtomValue } from "jotai";
import { currentUserAtom, selectedBlockchainAtom } from "@/store/global";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: true }
);

const formatWalletAddress = (address: string | null) => {
  if (!address) return "";
  return `${address.slice(0, 8)}...${address.slice(-4)}`;
};

const WalletContent: React.FC = () => {
  const { connect } = useConnect();
  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const { disconnect: disconnectEvm } = useDisconnect();
  const {
    publicKey: solanaAddress,
    disconnect: disconnectSolana,
    connected: isSolanaConnected,
  } = useWallet();
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const selectedBlockchain = useAtomValue(selectedBlockchainAtom);

  useEffect(() => {
    if (selectedBlockchain.id === "sol") {
      if (isSolanaConnected && solanaAddress) {
        setCurrentUser({
          address: solanaAddress.toString(),
          loggedIn: true,
        });
      } else {
        setCurrentUser({
          address: "",
          loggedIn: false,
        });
      }
    } else {
      if (isEvmConnected && evmAddress) {
        setCurrentUser({
          address: evmAddress,
          loggedIn: true,
        });
      } else {
        setCurrentUser({
          address: "",
          loggedIn: false,
        });
      }
    }
  }, [
    selectedBlockchain,
    evmAddress,
    solanaAddress,
    isSolanaConnected,
    isEvmConnected,
  ]);

  const handleNoWalletConnectAttempt = (blockchain: Blockchain) => {
    toast.error(`No ${selectedBlockchain.name} wallet found.`);
  };

  if (selectedBlockchain.id == "sol") {
    if (window != undefined && window.solana != undefined) {
      return solanaAddress && currentUser.loggedIn ? (
        <div className="flex items-center space-x-4">
          <div className="rounded-lg py-2 px-4 flex items-center">
            <div className="rounded-lg py-2 px-4 flex items-center">
              <Badge
                variant="outline"
                className="flex items-center space-x-1 text-custom-primary-text w-32 p-2 rounded-lg"
              >
                <span>{formatWalletAddress(solanaAddress.toString())}</span>
              </Badge>
            </div>
            <WalletDisconnectButton />
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 mb-2 lg:mb-0">
          <WalletMultiButtonDynamic />
          <WalletDisconnectButton />
        </div>
      );
    } else {
      return (
        <Button
          size="lg"
          onClick={() => handleNoWalletConnectAttempt(selectedBlockchain)}
          className="bg-black hover:bg-black text-primary-foreground 
                border-primary border-2 transition-all hover:scale-103
                font-bold text-lg px-8 cursor-pointer"
        >
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      );
    }
  }

  if (!isEvmConnected || !currentUser.loggedIn) {
    return (
      <Button
        size="lg"
        className="bg-black hover:bg-black text-primary-foreground 
                border-primary border-2 transition-all hover:scale-103
                font-bold text-lg px-8 cursor-pointer"
        onClick={() => {
          if (window != undefined && window.ethereum == undefined) {
            handleNoWalletConnectAttempt(selectedBlockchain);
          } else {
            connect({ connector: injected() });
          }
        }}
      >
        <Wallet className="h-4 w-4" />
        <span>Connect Wallet</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center">
      <div className="rounded-lg py-2 px-4 flex items-center">
        <Badge
          variant="outline"
          className="flex items-center space-x-1 text-custom-primary-text w-32 p-2 rounded-lg"
        >
          <span>{formatWalletAddress(evmAddress!)}</span>
        </Badge>
      </div>
      <Button
        size="lg"
        className="bg-black hover:bg-black text-primary-foreground 
                border-primary border-2 transition-all hover:scale-103
                font-bold text-lg px-8 cursor-pointer"
        onClick={() =>
          selectedBlockchain.name === "Ethereum"
            ? disconnectEvm()
            : disconnectSolana()
        }
      >
        <LogOut className="h-4 w-4 mr-2" />
        Disconnect
      </Button>
    </div>
  );
};

export default WalletContent;
