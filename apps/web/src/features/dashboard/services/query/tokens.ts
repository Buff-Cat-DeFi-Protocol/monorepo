import { SupportedBlockchain } from "@/types/global";
import { TokenInfo, TokenList } from "@uniswap/token-lists";

export async function getTokensList(
  blockchain: SupportedBlockchain
): Promise<TokenInfo[]> {
  let tokensList = [];
  if (blockchain === "eth") {
    tokensList = await getEthereumTokensList();
  } else if (blockchain === "base") {
    tokensList = await getBaseTokensList();
  } else {
    tokensList = await getSolanaTokensList();
  }
  return tokensList;
}

export const ethereumTokensList: TokenList = {
  name: "Ethereum Token List",
  timestamp: "2024-06-01T00:00:00Z",
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tokens: [
    {
      chainId: 103, // Solana mainnet-beta (use 103 for devnet, 102 for testnet)
      address: "0xb19b36b1456E65E3A6D514D3F715f204BD59f431",
      name: "My Token",
      symbol: "MT",
      decimals: 18,
      logoURI:
        "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
      tags: ["metaplex", "spl-token"],
      extensions: {
        metadata: {
          metaplex: {
            metadataAccount: "DSX6i4R3Ksj3xi1Xhzn2RCRPbRm1p5jgSgkf1T3qdCfd",
          },
          uri: "https://assets.coingecko.com/coins/images/279/standard/ethereum.png?1696501628",
        },
      },
    },
  ],
};

export async function getEthereumTokensList() {
  const url =
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/tokenlist.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const list: TokenList = await res.json();
    return ethereumTokensList.tokens;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getBaseTokensList() {
  const url =
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/tokenlist.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const list: TokenList = await res.json();
    return list.tokens;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const solanaTokensList: TokenList = {
  name: "Solana Token List",
  timestamp: "2024-06-01T00:00:00Z",
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  tokens: [
    {
      chainId: 103, // Solana mainnet-beta (use 103 for devnet, 102 for testnet)
      address: "2YkPsDb8G7WHv9xSwcdRvdJkbbRyyuc8iKkYfebAhRbC",
      name: "My Token",
      symbol: "MT",
      decimals: 9,
      logoURI:
        "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756",
      tags: ["metaplex", "spl-token"],
      extensions: {
        metadata: {
          metaplex: {
            metadataAccount: "DSX6i4R3Ksj3xi1Xhzn2RCRPbRm1p5jgSgkf1T3qdCfd",
          },
          uri: "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756",
        },
      },
    },
  ],
};

export async function getSolanaTokensList() {
  const url =
    "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/tokenlist.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }
    const list: TokenList = await res.json();
    return solanaTokensList.tokens;
  } catch (error) {
    console.error(error);
    return [];
  }
}
