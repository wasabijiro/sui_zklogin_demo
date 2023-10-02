"use client";

// pages/dashboard.tsx
import React, { useContext, useEffect } from "react";
import { decodeJwt } from "jose";
import { AuthContext } from "../../context/authContext";
import { LogoutButton } from "../../components/LogoutButton";
import { BalanceView } from "@/components/BalanceView";
import { TransferView } from "@/components/TransferView";
import { STATE, ADDRESS, INPUTS, JWT } from "@/config";
import { Params } from "@/types";
import { proxy, config } from "@/config/sui";
import { createPartialZKSignature } from "@/scripts/zkSiganture";
import { Ed25519PublicKey } from "@mysten/sui.js/keypairs/ed25519";
import {
  genAddressSeed,
  jwtToAddress,
  ZkSignatureInputs,
} from "@mysten/zklogin";

const DashboardView: React.FC = () => {
  const { address } = useContext(AuthContext);

  console.log({ address });

  useEffect(() => {
    if (address) {
      localStorage.setItem(ADDRESS, address);
    }
    const executeCode = async () => {
      const qs = new URLSearchParams(window.location.href);
      console.log({ qs });
      const jwt = qs.get("id_token")!;
      // console.log({ jwt });
      window.history.replaceState({}, document.title, "/");
      const state: Params = JSON.parse(localStorage.getItem(STATE)!);
      const { salt }: { salt: string } = await fetch(proxy(config.salt), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: jwt,
        }),
      }).then((res) => res.json());

      console.log({ salt });

      const partialZk = createPartialZKSignature(
        jwt,
        new Ed25519PublicKey(state.ephPublic),
        state.epoch,
        BigInt(state.randomness),
        salt
      );

      console.log({ partialZk });

      const proofs = await fetch(proxy("https://prover.mystenlabs.com/v1"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partialZk),
      }).then((res) => res.json());

      console.log({ proofs });

      const jwtParsed = decodeJwt(jwt);

      console.log({ jwtParsed });

      const addressSeed = genAddressSeed(
        BigInt(salt),
        "sub",
        jwtParsed.sub!,
        Array.isArray(jwtParsed.aud) ? jwtParsed.aud[0] : jwtParsed.aud!
      );

      const addr = jwtToAddress(jwt, BigInt(salt));
      const inputs: ZkSignatureInputs = {
        ...proofs,
        addressSeed: addressSeed.toString(),
      };

      localStorage.setItem(INPUTS, JSON.stringify(inputs));
      localStorage.setItem(ADDRESS, addr);
    };
    executeCode();
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
