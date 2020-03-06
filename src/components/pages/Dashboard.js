import React from 'react'
import DashboardHeader from './Layout/DashboardHeader'

function Dashboard() {
    return (
        <div>        
            <DashboardHeader />            
            <div className="card container shadow p-3 mb-5 bg-white rounded">
                <div className="card-body">
                    <h5>Merchant Name :</h5>
                    <h5>Merchant Email :</h5>
                    <h5>Merchant Businesses :</h5>                
                </div>
            </div>
        </div>
    )
}

export default Dashboard
