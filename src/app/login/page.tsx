"use client";

// pages/dashboard.tsx
import React, { useContext, useEffect } from "react";
import { decodeJwt } from "jose";
import { AuthContext } from "../../context/authContext";
import { LogoutButton } from "../../components/LogoutButton";
import { BalanceView } from "@/components/BalanceView";
import { TransferView } from "@/components/TransferView";
import { STATE, ADDRESS, INPUTS, JWT } from "@/config";

const DashboardView: React.FC = () => {
  const { address } = useContext(AuthContext);

  console.log({ address });

  useEffect(() => {
    if (address) {
      localStorage.setItem(ADDRESS, address);
    }
  }, []);

  return (
    <div className="flex w-full flex-col gap-2 items-center justify-between">
      <h2 className="text-xl font-bold">Welcome!!!</h2>
      <div className="flex items-center">
        <p className="break-all text-center">{address}</p>
      </div>
      <BalanceView />
      <div style={{ fontWeight: "bold" }}>
        Network: <span style={{ fontWeight: "normal" }}>devnet</span>
      </div>
      <TransferView />
      <LogoutButton />
    </div>
  );
};

export default DashboardView;
