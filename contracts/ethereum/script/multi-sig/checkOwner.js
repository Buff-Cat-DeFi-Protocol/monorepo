import { ethers } from "ethers";

const OWNABLE_ABI = [
  "function owner() view returns (address)"
];

async function main() {
  const RPC_URL = "http://127.0.0.1:8545";
  const CONTRACT_ADDRESS = "0xA15BB66138824a1c7167f5E85b957d04Dd34E468";

  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    OWNABLE_ABI,
    provider
  );

  const owner = await contract.owner();

  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Owner:", owner);
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
