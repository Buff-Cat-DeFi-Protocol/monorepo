export type SupportedBlockchain = "eth" | "base" | "solana";

export type Blockchain = {
  id: SupportedBlockchain;
  name: string;
  logoUrl: string;
  isSupported: boolean;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  address: string;
};
