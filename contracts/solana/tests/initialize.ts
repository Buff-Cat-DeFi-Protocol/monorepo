import { assert } from "chai";
import { setup } from "./setup";

describe("Program Initialization", () => {
  before(async () => {
    await setup.initialize();
  });

  it("Normal Initialization", async () => {
    await setup.program.methods
      .initializeProgram(setup.developer.publicKey, setup.founder.publicKey)
      .accounts({
        signer: setup.user.publicKey,
      })
      .signers([setup.user])
      .rpc();

    const globalInfoAccount = await setup.program.account.globalInfo.fetch(
      setup.globalInfoPDA
    );

    const developerWalletStr = globalInfoAccount.developerWallet.toBase58();
    const founderWalletStr = globalInfoAccount.founderWallet.toBase58();
    const feePercentageNum = globalInfoAccount.feePercentage.toNumber();
    const feeDividerNum = globalInfoAccount.feePercentageDivider.toNumber();
    const developerFeeShareNum = globalInfoAccount.developerFeeShare.toNumber();
    const founderFeeShareNum = globalInfoAccount.founderFeeShare.toNumber();
    const minFee = globalInfoAccount.minFee.toNumber();
    const minFeeForDistribution =
      globalInfoAccount.minFeeForDistribution.toNumber();

    assert(
      setup.founder.publicKey.toString() == founderWalletStr,
      "Wrong Founder Address Set"
    );
    assert(
      setup.developer.publicKey.toString() == developerWalletStr,
      "Wrong Developer Address Set"
    );
    assert(feePercentageNum == 5, "Wrong feePercentage Set");
    assert(feeDividerNum == 1000, "Wrong feePercentageDivider Set");
    assert(developerFeeShareNum == 50, "Wrong developerFeeShare Set");
    assert(founderFeeShareNum == 50, "Wrong founderFeeShare Set");
    assert(minFee == 2, "Wrong minFee Set");
    assert(minFeeForDistribution == 2, "Wrong minFeeForDistribution Set");
  });
});
