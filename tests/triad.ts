import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Triad } from "../target/types/triad";

describe("Triad", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Triad as Program<Triad>;

  it("success: create vault", async () => {});
});
