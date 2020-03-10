import React from "react";

function CashoutForm(props) {
  const {hideForm} = props;

  const handleCashout = e => {
    e.preventDefault();
  };

  return (
    <div className="card-body">
      <form className="form" onSubmit={handleCashout}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Amount To Cash Out"
            name="amout"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Bank Name"
            name="bankName"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Bank Account Number"
            name="bankAccountNumber"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Enter Pin Number"
            name="pin"
            required
          />
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
