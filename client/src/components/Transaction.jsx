import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContract";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div
      className="txn-parent m-4 d-flex 
      flex-coloumn p-3 rounded"
    >
      <div className=" txnCard d-flex items-center w-full mt-3">
        <div className="justify-content-start w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white fs-5">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white fs-5">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white fs-5">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white fs-5s">Message: {message}</p>
            </>
          )}
        </div>
        <img
          style={{ height: 200 }}
          src={gifUrl || url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className=" timestamp bg-black p-3 px-5 w-max rounded-3 -mt-5 shadow-2">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAcc } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-content-center   gradient-bg-transactions">
      <div className="flex flex-col py-12 px-4">
        {currentAcc ? (
          <h3 className="text-white fs-1 text-center  py-4">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center py-4 ">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="d-flex flex-wrap justify-content-center align-items-center mt-10">
          {transactions.reverse().map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
