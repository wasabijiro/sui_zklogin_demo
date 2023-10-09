import type { ProofResponse } from "../types/proof";

namespace ProofService {
  export interface Payload {
    jwt: string;
    extendedEphemeralPublicKey: bigint;
    maxEpoch: number;
    jwtRandomness: bigint;
    salt: bigint;
    keyClaimName: "sub";
  }

  export interface PayloadJson {
    jwt: string;
    extendedEphemeralPublicKey: string;
    maxEpoch: number;
    jwtRandomness: string;
    salt: string;
    keyClaimName: "sub";
  }
}

export async function getProof({
  jwt,
  ephemeralPublicKey,
  maxEpoch,
  randomness,
  salt,
}: {
  jwt: string;
  ephemeralPublicKey: bigint;
  maxEpoch: number;
  randomness: bigint;
  salt: bigint;
}): Promise<{ proof: ProofResponse }> {
  const payload: ProofService.Payload = {
    jwt,
    extendedEphemeralPublicKey: ephemeralPublicKey,
    maxEpoch: maxEpoch,
    jwtRandomness: randomness,
    salt,
    keyClaimName: "sub",
  };

  const payloadJson: ProofService.PayloadJson = {
    ...payload,
    extendedEphemeralPublicKey: payload.extendedEphemeralPublicKey.toString(),
    jwtRandomness: payload.jwtRandomness.toString(),
    salt: payload.salt.toString(),
  };

  const MYSTEN_PROVING_SERVICE_URL = "https://prover.mystenlabs.com/v1";

  const response = await fetch(MYSTEN_PROVING_SERVICE_URL, {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(payloadJson),
  });

  const json = await response.json();
  return { proof: json };
}
