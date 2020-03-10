import React from 'react'

function BusinessForm(props) {
    const { hideBusinessForm } = props;
    return (
        <div className="row my-5">
            <div className="col-md-8 m-auto">
                <h3 className="diaplay-4 text-center">Register a business here</h3>
                <br />
                <form className="was-validated">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Business Name"
                            name="name"
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className="form-control"
                            placeholder="Enter logo link"
                            name="logoUrl"
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className="form-control"
                            placeholder="Enter CAC document link"
                            name="CACDocumentUrl"
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group mt-3">
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder="Enter Description"
                            name="description"
                        />              
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group">
                        <label>Select wallet type</label>
                        <select className="form-control" name="walletType">
                            <option>NAIRA</option>
                            <option>DOLLAR</option>
                            <option>GBP</option>
                            <option>EURO</option> 
                        </select>
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Pin Number"
                            name="pin"
                        /> 
                        <div className="valid-feedback">Looks good!</div>   
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Register Business"
                            className="btn btn-outline-secondary btn-block btn-lg"
                        />
                    </div> 
                    <button
                        onClick={hideBusinessForm}
                        className="btn btn-outline-danger btn-block btn-lg"
                        >
                        Close Form
                    </button>          
                </form>
            </div>
        </div>
    )
}

export default BusinessForm
