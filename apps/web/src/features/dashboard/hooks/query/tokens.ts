import { SupportedBlockchain } from "@/types/global";
import { cacheAllTokens, getCachedAllTokens } from "../../lib/cache/tokens";
import { TokenInfo } from "@uniswap/token-lists";
import { useQuery } from "@tanstack/react-query";
import { getTokensList } from "../../services/query/tokens";

export function useAllTokensList(blockchain: SupportedBlockchain) {
  return useQuery<TokenInfo[] | undefined>({
    queryKey: [`allTokensList_for_${blockchain}`, blockchain],
    queryFn: async () => {
      const cachedData = getCachedAllTokens(blockchain);
      if (cachedData.isCached && cachedData.lockTokens)
        return cachedData.lockTokens;
      // If no cache or expired, fetch new data
      const tokens = await getTokensList(blockchain);
      // Cache the parsed data
      cacheAllTokens(tokens, blockchain);
      return tokens;
    },
  });
}
