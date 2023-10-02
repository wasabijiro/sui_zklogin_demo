import { TransactionBlock } from "@mysten/sui.js/transactions";
import { ZkSignatureInputs, getZkSignature } from "@mysten/zklogin";
import { STATE, INPUTS, ADDRESS } from "@/config";
import { Params } from "@/types";
import { provider } from "@/config/sui";
import {
  Ed25519Keypair,
  Ed25519PublicKey,
} from "@mysten/sui.js/keypairs/ed25519";

const moveCallTransfer = async ({ target, amount }) => {
  let txb = new TransactionBlock();
  const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount)]);
  txb.transferObjects([coin], txb.pure(target));
  const state: Params = JSON.parse(localStorage.getItem(STATE) as any);
  console.log({ state });
  const inputs: ZkSignatureInputs = JSON.parse(
    localStorage.getItem(INPUTS) as any
  );
  const addr: string = localStorage.getItem(ADDRESS)!;

  txb.setSender(addr);

  const ephemeralKeyPair = Ed25519Keypair.fromSecretKey(
    Buffer.from(state.ephPrivate, "base64")
  );

  const preSign = await txb.sign({
    client: provider,
    signer: ephemeralKeyPair,
  });

  const zkSignature = getZkSignature({
    inputs: inputs,
    maxEpoch: state.epoch,
    userSignature: preSign.signature,
  });

  const res = await provider.executeTransactionBlock({
    transactionBlock: preSign.bytes,
    signature: zkSignature,
  });
};
