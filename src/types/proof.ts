import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";

export type ProofResponse = {
  proofPoints: {
    a: string[];
    b: string[][];
    c: string[];
  };
  headerBase64: string;
  issBase64Details: {
    indexMod4: number;
    value: string;
  };
};

// export type ZkData = {
//   maxEpoch: number;
//   minEpoch: number;
//   ephemeralKeyPair: Ed25519Keypair;
//   epkBigInt: bigint;
//   randomness: bigint;
//   nonce: string;
//   jwt: string;
//   salt: bigint;
//   address: string;
//   proof: ProofResponse;
//   profileInfo?: GoogleOAuthProfileInfo | TwitchOauthProfileInfo;
//   provider: ZkProvider;
// };
