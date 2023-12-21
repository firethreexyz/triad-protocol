import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Triad } from "../target/types/triad";

describe("triad", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Triad as Program<Triad>;

  it("Is initialized!", async () => {});
});
