export type SupportedBlockchain = "eth" | "base" | "sol";

export type Blockchain = {
  id: SupportedBlockchain;
  name: string;
  logoUrl: string;
  isSupported: boolean;
};

export type Language =
  | "english"
  | "chinese"
  | "hindi"
  | "spanish"
  | "vietnamese"
  | "portuguese"
  | "korean"
  | "japanese"
  | "russian"
  | "french";

export type TextContent = {
  name: string;
};

export type Translations = {
  [key in Language]: TextContent;
};
