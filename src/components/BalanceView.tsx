import React, { useState, useEffect } from "react";
import { ADDRESS } from "@/config";
import { provider } from "@/config/sui";

export const BalanceView = () => {
  const [balance, setBalance] = useState(null);
  const savedAddress = localStorage.getItem(ADDRESS);

  const refreshBalance = async (wallet: string) => {
    try {
      const balanceResult = await provider.getBalance({ owner: wallet });
      setBalance(balanceResult.totalBalance / 10 ** 9);
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  useEffect(() => {
    if (savedAddress) {
      refreshBalance(savedAddress);
    }
  }, [savedAddress]);

  return (
    <div className="flex items-center gap-3">
      <div>Balance: {balance} SUI</div>
      <button
        onClick={() => savedAddress && refreshBalance(savedAddress)}
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
      >
        Refresh
      </button>
    </div>
  );
};
