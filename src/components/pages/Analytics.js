import React, {useContext, useEffect} from 'react'
import Histogram from 'react-chart-histogram';
import { useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";

function Analytics(){
    let history = useHistory();

    if (!localStorage['auth']) {
      history.push("/");
    }

    const {getAnalytics, analytics} = useContext(authContext);

    useEffect(() => {
      const currentId = localStorage['currentId'] ? JSON.parse(localStorage['currentId']) : ""
      getAnalytics(history, currentId);
    }, [])

    const labels = ['2016', '2017', '2018', '2017', '2018', '2017', '2018'];
    const data = [324, 45, 672, 45, 672, 45, 672];
    const options = { fillColor: 'green', strokeColor: 'gray' };
    
    return (
      <div className="container">          
        <div>
            <Histogram
                xLabels={labels}
                yValues={data}

                width='600'
                height='300'
                options={options}
            />
        </div>
        <div className="analytics">         
          <div className="card shadow bg-white rounded">
            <div className="card-body">                           
              <p className="card-text">Business Value : {analytics.value}</p>                 
              <p className="card-text">Successfull business Transactions : {analytics.successfulTransaction}</p>                 
              <p className="card-text">Business Account Balance : {analytics.accountBalance}</p>                                     
              <div>{analytics && analytics.wallet.map(item => {
                return(
                  <div>
                    <span className="card-text">Wallet Type : {item.walletType} Wallet Balance : {item.balance}</span>
                  </div> 
                )                
              })}</div>
            </div>
          </div>
        </div>     
      </div>  
    )
}

export default Analytics
