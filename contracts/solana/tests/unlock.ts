import { assert } from "chai";
import { fetchLogsFromSignature, setup } from "./setup";
import * as anchor from "@coral-xyz/anchor";
import { initialBalance, lockAmount, tokenDecimals, tokenIndex } from "./lock";
import * as splToken from "@solana/spl-token";

describe("Token Unlocking", () => {
  it("Normal Unlock", async () => {
    try {
      const tokenMint = setup.tokenMint;
      const { pda: derivativeMintPDA, bump: derivativeMintBump } =
        setup.getDerivativeMint(tokenMint);

      let founderAta = await setup.getTokenATA(
        tokenMint,
        setup.founder.publicKey
      );
      let developerAta = await setup.getTokenATA(
        tokenMint,
        setup.developer.publicKey
      );

      let userTokenAta = await setup.getTokenATA(
        tokenMint,
        setup.user.publicKey
      );
      let userDerivativeAta = await setup.getTokenATA(
        derivativeMintPDA,
        setup.user.publicKey
      );

      const unlockAmount = 5 * 10 ** tokenDecimals;
      await setup.program.methods
        .unlock(new anchor.BN(unlockAmount))
        .accounts({
          tokenMint: tokenMint,
          signer: setup.user.publicKey,
          signerTokenAta: userTokenAta.address,
          founderAta: founderAta.address,
          developerAta: developerAta.address,
        })
        .signers([setup.user])
        .rpc();

      const tokenMintAccount = await splToken.getMint(
        setup.connection,
        tokenMint
      );

      assert(
        tokenMintAccount.supply.toString() == BigInt(initialBalance).toString(),
        "Wrong Derivative Total Supply"
      );

      const derivativeMintAccount = await splToken.getMint(
        setup.connection,
        derivativeMintPDA
      );

      assert(
        derivativeMintAccount.supply.toString() ==
          BigInt(
            lockAmount - setup.calculateFee(lockAmount) - unlockAmount
          ).toString(),
        "Wrong Derivative Total Supply"
      );

      const userTokenAtaAccount = await splToken.getAccount(
        setup.connection,
        userTokenAta.address
      );
      assert(
        userTokenAtaAccount.mint.toString() == tokenMint.toString(),
        "Wrong User Token ATA Mint"
      );
      assert(
        userTokenAtaAccount.amount ==
          BigInt(
            initialBalance -
              lockAmount +
              (unlockAmount - setup.calculateFee(unlockAmount))
          ),
        "Wrong User Token ATA Balance"
      );

      const userDerivativeAtaAccount = await splToken.getAccount(
        setup.connection,
        userDerivativeAta.address
      );
      assert(
        userDerivativeAtaAccount.mint.toString() ==
          derivativeMintPDA.toString(),
        "Wrong User Derivative ATA Mint"
      );
      assert(
        userDerivativeAtaAccount.amount ==
          BigInt(lockAmount * 0.995 - unlockAmount),
        "Wrong User Derivative ATA Balance 2"
      );

      const feeShare =
        setup.calculateFee(lockAmount) / 2 +
        setup.calculateFee(unlockAmount) / 2;
      developerAta = await setup.getTokenATA(
        tokenMint,
        setup.developer.publicKey
      );
      assert(
        developerAta.amount == BigInt(feeShare),
        "Wrong Developer ATA Balance"
      );

      founderAta = await setup.getTokenATA(tokenMint, setup.founder.publicKey);
      assert(
        founderAta.amount == BigInt(feeShare),
        "Wrong Developer ATA Balance"
      );
    } catch (err: any) {
      console.error("Caught error:", err);

      const signature =
        err?.signature ?? err?.txSig ?? err?.transactionSignature;
      if (typeof signature === "string") {
        const logs = await fetchLogsFromSignature(
          setup.program.provider.connection,
          signature
        );
        console.log("Transaction logs:", logs);
      } else {
        console.log(
          "No signature found in error object; cannot fetch logs by signature"
        );
      }
    }
  });
});
