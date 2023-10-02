// import { Params } from "@/types";
// import { proxy, config } from "@/config/sui";
// import { createPartialZKSignature } from "@/scripts/zkSiganture";
// import { Ed25519PublicKey } from "@mysten/sui.js/keypairs/ed25519";
// import {
//   genAddressSeed,
//   jwtToAddress,
//   ZkSignatureInputs,
// } from "@mysten/zklogin";

// const fetchData = async () => {
//   const qs = new URLSearchParams(window.location.href);
//   const jwt = qs.get("id_token")!;
// if (jwt) {
//   const state: Params = JSON.parse(localStorage.getItem(STATE)!);
//   try {
//     const response = await fetch(proxy(config.salt), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         token: jwt,
//       }),
//     });
//     const { salt }: { salt: string } = await response.json();

//     const partialZk = createPartialZKSignature(
//       jwt,
//       new Ed25519PublicKey(state.ephPublic),
//       state.epoch,
//       BigInt(state.randomness),
//       salt
//     );

//     const proofsResponse = await fetch(
//       proxy("https://prover.mystenlabs.com/v1"),
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(partialZk),
//       }
//     );
//     const proofs = await proofsResponse.json();

//     const jwtParsed = decodeJwt(jwt);

//     const addressSeed = genAddressSeed(
//       BigInt(salt),
//       "sub",
//       jwtParsed.sub!,
//       Array.isArray(jwtParsed.aud) ? jwtParsed.aud[0] : jwtParsed.aud!
//     );

//     const addr = jwtToAddress(jwt, BigInt(salt));

//     const inputs: ZkSignatureInputs = {
//       ...proofs,
//       addressSeed: addressSeed.toString(),
//     };

//     localStorage.setItem(INPUTS, JSON.stringify(inputs));
//     localStorage.setItem(JWT, jwt);
//     localStorage.setItem(ADDRESS, addr);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }
// };
// fetchData();
