import React, {useContext, useState, useEffect } from "react";
import { authContext } from '../../auth-context/authProvider';
import classnames from 'classnames';

function CashoutForm(props) {
  const {hideForm} = props;

  const { cashOut, cashoutMsg, errors,dispatch} = useContext(authContext);
  const [state, setstate] = useState({
    "amount":"",
    "bankName": "",
    "bankAccountNumber": "",
    "pin": ""
  }); 
  
  useEffect(() => {
    dispatch({type:"REMOVE_ERROR"})
  }, [])

  const handleInput = ({ target: { name, value } }) => {
    setstate({
      ...state,
      [name]: value
    });
  };

  const handleCashout = e => {
    e.preventDefault();
    cashOut(state);
  };

  return (
    <div className="card-body"> 
      {cashoutMsg ? 
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          {cashoutMsg}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => dispatch({type:"REMOVE_ERROR"})}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> : ""
      }   
      <form className="form" onSubmit={handleCashout}>
        <div className="form-group">
          <input
            type="number"                                       
            className={classnames("form-control", {
              "is-invalid":errors                    
            })}
            placeholder="Enter Amount To Cash Out"
            name="amount"
            onChange={handleInput}
          />                                
          {errors ?
            <div className="invalid-feedback text-left">{errors.data.amount}</div>
            : <div className="valid-feedback">Looks good!</div>
          }
        </div>
        <div className="form-group">
          <input
            type="text"                                       
            className={classnames("form-control", {
              "is-invalid":errors                    
            })}
            placeholder="Enter Bank Name"
            name="bankName"
            onChange={handleInput}
          />
          {errors ?
            <div className="invalid-feedback text-left">{errors.data.bankName}</div>
            : <div className="valid-feedback">Looks good!</div>
          }
        </div>
        <div className="form-group">
          <input
            type="text"                                     
            className={classnames("form-control", {
              "is-invalid":errors                    
            })}
            placeholder="Enter Bank Account Number"
            name="bankAccountNumber"
            onChange={handleInput}
          />
          {errors ?
            <div className="invalid-feedback text-left">{errors.data.bankAccountNumber}</div>
            : <div className="valid-feedback">Looks good!</div>
          }
        </div>
        <div className="form-group">
          <input
            type="number"                                     
            className={classnames("form-control", {
              "is-invalid":errors                    
            })}
            placeholder="Enter Pin Number"
            name="pin"
            onChange={handleInput}
          />
          {errors ?
            <div className="invalid-feedback text-left">{errors.data.pin}</div>
            : <div className="valid-feedback">Looks good!</div>
          }
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Cash Out"
            className="btn btn-lg btn-block btn-outline-success mt-4"
          />
        </div>
        <button
          onClick={hideForm}
          className="btn btn-outline-danger btn-block btn-lg"
        >
          Close Form
        </button>
      </form>
    </div>
  );
}

export default CashoutForm;
