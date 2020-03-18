import React from 'react'
import { Link } from 'react-router-dom'

export const boardAlgorithm = (business, analytics, getWallets) =>{

    if (business.length <= 0) {

        return(
            <div className="alert alert-info text-center" role="alert">
                No business available
            </div>
        )
    }         
    return(
        <div className="card shadow px-3 bg-white rounded">
            <div className="card-body">                  
                <div className="row">
                {business.map((item, index) => {
                    return (                        
                    <div className="col-sm-6 mt-2" key={index}> 
                        <div className="card shadow bg-white rounded">
                        <div className="card-body">                  
                            <h6 className="card-title">Business Name : {item.name}</h6>                 
                            <p className="card-text">Business Description : {item.description}</p> 
                            <p className="card-text">Business logo link :
                            <Link to={item.logoUrl}> {item.logoUrl}</Link>                            
                            </p>  
                            <p className="card-text">Business CAC document link :
                            <Link to={item.cacDocumentUrl}> {item.cacDocumentUrl}</Link>
                            </p>
                            <a href="/" id={item.id} onClick={getWallets} className="btn btn-success">Wallets</a>
                            <a href="/" id={item.id} onClick={analytics} className="btn btn-success ml-4">Business Report</a>
                        </div>
                        </div>
                    </div>                    
                    );
                })}
                </div>
            </div>        
        </div>      
    )
}