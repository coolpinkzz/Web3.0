import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContract";
import Loader from "./Loader";
import { SiEthereum } from "react-icons/si";

const Welcome = () => {
  const {
    connectWallet,
    currentAcc,
    checkIfWalletIsConnected,
    isLoading,
    formData,
    sendTransaction,
    handleChange,
  } = useContext(TransactionContext);

  const companyCommonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

  const handleSubmit = (e) => {
    e.preventDefault();
    const { addressTo, amount, keyword, message } = formData;
    console.log(addressTo);
    if (!addressTo || !amount || !keyword || !message)
      return alert("Field cannot be empty");
    sendTransaction();
  };

  const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleChange(e, name)}
      className="my-2 w-full p-2 form-control shadow-none bg-transparent text-white border-none text-sm white-glassmorphism"
    />
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          style={{ color: "#fff" }}
          className="col-12 col-sm-12 col-md-6 col-xl-6 my-5"
        >
          <h1>Welcome to GeekCrypt</h1>
          <h1 className="fs-4 py-1">Send Crypto across the world</h1>
          <p className="text-left mt-5 text-white fs-5">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            GeekCrypt.
          </p>
          {currentAcc ? (
            <button
              className="connectbtn"
              onClick={connectWallet}
              type="button"
              disabled
            >
              Connect Wallet
            </button>
          ) : (
            <button
              className="connectbtn"
              onClick={connectWallet}
              type="button"
            >
              Connect Wallet
            </button>
          )}
          <div>
            <div class="row mt-5 text-center">
              <div class="col p-3 rounded-top border border-white ">
                Reliability
              </div>
              <div class="col p-3 rounded-top border border-white">
                Security
              </div>
              <div class="col p-3 rounded-top border border-white">
                Ethereum
              </div>
            </div>
            <div class="row text-center">
              <div class="col p-3 rounded-bottom rounded-top border border-white">
                Web 3.0
              </div>
              <div class="col p-3 rounded-bottom border border-white">
                Low Fees
              </div>
              <div class="col p-3 rounded-bottom border border-white">
                Blockchain
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-6 col-xl-6">
          <div className="mx-auto my-4 p-3 eth-card text-left">
            <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
              <SiEthereum fontSize={30} color="#fff" />
            </div>
            <div>
              <p className="m-0">Address</p>
              <p
                className="m-0"
                style={
                  currentAcc
                    ? { fontSize: 15, fontWeight: "bold" }
                    : { fontSize: 20, fontWeight: "bold" }
                }
              >
                {currentAcc ? currentAcc : "Ethereum"}
              </p>
            </div>
          </div>
          <div className="m-4 p-5 d-flex-col justify-start items-center blue-glassmorphism">
            <input
              autoComplete="off"
              className="form-input my-2 w-full p-2 form-control shadow-none bg-transparent text-white border-none text-sm white-glassmorphism"
              placeholder="Address To"
              name="addressTo"
              value={formData.addressTo}
              type="text"
              onChange={(e) => handleChange(e, "addressTo")}
            />
            <input
              autoComplete="off"
              className="form-input my-2 w-full p-2 form-control shadow-none bg-transparent text-white border-none text-sm white-glassmorphism"
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              onChange={(e) => handleChange(e, "amount")}
            />
            <input
              autoComplete="off"
              className="form-input my-2 w-full p-2 form-control shadow-none bg-transparent text-white border-none text-sm white-glassmorphism"
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              onChange={(e) => handleChange(e, "keyword")}
            />
            <input
              className=" form-input my-2 w-full p-2 form-control shadow-none bg-transparent text-white border-none text-sm white-glassmorphism"
              placeholder="Enter Message"
              name="message"
              type="text"
              onChange={(e) => handleChange(e, "message")}
            />
            <div className="text-center mt-4">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  className="btn btn-info"
                  onClick={handleSubmit}
                  type="button"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
