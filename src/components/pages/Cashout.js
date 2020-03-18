import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";
import CashoutForm from "./CashoutForm";
import { WalletForm } from "./WalletForm";

function Cashout() {
  let history = useHistory();

  const { getAllWallets, wallets, deleteWallet, check } = useContext(
    authContext
  );

  useEffect(() => {
    const businessId = localStorage["currentBusinessId"]
      ? JSON.parse(localStorage["currentBusinessId"])
      : "";
    getAllWallets(history, businessId);
    
  }, [check]);

  if (!localStorage["auth"]) {
    history.push("/");
  }

  const [state, setState] = useState(false);

  const displayForm = e => {
    setState(true);
    localStorage.setItem("currentWalletId", JSON.stringify(e.target.id));
  };

  const hideForm = (e) => {
    setState(false);
  };

  const onDeleteClick = e => {
    deleteWallet(e.target.id);
  };

  let wallet;
  wallet = WalletForm();

  return (
    <div className="container">
      <Link
        to="/dashboard"
        className="btn btn-outline-info btn-lg"
      >
        Back to dashboard
      </Link>
      <div className="card shadow p-3 my-4 bg-white rounded">      
        {wallet}
        <div className="wallets">
          <div className="row">
            {wallets.map((item, index) => {
              return (
                <div className="col-sm-6 mt-2" key={index}>
                  <div className="card shadow bg-white rounded">
                    <div className="card-body">
                      <h6 className="card-title">
                        Business Name : {item.business.name}
                      </h6>
                      <p className="card-text">Balance : {item.balance}</p>
                      <p className="card-text">Wallet Type : {item.walletType}</p>
                      <button
                        onClick={displayForm}
                        id={item.id}
                        className="btn btn-outline-success mr-4"
                      >
                        Cash out
                      </button>
                      <button
                        onClick={onDeleteClick}
                        id={item.id}
                        className="btn btn-outline-danger"
                      >
                        Delete Wallet
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {state ? <CashoutForm hideForm={hideForm} /> : false}
      </div>
    </div>   
  );
}

export default Cashout;
