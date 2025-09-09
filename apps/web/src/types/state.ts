import { TokenInfo } from "@uniswap/token-lists";

export type TokenSelectorAtom = {
  isOpen: boolean;
  onClose: () => void;
  onSelectToken: (token: TokenInfo) => void;
};

export type SelectedTokensAtom = {
  lockToken: TokenInfo | null;
  unlockToken: TokenInfo | null;
};

export type Tab = "lock" | "unlock";
