import React, {useContext, useState, useEffect} from 'react'
import {authContext} from "../../auth-context/authProvider";
import classnames from 'classnames';

function BusinessForm(props) {

    const { addBusiness, businessError, dispatch } = useContext(authContext);
    const [state, setstate] = useState({
        "name":"",
		"logoUrl":"",
		"cacDocumentUrl":"",
		"description":"",
		"walletType": "NAIRA",
		"pin":""
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
    
    const handleSignUp = e => {
        e.preventDefault();
        addBusiness(state);       
    };

    const { hideBusinessForm } = props;
    return (
        <div className="row my-5">
            <div className="col-md-8 m-auto">
                <h3 className="diaplay-4 text-center">Register a business here</h3>
                <br />
                <form className="was-validated" onSubmit={handleSignUp}>
                    <div className="form-group">
                        <input
                            type="text"                            
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":businessError                    
                            })}
                            placeholder="Enter Business Name"
                            name="name"
                            onChange={handleInput}
                        />                        
                        {businessError ?
                            <div className="invalid-feedback text-left">{businessError.data.name}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":businessError                    
                            })}
                            placeholder="Enter logo link"
                            name="logoUrl"
                            onChange={handleInput}
                        />
                        {businessError ?
                            <div className="invalid-feedback text-left">{businessError.data.logoUrl}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }
                    </div>
                    <div className="form-group">
                        <input
                            type="text" 
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":businessError                    
                            })}
                            placeholder="Enter CAC document link"
                            name="cacDocumentUrl"
                            onChange={handleInput}
                        />
                        {businessError ?
                            <div className="invalid-feedback text-left">{businessError.data.cacDocumentUrl}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }
                    </div>
                    <div className="form-group mt-3">
                        <textarea
                            type="text"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":businessError                    
                            })}
                            placeholder="Enter Description"
                            name="description"
                            onChange={handleInput}
                        />              
                        {businessError ?
                            <div className="invalid-feedback text-left">{businessError.data.description}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Select wallet type</label>
                        <select 
                            name="walletType" 
                            className="form-control form-control-lg"
                            onChange={handleInput}
                        >
                            <option >NAIRA</option>
                            <option >DOLLAR</option>
                            <option >GBP</option>
                            <option >EURO</option> 
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="number"                            
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":businessError                    
                            })}
                            placeholder="Enter Pin Number"
                            name="pin"
                            onChange={handleInput}
                        /> 
                        {businessError ?
                            <div className="invalid-feedback text-left">{businessError.data.pin}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }  
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit"
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
