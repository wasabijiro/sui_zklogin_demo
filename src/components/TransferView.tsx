import React, { useState } from "react";
import { moveCallTransfer } from "@/scripts/transfer";

export const TransferView = () => {
  const [target, setTarget] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    if (target && amount) {
      const amountNum = parseFloat(amount); // amountを数値に変換
      if (!isNaN(amountNum)) {
        await moveCallTransfer({ target, amount: amountNum });
      } else {
        alert("Invalid amount");
      }
    } else {
      alert("Please fill in both fields");
    }
  };

  return (
    <div className="p-4 border border-black m-4">
      <div className="flex flex-col space-y-4">
        <div className="border border-black p-2">
          <input
            type="text"
            placeholder="Recipient Address"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="border border-black p-2">
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full outline-none"
          />
        </div>
        <div className="">
          <button
            onClick={handleTransfer}
            className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};
