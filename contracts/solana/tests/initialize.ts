import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";
import { program, developer, founder, user, globalInfoPDA } from "./setup";

describe("solana", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const connection = provider.connection;

  before(async () => {
    const payerPubkey = provider.wallet.publicKey;
    const payerAirdropSig = await connection.requestAirdrop(
      payerPubkey,
      2 * anchor.web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(payerAirdropSig, "confirmed");
    const payerBal = await connection.getBalance(payerPubkey);
    if (payerBal === 0)
      throw new Error("Airdrop failed: provider wallet has 0 lamports");
    const userAirdropSig = await connection.requestAirdrop(
      user.publicKey,
      1 * anchor.web3.LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(userAirdropSig, "confirmed");
  });

  it("Program Initialization", async () => {
    const tx = await program.methods
      .initializeProgram(developer.publicKey, founder.publicKey)
      .accounts({
        signer: user.publicKey,
      })
      .signers([user])
      .rpc();

    const globalInfoAccount =
      await program.account.globalInfo.fetch(globalInfoPDA);

    const developerWalletStr = globalInfoAccount.developerWallet.toBase58();
    const founderWalletStr = globalInfoAccount.founderWallet.toBase58();
    const feePercentageNum = globalInfoAccount.feePercentage.toNumber();
    const feeDividerNum = globalInfoAccount.feePercentageDivider.toNumber();
    const developerFeeShareNum = globalInfoAccount.developerFeeShare.toNumber();
    const founderFeeShareNum = globalInfoAccount.founderFeeShare.toNumber();
    const minLockValueNum = globalInfoAccount.minLockValue;

    assert(
      founder.publicKey.toString() == founderWalletStr,
      "Wrong Founder Address Set"
    );
    assert(
      developer.publicKey.toString() == developerWalletStr,
      "Wrong Developer Address Set"
    );
    assert(feePercentageNum == 5, "Wrong feePercentage Set");
    assert(feeDividerNum == 1000, "Wrong feePercentageDivider Set");
    assert(developerFeeShareNum == 50, "Wrong developerFeeShare Set");
    assert(founderFeeShareNum == 50, "Wrong founderFeeShare Set");
    assert(minLockValueNum == 400, "Wrong minLockValue Set");
  });
});
