import { Ed25519PublicKey } from "@mysten/sui.js/keypairs/ed25519";
import { toBigIntBE } from "bigint-buffer";

export const createPartialZKSignature = (
  jwt: string,
  ephemeralPublicKey: Ed25519PublicKey,
  maxEpoch: number,
  jwtRandomness: bigint,
  userSalt: string
) => {
  return {
    jwt,
    extendedEphemeralPublicKey: toBigIntBE(
      Buffer.from(ephemeralPublicKey.toSuiBytes())
    ).toString(),
    maxEpoch,
    jwtRandomness: jwtRandomness.toString(),
    salt: userSalt,
    keyClaimName: "sub",
  };
}
