import React from 'react'
import { Link } from 'react-router-dom'

export const boardAlgorithm = (business, analytics, getWallets, onDeleteClick) =>{

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
                                <div className="d-flex flex-wrap justify-content-between">
                                    <a href="/" id={item.id} onClick={getWallets} className="btn btn-outline-success mt-3">Wallets</a>
                                    <a href="/" id={item.id} onClick={analytics} className="btn btn-info mt-3">Business Report</a>
                                    <a href="/" id={item.id} onClick={onDeleteClick} className="btn btn-outline-danger mt-3">Delete Business</a>                    
                                </div>
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