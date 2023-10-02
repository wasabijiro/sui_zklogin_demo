import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";

export const config = {
  //network: "testnet",
  //salt: "http://salt.api-testnet.mystenlabs.com/get_salt",
  network: "devnet",
  salt: "http://salt.api-devnet.mystenlabs.com/get_salt",
};

export const provider = new SuiClient({
  url: getFullnodeUrl(config.network as any),
});
