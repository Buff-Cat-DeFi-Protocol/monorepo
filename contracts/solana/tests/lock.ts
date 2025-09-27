import * as anchor from "@coral-xyz/anchor";
import * as splToken from "@solana/spl-token";
import {
  provider,
  connection,
  program,
  developer,
  founder,
  user,
} from "./setup";
import {
  Collection,
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionDataArgs,
  Creator,
  MPL_TOKEN_METADATA_PROGRAM_ID,
  Uses,
} from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey, SendTransactionError } from "@solana/web3.js";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  none,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  fromWeb3JsKeypair,
  fromWeb3JsPublicKey,
} from "@metaplex-foundation/umi-web3js-adapters";

describe("lock", () => {
  it("Token Locking", async () => {
    const tokenDecimals = 9;
    const tokenMint = await splToken.createMint(
      connection,
      user,
      user.publicKey,
      user.publicKey,
      tokenDecimals
    );
    const derivativeMint = anchor.web3.Keypair.generate();

    const [metadataPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("metadata"),
        new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID).toBuffer(),
        tokenMint.toBuffer(),
      ],
      new PublicKey(MPL_TOKEN_METADATA_PROGRAM_ID)
    );

    const umi = createUmi(connection);
    const umiSigner = createSignerFromKeypair(umi, fromWeb3JsKeypair(user));
    umi.use(signerIdentity(umiSigner, true));

    const metadata = {
      name: "MyToken",
      symbol: "MT",
      uri: "https://example.com/metadata.json",
    };

    const onChainData = {
      ...metadata,
      sellerFeeBasisPoints: 0,
      creators: none<Creator[]>(),
      collection: none<Collection>(),
      uses: none<Uses>(),
    };

    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint: fromWeb3JsPublicKey(tokenMint),
      mintAuthority: umiSigner,
    };
    const data: CreateMetadataAccountV3InstructionDataArgs = {
      isMutable: true,
      collectionDetails: null,
      data: onChainData,
    };
    const txid = await createMetadataAccountV3(umi, {
      ...accounts,
      ...data,
    }).sendAndConfirm(umi);
    console.log(txid);

    const userTokenAta = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      user,
      tokenMint,
      user.publicKey
    );
    const userDerivativeAta = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      user,
      derivativeMint.publicKey,
      user.publicKey
    );
    const developerAta = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      developer,
      tokenMint,
      developer.publicKey
    );
    const founderAta = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      founder,
      tokenMint,
      founder.publicKey
    );

    const initialBalance = 100 * 10 ** tokenDecimals;
    await splToken.mintTo(
      connection,
      user,
      tokenMint,
      user.publicKey,
      user.publicKey,
      initialBalance
    );

    const lockAmount = 10 * 10 ** tokenDecimals;
    const tx = await program.methods
      .lock(new anchor.BN(lockAmount))
      .accounts({
        tokenMint: tokenMint,
        metadata: metadataPDA,
        derivativeMint: derivativeMint.publicKey,
        signer: user.publicKey,
        signerTokenAta: userTokenAta.address,
        signerDerivativeAta: userDerivativeAta.address,
        developerAta: developerAta.address,
        founderAta: founderAta.address,
      })
      .signers([user])
      .rpc();
    console.log("Lock TX:", tx);
  });
});
