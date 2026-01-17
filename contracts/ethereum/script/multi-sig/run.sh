#!/bin/bash
set -e

# Load environment variables from .env if it exists
if [ -f ".env" ]; then
  echo "Sourcing .env..."
  set -a
  source .env
  set +a
fi

# forge script MultiSig.s.sol:MultiSig --verbosity \
#     --rpc-url $ETH_RPC_URL \
#     --broadcast \
#     --private-key $OWNER_PRIVATE_KEY

forge script MultiSig.s.sol:MultiSig --verbosity \
    --rpc-url $BASE_RPC_URL \
    --broadcast \
    --private-key $OWNER_PRIVATE_KEY \
    --chain 8453
