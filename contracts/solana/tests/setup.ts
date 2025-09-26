import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import type { Buffcat } from "../target/types/buffcat";

export const program = anchor.workspace.Buffcat as Program<Buffcat>;
export const developer = anchor.web3.Keypair.generate();
export const founder = anchor.web3.Keypair.generate();
export const user = anchor.web3.Keypair.generate();

export const GLOBAL_INFO_STATIC_SEED = Buffer.from("global_info");
export const TOKEN_INFO_STATIC_SEED = Buffer.from("token_info");
export const VAULT_AUTHORITY_STATIC_SEED = Buffer.from("vault_authority");
export const AUTHORIZED_UPDATER_INFO_STATIC_SEED = Buffer.from(
  "authorized_updater_info"
);
export const METADATA_STATIC_SEED = Buffer.from("metadata");
export const DERIVATIVE_AUTHORITY_SEED = Buffer.from("derivative_authority");

export const [globalInfoPDA, globalInfoBump] =
  anchor.web3.PublicKey.findProgramAddressSync(
    [GLOBAL_INFO_STATIC_SEED],
    program.programId
  );
