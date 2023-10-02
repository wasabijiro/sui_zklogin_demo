import { generateNonce, generateRandomness } from "@mysten/zklogin";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { useEffect, useState } from "react";
import { config, provider } from "../config/sui";
import { Params } from "../types";
import { STATE } from "@/config";

// Handle Buffer error
(window as any).global = window;
(window as any).Buffer = (window as any).Buffer || require("buffer").Buffer;

// function generateRandomBytes(length: number): string {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   const charactersLength = characters.length;
//   let result = "";

//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }

//   return result;
// }

// function generateRandomness(): bigint {
//   const randomBytesArray = generateRandomBytes(16); // Generate 16 random bytes

//   const bigIntValue = Buffer.from(randomBytesArray).reduce(
//     // eslint-disable-next-line no-undef
//     (acc, byte) => (acc << 8n) | BigInt(byte),
//     0n
//   );
//   return bigIntValue;
// }

// const getActiveNetworkSuiClient = async (): Promise<SuiClient> => {
//   try {
//     const client = new SuiClient({ url: getFullnodeUrl("testnet") });

//     return client;
//   } catch (error) {
//     console.error("Error creating Sui Client:", error);
//     throw error;
//   }
// };

export const useNonce = () => {
  const [nonce, setNonce] = useState<string | null>(null);

  useEffect(() => {
    const getNonce = async () => {
      try {
        // const suiClient = await getActiveNetworkSuiClient();
        // const { epoch } = await suiClient.getLatestSuiSystemState();

        const { epoch } = await provider.getLatestSuiSystemState();

        const maxEpoch = Number(epoch) + 2; // this means the ephemeral key will be active for 2 epochs from now.
        const ephemeralKeyPair = new Ed25519Keypair();

        const randomness = generateRandomness();

        const state: Params = {
          epoch: maxEpoch,
          randomness: randomness.toString(),
          ephPublic: ephemeralKeyPair.getPublicKey().toBase64(),
          ephPrivate: ephemeralKeyPair.export().privateKey,
        };

        // const maxEpoch = epoch + 2;
        // const ephemeralKeyPair = new Ed25519Keypair();
        // const randomness = generateRandomness();
        const calculatedNonce = generateNonce(
          ephemeralKeyPair.getPublicKey(),
          maxEpoch,
          randomness
        );

        localStorage.setItem(STATE, JSON.stringify(state));
        setNonce(calculatedNonce);
      } catch (error) {
        console.error("Error getting nonce:", error);
      }
    };
    getNonce();
  }, []);

  return { nonce };
};
