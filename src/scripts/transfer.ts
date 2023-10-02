import { TransactionBlock } from "@mysten/sui.js/transactions";
import { ZkSignatureInputs } from "@mysten/zklogin";
import { STATE, INPUTS } from "@/config";
import { Params } from "@/types";

const moveCallTransfer = async ({ target, amount }) => {
  let txb = new TransactionBlock();
  const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount)]);
  txb.transferObjects([coin], txb.pure(target));
  const state: Params = JSON.parse(localStorage.getItem(STATE) as any);
  console.log({ state });
  const inputs: ZkSignatureInputs = JSON.parse(
    localStorage.getItem(INPUTS) as any
  );
};
