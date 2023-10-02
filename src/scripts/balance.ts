import { provider } from "@/config/sui";

export const refreshBalance = async (wallet: string) => {
  const balance = await provider.getBalance({ owner: wallet });
};
