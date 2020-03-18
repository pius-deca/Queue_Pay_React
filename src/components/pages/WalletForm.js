import React, {useState, useContext} from 'react'
import { authContext } from '../../auth-context/authProvider'
import classnames from 'classnames'

export const WalletForm = () => {

    const {errors, addWallet} = useContext(authContext);

    const [state, setstate] = useState({
        "balance":"0.0",
		"pin":"",
		"walletType":"NAIRA"
    });

    const handleInput = ({ target: { name, value } }) => {
        setstate({
        ...state,
        [name]: value
        });
    };

    const handleSignUp = e => {
        e.preventDefault();
        addWallet(state);       
    };

    return (
        <div className="p-1">
            <h3 className="diaplay-4 text-center">Add Wallet</h3>
            <form onSubmit={handleSignUp}>
                <div className="row">
                    <div className="form-group">
                        <input 
                            type="number"
                            hidden
                            name="balance"
                            className="form-control"
                            onChange={handleInput}
                        />
                    </div>                        
                    <div className="form-group col">
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
                    <div className="form-group col">
                        <input
                            type="number" 
                            placeholder="Set Pin Number"
                            name="pin"
                            className={classnames("form-control form-control-lg", {
                                "is-invalid":errors                    
                            })}
                            onChange={handleInput}
                        />
                        {errors ?
                            <div className="invalid-feedback text-left">{errors.data.pin}</div>
                            : <div className="valid-feedback">Looks good!</div>
                        }  
                    </div>
                    <div className="form-group col">
                        <input
                            type="submit"
                            value="Submit"
                            className="btn btn-info btn-lg"
                        />
                    </div>
                </div>    
            </form>
        </div>
    )
} 
